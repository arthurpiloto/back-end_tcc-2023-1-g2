/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertVan, updateVan, deleteVan, selectAllVans, selectVanById, verifyVan } = require('../models/DAO/van.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const newVan = async (van) => {
    if (van.placa == '' || van.placa == null || van.quantidade_vagas == '' || van.quantidade_vagas == null || van.id_modelo == '' || van.id_modelo == null || van.id_motorista == '' || van.id_motorista == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (van.placa.length > 10 || van.foto.length > 400) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const vanVerification = await verifyVan(van.placa)
        let result

        if (vanVerification.length !== 0) {
            van.status_van = true
            van.id = vanVerification.id
            result = await updateVan(van)
        } else {
            result = await insertVan(van)
        }

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarVan = async (van) => {
    if (van.placa == '' || van.placa == null || van.quantidade_vagas == '' || van.quantidade_vagas == null || van.id_modelo == '' || van.id_modelo == null || van.id_motorista == '' || van.id_motorista == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (van.placa.length > 10 || van.foto.length > 400) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateVan(van)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarVan = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteVan(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarVans = async () => {
    const result = await selectAllVans()

    if (result) {
        let vansJson = {}
        vansJson.vans = result
        return vansJson
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarVanById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectVanById(id)

        if (result) {
            let vanJson = {}
            result.forEach(element => {
                vanJson = element
            })
            return { status: 200, message: vanJson }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

module.exports = {
    newVan, atualizarVan, deletarVan, listarVans, listarVanById
}