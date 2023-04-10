/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 05/04/2023
VERSÃO: 1.0
************************************************************************/
const { selectModelById } = require('../models/DAO/model.js')
const createJsonDriver = async (resultVan, result, message) => {
    let idModel
    let messageJson = {}

    resultVan.forEach(element => {
        idModel = element.id_modelo
    })

    const resultModel = await selectModelById(idModel)
    resultVan.map(element => {
        element.modelo = resultModel
        return element
    })
    
    if (message === "array") {
        result.map(element => {
            element.van = resultVan
            return element
        })
        let resultadoMotorista = {}
        result.forEach(element => {
            resultadoMotorista.driver = element
        })
        return resultadoMotorista
    } else {
        result.van = resultVan
        messageJson = result
    }

    return messageJson
}

module.exports = {
    createJsonDriver
}
