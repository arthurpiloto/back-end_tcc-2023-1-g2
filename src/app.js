/************************************************************************
OBJETIVO: API RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS DO BACK-END.
(GET, POST, PUT, DELETE)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 10/10/2022
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const cors = require(`cors`)
const app = express()

app.use((request, response, next) => {
    response.header(`Access-Control-Allow-Origin`, `*`)
    response.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`)

    app.use(cors())
    next()
})

const userRouter = require('./routes/userRoutes.js')
const driverRouter = require('./routes/driverRoutes.js')

app.use(userRouter)
app.use(driverRouter)

app.listen(3030, () => {
    console.log("Server waiting requests...")
})
