/************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************/

const { insertDriver, updateDriver, deleteDriver, selectAllDrivers, selectDriverIdByCPF, selectDriverById } = require('../models/DAO/driver.js')
const { verifyCpf } = require('../utils/verifyCpf.js')
const { verifyRg } = require('../utils/verifyRg.js')
const { createDriverJson } = require('../utils/createDriverJson.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoDriver = async (driver) => {
    if (driver.nome == '' || driver.nome == null || driver.rg == '' || driver.rg == null || driver.cpf == '' || driver.cpf == null || driver.cnh == '' || driver.cnh == null ||
        driver.telefone == '' || driver.telefone == null || driver.data_nascimento == '' || driver.data_nascimento == null || driver.inicio_carreira == '' || driver.inicio_carreira == null || driver.senha == '' || driver.senha == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (!driver.email.includes('@')) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    } else if (driver.email.length > 256 || driver.nome.length > 150 || driver.rg.length > 12 || driver.cpf.length > 18 || driver.telefone.length > 20 || driver.senha.length > 30 || driver.cnh.length > 15) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        // const safeCpf = await verifyCpf(driver.cpf)
        // const safeRg = await verifyRg(driver.rg)

        // if (safeCpf && safeRg) {
        const result = await insertDriver(driver)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
        // } else {
        // return { status: 400, message: MESSAGE_ERROR.INVALID_DATA }
        // }
    }
}

const atualizarDriver = async (driver) => {
    if (driver.nome == '' || driver.nome == null || driver.rg == '' || driver.rg == null || driver.cpf == '' || driver.cpf == null || driver.cnh == '' || driver.cnh == null ||
        driver.telefone == '' || driver.telefone == null || driver.data_nascimento == '' || driver.data_nascimento == null || driver.inicio_carreira == '' || driver.inicio_carreira == null || driver.senha == '' || driver.senha == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (!driver.email.includes('@')) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    } else if (driver.email.length > 256 || driver.nome.length > 150 || driver.rg.length > 12 || driver.cpf.length > 18 || driver.telefone.length > 20 || driver.senha.length > 30 || driver.cnh.length > 15) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const verifyId = await listarDriverIdByCPF(driver.cpf)
        if (verifyId == 200) {
            // const safeCpf = await verifyCpf(driver.cpf)
            // const safeRg = await verifyRg(driver.rg)

            // if (safeCpf && safeRg) {
            const result = await updateDriver(driver)

            if (result) {
                return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
            // } else {
            // return { status: 400, message: MESSAGE_ERROR.INVALID_DATA }
            // }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const deletarDriver = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteDriver(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarDrivers = async () => {
    const result = await selectAllDrivers()

    if (result) {
        let driverJson = await createDriverJson(result)
        return { status: 200, message: driverJson }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarDriverIdByCPF = async (cpf) => {
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

const listarDriverById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectDriverById(id)

        if (result) {
            let jsonData = await createDriverJson(result)
            return { status: 200, message: jsonData }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoDriver,
    atualizarDriver,
    deletarDriver,
    listarDrivers,
    listarDriverIdByCPF,
    listarDriverById
}
