/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DAS ESCOLAS DO MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const router = express.Router()
const { MESSAGE_ERROR } = require('../modules/config.js')
const { listarSchoolsByDriverId } = require('../controllers/driverSchoolController.js')
const { verifyJwt } = require('../../middlewares/jwt.js')

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