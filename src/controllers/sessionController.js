const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const alunas = require('../model/alunas.json')
const bcrypt = require('bcryptjs')

function checkPassword(passwordEntry, password) {
    console.log(passwordEntry, 'aqui é o password do usuário')
    console.log(password, 'aqui é o password do BD')
    return bcrypt.compareSync(passwordEntry, password)
}

exports.getToken = (req, res) => {
    const { name, password: passwordEntry } = req.body
    const user = alunas.find(item => item.nome == name)

    if (!user) {
        return res.status(401).json({ error: 'user not found' })
    }

    // desconstrução se o user for encontrado
    const { id, nome, hashPass } = user

    try {
        checkPassword(passwordEntry, hashPass)
    } catch (err) {
        return res.status(401).json({ error: 'password does not match!' })
    }

    try {
        return res.json({
            user: {
                id,
                nome,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        })
    } catch (err) {
        return res.status(401).json({ error: 'erro' })
    }
}