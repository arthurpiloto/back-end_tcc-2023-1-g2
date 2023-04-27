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

const userRouter = require('./src/routes/userRoutes.js')
const driverRouter = require('./src/routes/driverRoutes.js')
const modelRouter = require('./src/routes/modelRoutes.js')
const vanRouter = require('./src/routes/vanRoutes.js')
const commentRouter = require('./src/routes/commentRoutes.js')
const schoolRouter = require('./src/routes/schoolRoutes.js')
const typePaymentRouter = require('./src/routes/typePaymentRoutes.js')
const typeContractRouter = require('./src/routes/typeContractRoutes.js')
const contractRouter = require('./src/routes/contractRoutes.js')
const driverSchoolsRouter = require('./src/routes/driverSchoolRoutes.js')

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

app.listen(3030, () => {
    console.log("Server waiting requests at http://localhost:3030")
})
