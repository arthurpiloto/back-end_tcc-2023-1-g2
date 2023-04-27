/************************************************************************
OBJETIVO: API RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS DO BACK-END.
(GET, POST, PUT, DELETE)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 24/02/2023
VERSÃO: 1.0
************************************************************************/
const express = require(`express`)
const cors = require(`cors`)
const app = express()

app.use((request, response, next) => {
    response.header(`Access-Control-Allow-Origin`, `*`)
    response.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`)
    response.header('Access-Control-Allow-Headers', 'Content-type')

    app.use(cors())
    next()
})

const userRouter = require('./wwwroot/routes/userRoutes.js')
const driverRouter = require('./wwwroot/routes/driverRoutes.js')
const modelRouter = require('./wwwroot/routes/modelRoutes.js')
const vanRouter = require('./wwwroot/routes/vanRoutes.js')
const commentRouter = require('./wwwroot/routes/commentRoutes.js')
const schoolRouter = require('./wwwroot/routes/schoolRoutes.js')
const typePaymentRouter = require('./wwwroot/routes/typePaymentRoutes.js')
const typeContractRouter = require('./wwwroot/routes/typeContractRoutes.js')
const contractRouter = require('./wwwroot/routes/contractRoutes.js')
const driverSchoolsRouter = require('./wwwroot/routes/driverSchoolRoutes.js')

app.use(userRouter)
app.use(driverRouter)
app.use(modelRouter)
app.use(vanRouter)
app.use(commentRouter)
app.use(schoolRouter)
app.use(typePaymentRouter)
app.use(typeContractRouter)
app.use(contractRouter)
app.use(driverSchoolsRouter)

app.listen(8080, () => {
    console.log("Server waiting requests at http://localhost:8080")
})
