/************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************/

const { insertDriver, selectAllDrivers, selectDriverIdByCPF } = require('../models/DAO/driver.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const newDriver = async (driver) => {
    if (driver.nome == '' || driver.nome == null || driver.rg == '' || driver.rg == null || driver.cpf == '' || driver.cpf == null || driver.cnh == '' || driver.cnh == null ||
        driver.telefone == '' || driver.telefone == null || driver.data_nascimento == '' || driver.data_nascimento == null || driver.inicio_carreira == '' || driver.inicio_carreira == null || driver.senha == '' || driver.senha == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (!driver.email.includes('@')) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    } else if (driver.email.length > 256 || driver.nome.length > 150 || driver.rg.length > 12 || driver.cpf.length > 18 || driver.telefone.length > 20 || driver.senha.length > 30 || driver.cnh.length > 15) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await insertDriver(driver)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listAllDrivers = async () => {
    let driverJson = {}

    const result = await selectAllDrivers()

    if (result) {
        driverJson.drivers = result
        return driverJson
    } else {
        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

const listDriverIdByCPF = async (cpf) => {
    if (cpf != '' && cpf != undefined) {
        let id = await selectDriverIdByCPF(cpf)

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
    newDriver,
    listAllDrivers,
    listDriverIdByCPF
}
