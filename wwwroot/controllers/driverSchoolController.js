/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')
const { insertDriverSchool, selectShoolsByDriverId } = require('../models/DAO/driverSchool.js')

const novoSchoolDriver = async (driverSchool) => {
    if (driverSchool.id_escola == '' || driverSchool.id_escola == undefined || driverSchool.id_motorista == '' || driverSchool.id_motorista == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        let messageReturn = false
        const driverSchools = await listarSchoolsByDriverId(driverSchool.id_motorista)
        if (driverSchools.status !== 404) {
            driverSchools.message.schools.forEach(el => {
                if (el.id_escola == driverSchool.id_escola) {
                    messageReturn = true
                }
            })
            return { status: 401, message: MESSAGE_ERROR.SCHOOL_EXISTS }
        } else {
            if (messageReturn) {
                return { status: 401, message: MESSAGE_ERROR.SCHOOL_EXISTS }
            } else {
                const result = await insertDriverSchool(driverSchool)
        
                if (result) {
                    return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
                } else {
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }
            }
        }
    }
}

const listarSchoolsByDriverId = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectShoolsByDriverId(id)

        if (result) {
            let schoolsJson = {}
            schoolsJson.schools = result
            return { status: 200, message: schoolsJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoSchoolDriver,
    listarSchoolsByDriverId
}
