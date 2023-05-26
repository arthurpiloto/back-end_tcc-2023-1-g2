/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 23/05/2023
VERSÃO: 1.0
************************************************************************/
const { insertUsuarioAvaliacaoMotorista, updateUsuarioAvaliacaoMotorista, deleteUsuarioAvaliacaoMotorista, selectAllUsuariosAvaliacoesMotoristas, selectUsuarioAvaliacaoMotoristaById, selectUsuarioAvaliacaoMotoristaByIdMotorista, selectUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista } = require('../models/DAO/usuarioAvaliacaoMotorista.js')
const { driverAvaliacoes } = require('../models/DAO/driver.js')
const { createAvaliacao } = require('../utils/createAvaliacao.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoUsuarioAvaliacaoMotorista = async (usuarioAvaliacaoMotorista) => {
    if (usuarioAvaliacaoMotorista.id_usuario == '' || usuarioAvaliacaoMotorista.id_usuario == null || usuarioAvaliacaoMotorista.id_motorista == '' || usuarioAvaliacaoMotorista.id_motorista == null || usuarioAvaliacaoMotorista.id_avaliacao == '' || usuarioAvaliacaoMotorista.id_avaliacao == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        let result = false
        const verify = await listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista(usuarioAvaliacaoMotorista.id_usuario, usuarioAvaliacaoMotorista.id_motorista)

        if (verify.status == 200) {
            usuarioAvaliacaoMotorista.id = verify.message.id
            result = await atualizarUsuarioAvaliacaoMotorista(usuarioAvaliacaoMotorista)
        } else {
            result = await insertUsuarioAvaliacaoMotorista(usuarioAvaliacaoMotorista)
        }

        if (result) {
            const avaliacao = await calculateAvaliacao(usuarioAvaliacaoMotorista.id_motorista)

            if (avaliacao) {
                let driver = { id: usuarioAvaliacaoMotorista.id_motorista, avaliacao: avaliacao }
                const insertAvaliacao = await driverAvaliacoes(driver)

                if (insertAvaliacao) {
                    return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
                } else {
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }
            } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const atualizarUsuarioAvaliacaoMotorista = async (usuarioAvaliacaoMotorista) => {
    if (usuarioAvaliacaoMotorista.id_usuario == '' || usuarioAvaliacaoMotorista.id_usuario == null || usuarioAvaliacaoMotorista.id_motorista == '' || usuarioAvaliacaoMotorista.id_motorista == null || usuarioAvaliacaoMotorista.id_avaliacao == '' || usuarioAvaliacaoMotorista.id_avaliacao == null || usuarioAvaliacaoMotorista.id == '' || usuarioAvaliacaoMotorista.id == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await updateUsuarioAvaliacaoMotorista(usuarioAvaliacaoMotorista)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const deletarUsuarioAvaliacaoMotorista = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteUsuarioAvaliacaoMotorista(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarUsuarioAvaliacaoMotoristaById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        let result = await selectUsuarioAvaliacaoMotoristaById(id)

        if (result.length !== 0) {
            result = await createAvaliacao(result, "json")
            return { status: 200, message: result[0] }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarUsuariosAvaliacoesMotoristas = async () => {
    let result = await selectAllUsuariosAvaliacoesMotoristas()

    if (result) {
        result = await createAvaliacao(result, "array")
        let jsonReturn = {}
        jsonReturn.usuarios_avaliacoes_motoristas = result
        return { status: 200, message: jsonReturn }
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarUsuarioAvaliacaoMotoristaByIdMotorista = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        let result = await selectUsuarioAvaliacaoMotoristaByIdMotorista(id)

        if (result.length !== 0) {
            result = await createAvaliacao(result, "array")
            let jsonReturn = {}
            jsonReturn.usuarios_avaliacoes_motorista = result
            return { status: 200, message: jsonReturn }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista = async (idUser, idDriver) => {
    if (idUser == '' || idUser == undefined || idDriver == '' || idDriver == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        let result = await selectUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista(idUser, idDriver)

        if (result.length !== 0) {
            result = await createAvaliacao(result, "json")
            return { status: 200, message: result[0] }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const calculateAvaliacao = async (idDriver) => {
    let nota1 = 0, nota2 = 0, nota3 = 0, nota4 = 0, nota5 = 0

    const driverAvaliacoes = await listarUsuarioAvaliacaoMotoristaByIdMotorista(idDriver)

    driverAvaliacoes.message.usuarios_avaliacoes_motorista.forEach(el => {
        switch (el.id_avaliacao) {
            case el.id_avaliacao = 1:
                nota1 = nota1 + 1
                break;
            case el.id_avaliacao = 2:
                nota2 = nota2 + 1
                break;
            case el.id_avaliacao = 3:
                nota3 = nota3 + 1
                break;
            case el.id_avaliacao = 4:
                nota4 = nota4 + 1
                break;
            case el.id_avaliacao = 7:
                nota5 = nota5 + 1
                break;
        }
    })
    
    let media = ((nota1 * 1) + (nota2 * 2) + (nota3 * 3) + (nota4 * 4) + (nota5 * 5)) / (driverAvaliacoes.message.usuarios_avaliacoes_motorista.length)
    media = parseFloat(media.toFixed(1))

    if (media) {
        return media
    } else {
        return false
    }
}

module.exports = {
    novoUsuarioAvaliacaoMotorista,
    atualizarUsuarioAvaliacaoMotorista,
    listarUsuariosAvaliacoesMotoristas,
    deletarUsuarioAvaliacaoMotorista,
    listarUsuarioAvaliacaoMotoristaById,
    listarUsuarioAvaliacaoMotoristaByIdMotorista,
    listarUsuarioAvaliacaoMotoristaByIdUsuarioAndIdMotorista
}