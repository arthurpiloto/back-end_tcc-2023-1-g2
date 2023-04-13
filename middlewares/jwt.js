/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA VERIFICAÇÃO JWT
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 15/03/2023
VERSÃO: 1.0
************************************************************************/

const jwt = require('jsonwebtoken')
const { MESSAGE_SUCCESS } = require('../src/modules/config.js')

const createJwt = async (user) => {
    const token = jwt.sign({
        id: user.id,
    }, process.env.SECRET, {
        expiresIn: '5d'
    })
    const id = user.id

    return { status: 200, response: { message: MESSAGE_SUCCESS.JWT_CREATED, token, id } }
}

const validateJwt = async (token) => {
    let jwtStatus
    jwt.verify(token, process.env.SECRET, (error, decode) => {
        if (error) {
            jwtStatus = false
        } else {
            jwtStatus = true
        }
    })
    return jwtStatus
}

const verifyJwt = async (request, response, next) => {
    let token = request.headers['x-access-token']
    const authenticatedToken = await validateJwt(token)

    if(authenticatedToken) {
        next()
    } else {
        return response.status(401).end()
    }
}

module.exports = {
    createJwt,
    validateJwt,
    verifyJwt
}