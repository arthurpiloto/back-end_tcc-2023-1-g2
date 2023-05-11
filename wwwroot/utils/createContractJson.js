/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE CONTRATO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 14/04/2023
VERSÃO: 1.0
************************************************************************/
const { selectDriverById } = require('../models/DAO/driver.js')
const { selectVanByDriverId } = require('../models/DAO/van.js')
const { createJsonDriver } = require('./createJsonDriver.js')
const { listarUserById } = require('../controllers/userController.js')
const { selectSchoolById } = require('../models/DAO/school.js')
const { selectTypeContractById } = require('../models/DAO/typeContract.js')
const { selectTypePaymentByID } = require('../models/DAO/typePayment.js')

const createContractJson = async (contractObject, message) => {
    if (message === "json") {
        return await createContract(contractObject)
    } else {
        let arrayContainer = []
        for (let index = 0; index < contractObject.length; index++) {    
            arrayContainer.push(await createContract([contractObject[index]]))
        }
        return arrayContainer
    }
}

const createContract = async (contractObject) => {
    let returnMessage = {}
    await Promise.all(contractObject.map(async element => {
        returnMessage.id = element.id
        returnMessage.nome_passageiro = element.nome_passageiro
        returnMessage.idade_passageiro = element.idade_passageiro
        returnMessage.valor_contrato = element.valor
        returnMessage.status_contrato = element.status_contrato

        const driver = await selectDriverById(element.id_motorista)
        const van = await selectVanByDriverId(element.id_motorista)
        const driverJson = await createJsonDriver(van, driver, "json")
        returnMessage.motorista = driverJson

        const user = await listarUserById(element.id_usuario)
        returnMessage.usuario = user.message

        const school = await selectSchoolById(element.id_escola)
        school.forEach(el => {
            returnMessage.escola = el
        })

        const contractType = await selectTypeContractById(element.id_tipo_contrato)
        contractType.forEach(el => {
            returnMessage.tipo_contrato = el
        })

        const paymentType = await selectTypePaymentByID(element.id_tipo_pagamento)
        paymentType.forEach(el => {
            returnMessage.tipo_pagamento = el
        })
    }))
    return returnMessage
}

module.exports = {
    createContractJson
}
