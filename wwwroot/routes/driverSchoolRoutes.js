/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DAS ESCOLAS DO MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const router = express.Router()
const { MESSAGE_ERROR } = require('../modules/config.js')
const { novoSchoolDriver, atualizarSchoolDriver, deletarSchoolDriver, listarSchoolDrivers, listarSchoolsByDriverId } = require('../controllers/driverSchoolController.js')
const { verifyJwt } = require('../../middlewares/jwt.js')

router
    .route('/driverSchool')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosDriverSchool = await novoSchoolDriver(dadosBody)
                statusCode = dadosDriverSchool.status
                message = dadosDriverSchool.message
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
    .route('/driversSchools')
    .get(async (request, response) => {
        let statusCode
        let message

        const schoolsData = await listarSchoolDrivers()

        if (schoolsData) {
            statusCode = schoolsData.status
            message = schoolsData.message
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

router
    .route('/driverSchool/:driverSchoolId')
    .put(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers['content-type']

        if (headerContentType == 'application/json') {
            let bodyData = request.body

            if (JSON.stringify(bodyData) != '{}') {
                let id = request.params.driverSchoolId

                if (id != '' && id != undefined) {
                    bodyData.id = id

                    const updatedDriverSchool = await atualizarSchoolDriver(bodyData)

                    statusCode = updatedDriverSchool.status
                    message = updatedDriverSchool.message
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

        let id = request.params.driverSchoolId

        if (id != '' && id != undefined) {
            const deletedDriverSchool = await deletarSchoolDriver(id)

            statusCode = deletedDriverSchool.status
            message = deletedDriverSchool.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        response.status(statusCode).json(message)
    })

router
    .route('/driverSchools/:driverId')
    .get(/*verifyJwt,*/ async (request, response) => {
        let statusCode
        let message
        let id = request.params.driverId

        if (id != '' && id != undefined) {
            const driversData = await listarSchoolsByDriverId(id)

            statusCode = driversData.status
            message = driversData.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        return response.status(statusCode).json(message)
    })

module.exports = router