/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE USUÁRIO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/

const express = require(`express`)
const jsonParser = express.json()
const { novoUser, atualizarUser, deletarUser, listarUsers, listarUserById, userLogin } = require('../controllers/userController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const { verifyLogin } = require('../../middlewares/verifyLogin.js')
const { createJwt, validateJwt } = require('../../middlewares/jwt.js')

const router = express.Router()

// ROTA PARA INSERIR NOVO USUÁRIO
router
    .route('/user')
    .post(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosUser = await novoUser(dadosBody)
                statusCode = dadosUser.status
                message = dadosUser.message 
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            message = MESSAGE_ERROR.CONTENT_TYPE
        }
        return response.status(statusCode).json(message)
    })

router
    .route('/user/:userId')
    .get(async(request, response) => {
        let statusCode
        let message
        
        let id = request.params.userId

        const userData = await listarUserById(id)

        if (userData) {
            statusCode = 200
            message = userData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

    .put(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType
    
        headerContentType = request.headers['content-type']
    
        if(headerContentType == 'application/json') {
            let bodyData = request.body
    
            if(JSON.stringify(bodyData) != '{}') {
                let id = request.params.userId
    
                if(id != '' && id != undefined) {
                    bodyData.id = id
    
                    const updatedUser = await atualizarUser(bodyData)
    
                    statusCode = updatedUser.status
                    message = updatedUser.message
                } else {
                    statusCode = 400
                    message = MESSAGE_ERROR.REQUIRED_ID
                }
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            message = MESSAGE_ERROR.INCORRECT_CONTENT_TYPE
        }
    
        return response.status(statusCode).json(message)
    })

    .delete(async(request, response) => {
        let statusCode
        let message

        let id = request.params.userId

        if(id != '' && id != undefined) {
            const deletedUser = await deletarUser(id)

            statusCode = deletedUser.status
            message = deletedUser.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
        response.status(statusCode).json(message)
    })


router
    .route('/users')
    .get(async(request, response) => {
        let statusCode
        let message

        const userData = await listarUsers()

        if (userData) {
            statusCode = 200
            message = userData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

// Function to verify jwt
const verifyJwt = async (req, res, next) => {
    let token = req.headers['x-access-token']
    const authenticatedToken = await validateJwt(token)

    if(authenticatedToken) {
        next()
    } else {
        return res.status(401).end()
    }
}

router
    .route('/user/login')
    .post(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosUser = await userLogin(dadosBody.email, dadosBody.senha)
                console.log(dadosUser)
                dadosUser.message.token.forEach(element => {
                    console.log(element)
                })
            } else {
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else {
            statusCode = 415
            message = MESSAGE_ERROR.CONTENT_TYPE
        }

        return response.status(statusCode).json(message)
    })

module.exports = router