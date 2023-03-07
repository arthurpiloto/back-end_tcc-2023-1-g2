const express = require(`express`)
const jsonParser = express.json()
const { newModel, selectModelId } = require('../controllers/modelController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')

const router = express.Router()

router
    .route('/model')
    .post(jsonParser, async(request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosModel = await newModel(dadosBody)
                statusCode = dadosModel.status
                message = dadosModel.message 
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
    .route('/model/id/:modelName')
    .get(async(request, response) => {
        let statusCode
        let message
        let name = request.params.modelName
    
        if(name != '' && name != undefined) {
            const modelData = await selectModelId(name)
    
            if (modelData) {
                statusCode = modelData.status
                message = modelData.message
            } else {
                statusCode = modelData.status
                message = modelData.message
            }
        } else {
            statusCode = modelData.status
            message = modelData.message
        }
    
        response.status(statusCode).json(message)
    })

module.exports = router
