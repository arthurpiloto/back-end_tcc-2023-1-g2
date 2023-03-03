const express = require(`express`)
const jsonParser = express.json()
const { newDriver, selectDriverId } = require('../controllers/driverController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')

const router = express.Router()

router
    .route('/driver')
    .post(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosDriver = await newDriver(dadosBody)
                statusCode = dadosDriver.status
                message = dadosDriver.message 
            } else{
                statusCode = 400
                message = MESSAGE_ERROR.EMPTY_BODY
            }
        } else{
            statusCode = 415
            message = MESSAGE_ERROR.CONTENT_TYPE
        }
        return response.status(statusCode).json(message)
    })

router
    .route('/driver/id/:driverCpf')
    .get(async(request, response) => {
        let statusCode
        let message
        let cpf = request.params.driverCpf
    
        if(cpf != '' && cpf != undefined) {
            const driverData = await selectDriverId(cpf)
    
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
