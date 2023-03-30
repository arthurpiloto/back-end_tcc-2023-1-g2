/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertModel, selectModelIdByName } = require('../models/DAO/model.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const newModel = async (model) => {

    if (model.modelo == '' || model.modelo == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (model.modelo.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {

        const result = await insertModel(model)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const selectModelId = async (name) => {
    if (name != '' && name != undefined) {
        let id = await selectModelIdByName(name)

        if (id) {
            id.forEach(element => {
                id = element
            })

            return { status: 200, message: id }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    } else {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    }
}


module.exports = {
    newModel,
    selectModelId
}