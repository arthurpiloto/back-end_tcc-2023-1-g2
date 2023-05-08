/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertSchool, selectAllSchools, updateSchool, deleteSchool, selectSchoolById, selectSchoolByName } = require('../models/DAO/school.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoSchool = async (school) => {
    if (school.nome == '' || school.nome == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (school.nome.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const verify = await listarSchoolByName(school.nome)

        if (verify.status == 200) {
            return { status: 401, message: verify.message }
        } else {
            const result = await insertSchool(school)
    
            if (result) {
                return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        }
    }
}

const atualizarSchool = async (school) => {
    if (school.nome == '' || school.nome == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (school.nome.length > 150) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        const result = await updateSchool(school)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarSchool = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteSchool(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarSchoolById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectSchoolById(id)

        if (result.length !== 0) {
            let schoolJson = {}
            result.forEach(element => {
                schoolJson = element
            })
            return { status: 200, message: schoolJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarSchools = async () => {
    const result = await selectAllSchools()

    if (result) {
        let schoolsJson = {}
        schoolsJson.schools = result
        return schoolsJson
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarSchoolByName = async (school) => {
    if (school == '' || school == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await selectSchoolByName(school)

        if (result.length !== 0) {
            let schoolJson = {}
            result.forEach(element => {
                schoolJson = element
            })
            return { status: 200, message: schoolJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoSchool, listarSchools, atualizarSchool, deletarSchool, listarSchoolById, listarSchoolByName
}