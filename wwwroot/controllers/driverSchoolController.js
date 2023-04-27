/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const { MESSAGE_ERROR } = require('../modules/config.js')
const { selectShoolsByDriverId } = require('../models/DAO/driverSchool.js')
const { selectSchoolById } = require('../models/DAO/school.js')

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
    listarSchoolsByDriverId
}
