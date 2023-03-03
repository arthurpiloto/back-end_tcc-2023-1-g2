const express = require(`express`)
const jsonParser = express.json()
const { newDriver } = require('../controllers/driverController.js')
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

module.exports = router
