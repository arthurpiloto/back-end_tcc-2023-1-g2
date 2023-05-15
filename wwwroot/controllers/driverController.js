/************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************/
const { insertDriver, updateDriver, deleteDriver, selectAllDrivers, selectDriverIdByCPF, selectDriverById, loginDriver, verifyDriver, selectDriversByFilters } = require('../models/DAO/driver.js')
const { selectVanByDriverId } = require('../models/DAO/van.js')
const { listarSchoolsByDriverId } = require('../controllers/driverSchoolController.js')
const { formatDate } = require('../utils/formatDate.js')
const { createJsonDriver } = require('../utils/createJsonDriver.js')
const { verifyCpf } = require('../utils/verifyCpf.js')
const { verifyRg } = require('../utils/verifyRg.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoDriver = async (driver) => {
    if (driver.nome == '' || driver.nome == null || driver.rg == '' || driver.rg == null || driver.cpf == '' || driver.cpf == null || driver.cnh == '' || driver.cnh == null ||
        driver.telefone == '' || driver.telefone == null || driver.data_nascimento == '' || driver.data_nascimento == null || driver.inicio_carreira == '' || driver.inicio_carreira == null || driver.senha == '' || driver.senha == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (!driver.email.includes('@')) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    } else if (driver.email.length > 256 || driver.nome.length > 150 || driver.rg.length > 12 || driver.cpf.length > 18 || driver.telefone.length > 20 || driver.senha.length > 32 || driver.cnh.length > 15 || driver.foto.length > 400) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        // const safeCpf = await verifyCpf(driver.cpf)
        // const safeRg = await verifyRg(driver.rg)

        // if (safeCpf && safeRg) {
        const driverVerification = await verifyDriver(driver.email)
        let result

        if (driverVerification.length !== 0) {
            let status = driverVerification.map(el => {
                return el.status_motorista
            })

            if (status[0] === 1) {
                return { status: 401, message: MESSAGE_ERROR.EMAIL_USED }
            } else {
                driver.status_motorista = true
                id = driverVerification.map(el => {
                    return el.id
                })
                driver.id = id[0]
                result = await updateDriver(driver)
            }
        } else {
            result = await insertDriver(driver)
        }

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
    } else if (driver.email.length > 256 || driver.nome.length > 150 || driver.rg.length > 12 || driver.cpf.length > 18 || driver.telefone.length > 20 || driver.senha.length > 32 || driver.cnh.length > 15 || driver.foto.length > 400) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
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
    const messageArray = []
    let messageJson = {}

    await Promise.all(result.map(async element => {
        const resultVan = await selectVanByDriverId(element.id)
        const res = await createJsonDriver(resultVan, element, "array")
        messageArray.push(res)
    }))

    messageJson.drivers = messageArray

    if (messageJson) {
        return { status: 200, message: messageJson }
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
        const resultVan = await selectVanByDriverId(id)
        const messageJson = await createJsonDriver(resultVan, result, "json")

        if (messageJson) {
            return { status: 200, message: messageJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const driverLogin = async (driverLogin, driverPassword) => {
    if (driverLogin == '' || driverLogin == undefined || driverPassword == '' || driverPassword == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const login = await loginDriver(driverLogin, driverPassword)

        if (login) {
            return { status: 200, message: login }
        } else {
            return { message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404 }
        }
    }
}

const verificarDriver = async (driverEmail) => {
    if (driverEmail == '' || driverEmail == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await verifyDriver(driverEmail)

        if (result) {
            return { status: 200, message: result }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarDriversByFilters = async (driverName, price, school) => {
    let result = await selectDriversByFilters(driverName, price, school)

    if (result) {
        let messageArray = []
        let messageJson = {}

        await Promise.all(result.map(async element => {
            const resultVan = await selectVanByDriverId(element.id_motorista)
            const res = await createJsonDriver(resultVan, element, "array")
            let schools = await listarSchoolsByDriverId(element.id_motorista)
            schools = schools.message
            await Promise.all(schools = schools.schools.map(el => {
                delete el.id
                delete el.id_motorista
                delete el.nome_motorista
                return el
            }))
            res.escolas = schools
            delete res.id_escola
            delete res.status_escola
            delete res.nome_escola
            delete res.faixa_preco
            messageArray.push(res)
        }))
        
        messageArray = messageArray.filter((element, index, self) => index === self.findIndex((t => (
            parseInt(t.id_motorista) === parseInt(element.id_motorista)
        ))))

        messageJson.drivers = messageArray
        return { status: 200, message: messageJson }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

module.exports = {
    novoDriver,
    atualizarDriver,
    deletarDriver,
    listarDrivers,
    listarDriverIdByCPF,
    listarDriverById,
    driverLogin,
    verificarDriver,
    listarDriversByFilters
}
