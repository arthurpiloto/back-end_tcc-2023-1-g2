/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA ORGANIZAÇÃO DAS ROTAS
DE ESCOLA
AUTOR: NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const jsonParser = express.json()
const { novoSchool, listarSchools, atualizarSchool, deletarSchool, listarSchoolById } = require('../controllers/schoolController.js')
const { MESSAGE_ERROR } = require('../modules/config.js')
const router = express.Router()

router
    .route('/school')
    .post(jsonParser, async (request, response) => {
        let statusCode
        let message
        let headerContentType

        headerContentType = request.headers[`content-type`]

        if (headerContentType == `application/json`) {
            let dadosBody = request.body

            if (JSON.stringify(dadosBody) != `{}`) {
                const dadosSchool = await novoSchool(dadosBody)
                statusCode = dadosSchool.status
                message = dadosSchool.message
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
    .route('/school/:schoolId')
    .get(async(request, response) => {
        let statusCode
        let message
        
        let id = request.params.schoolId

        if (id != '' && id != undefined) {
            const schoolData = await listarSchoolById(id)

            statusCode = schoolData.status
            message = schoolData.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
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
                let id = request.params.schoolId
    
                if(id != '' && id != undefined) {
                    bodyData.id = id
    
                    const updatedSchool = await atualizarSchool(bodyData)
    
                    statusCode = updatedSchool.status
                    message = updatedSchool.message
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

        let id = request.params.schoolId

        if(id != '' && id != undefined) {
            const deletedschool = await deletarSchool(id)

            statusCode = deletedschool.status
            message = deletedschool.message
        } else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }
        
        response.status(statusCode).json(message)
    })

router 
    .route('/schools')
    .get(async(request, response) => {
        let statusCode
        let message

        const schoolsData = await listarSchools()

        if (schoolsData) {
            statusCode = 200
            message = schoolsData
        } else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

        return response.status(statusCode).json(message)
    })

module.exports = router