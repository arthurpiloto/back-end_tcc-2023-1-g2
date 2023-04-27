/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 05/04/2023
VERSÃO: 1.0
************************************************************************/
const { selectModelById } = require('../models/DAO/model.js')
const { formatDate } = require('../utils/formatDate.js')
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
    
    if (message === "json") {
        result.map(async element => {
            element.van = resultVan
            element.data_nascimento = await formatDate(element.data_nascimento)
            element.inicio_carreira = await formatDate(element.inicio_carreira)
            return element
        })
        return result[0]
    } else {
        result.van = resultVan
        result.data_nascimento = await formatDate(result.data_nascimento)
        result.inicio_carreira = await formatDate(result.inicio_carreira)
        messageJson = result
    }

    return messageJson
}

module.exports = {
    createJsonDriver
}
