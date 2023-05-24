/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 23/05/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoUsuarioAvaliacaoMotorista, atualizarUsuarioAvaliacaoMotorista, deletarUsuarioAvaliacaoMotorista, listarUsuarioAvaliacaoMotoristaById, listarUsuarioAvaliacaoMotoristaByIdMotorista, listarUsuariosAvaliacoesMotoristas, listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista } = require('../controllers/usuarioAvaliacaoMotoristaController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/usuarioAvaliacaoMotorista')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dados = await novoUsuarioAvaliacaoMotorista(dadosBody)
                statusCode = dados.status
                message = dados.message
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

router
    .route('/usuarioAvaliacaoMotorista/:usuarioAvaliacaoMotoristaId')
    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.usuarioAvaliacaoMotoristaId

        if (id != '' && id != undefined) {
            const data = await listarUsuarioAvaliacaoMotoristaById(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

    .put(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers['content-type']

        if (headerContentType == 'application/json') {
            let bodyData = request.body

            if (JSON.stringify(bodyData) != '{}') {
                let id = request.params.usuarioAvaliacaoMotoristaId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const data = await atualizarUsuarioAvaliacaoMotorista(bodyData)

                    statusCode = data.status
                    message = data.message
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

    .delete(async (request, response) => {
        let statusCode
        let message

        let id = request.params.usuarioAvaliacaoMotoristaId

        if (id != '' && id != undefined) {
            const data = await deletarUsuarioAvaliacaoMotorista(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/usuariosAvaliacoesMotoristas')
    .get(async (request, response) => {
        let statusCode
        let message

        const data = await listarUsuariosAvaliacoesMotoristas()

        if (data) {
            statusCode = data.status
            message = data.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

router
    .route('/usuarioAvaliacaoMotorista/motorista/:motoristaId')
    .get(async (request, response) => {
        let statusCode
        let message

        let id = request.params.motoristaId

        if (id != '' && id != undefined) {
            const data = await listarUsuarioAvaliacaoMotoristaByIdMotorista(id)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

router
    .route('/usuarioAvaliacaoMotorista/usuario/:usuarioId/motorista/:motoristaId')
    .get(async (request, response) => {
        let statusCode
        let message

        let idUser = request.params.usuarioId
        let idDriver = request.params.motoristaId

        if (idUser != '' || idUser != undefined || idDriver != '' || idDriver != undefined) {
            const data = await listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista(idUser, idDriver)

            statusCode = data.status
            message = data.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

module.exports = router