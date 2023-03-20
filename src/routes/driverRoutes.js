/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/

const express = require(`express`)
const jsonParser = express.json()
const { novoDriver, atualizarDriver, deletarDriver, listarDrivers, listarDriverIdByCPF, listarDriverById } = require('../controllers/driverController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')

const router = express.Router()

router
    .route('/driver')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosDriver = await novoDriver(dadosBody)
                statusCode = dadosDriver.status
                message = dadosDriver.message
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
    .route('/driver/:driverId')
    .get(async (request, response) => {
        let statusCode
        let message
        let id = request.params.driverId

        if (id != '' && id != undefined) {
            const driversData = await listarDriverById(id)

            statusCode = driversData.status
            message = driversData.message
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
                let id = request.params.driverId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const updatedDriver = await atualizarDriver(bodyData)

                    statusCode = updatedDriver.status
                    message = updatedDriver.message
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

        let id = request.params.driverId

        if (id != '' && id != undefined) {
            const deletedDriver = await deletarDriver(id)

            statusCode = deletedDriver.status
            message = deletedDriver.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/drivers')
    .get(async (request, response) => {
        let statusCode
        let message

        const driversData = await listarDrivers()

        if (driversData) {
            statusCode = 200
            message = driversData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

router
    .route('/driver/id/:driverCpf')
    .get(async (request, response) => {
        let statusCode
        let message
        let cpf = request.params.driverCpf

        if (cpf != '' && cpf != undefined) {
            const driverData = await listarDriverIdByCPF(cpf)

            if (driverData) {
                statusCode = driverData.status
                message = driverData.message
            } else {
                statusCode = driverData.status
                message = driverData.message
            }
        } else {
            statusCode = driverData.status
            message = driverData.message
        }

        response.status(statusCode).json(message)
    })

module.exports = router
