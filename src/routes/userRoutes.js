const express = require(`express`)
const jsonParser = express.json()
const { newUser } = require('../controllers/userController.js')

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
                const dadosUser = await newUser(dadosBody)
                statusCode = dadosUser.status
                message = dadosUser.message 
            } else{
                statusCode = 400
                message = "Error Empty Body"
            }
        } else{
            statusCode = 415
            message = "Error Content-Type"
        }
        return response.status(statusCode).json(message)
    })

module.exports = router