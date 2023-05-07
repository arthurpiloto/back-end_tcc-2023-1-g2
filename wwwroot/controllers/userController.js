/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertUser, updateUser, deleteUser, selectAllUsers, selectUserById, loginUser, verifyUser } = require('../models/DAO/user.js')
const { verifyCpf } = require('../utils/verifyCpf.js')
const { verifyRg } = require('../utils/verifyRg.js')
const { formatUser } = require('../utils/userFormater.js')
const { cepConverter } = require('../utils/cepConverter.js')
const { novoEndereco } = require('../controllers/enderecoController.js')
const { novoEstado } = require('../controllers/estadoController.js')
const { novoCidade } = require('../controllers/cidadeController.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoUser = async (user) => {
    //Validacao dos campos obrigatorios para user
    if (user.nome == '' || user.nome == null || user.rg == '' || user.rg == null || user.cpf == '' || user.cpf == null || user.cep == '' || user.cep == null || user.telefone == '' || user.telefone == null || user.data_nascimento == '' || user.data_nascimento == null || user.senha == '' || user.senha == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (!user.email.includes('@')) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    } else if (user.email.length > 256 || user.nome.length > 150 || user.rg.length > 12 || user.cpf.length > 18 || user.cep.length > 9 || user.telefone.length > 20 || user.senha.length > 32 || user.foto.length > 400) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        // const safeCpf = await verifyCpf(user.cpf)
        // const safeRg = await verifyRg(user.rg)

        // if (safeCpf && safeRg) {
        const userVerification = await verifyUser(user.email)
        let result

        if (userVerification.length !== 0) {
            let status = userVerification.map(el => {
                return el.status_usuario
            })

            if (status[0] === 1) {
                return { status: 401, message: MESSAGE_ERROR.EMAIL_USED }
            } else {
                user.status_usuario = true
                id = userVerification.map(el => {
                    return el.id
                })
                user.id = id[0]
                result = await updateUser(user)
            }
        } else {
            result = await insertUser(user)
        }

        if (result) {
            let insertEndereco = await cepConverter(user.cep)
            insertEndereco.numero = user.numero

            const idCidade = await novoCidade(insertEndereco.city)

            let estadoJson = {}
            estadoJson.nome = insertEndereco.state
            estadoJson.id_cidade = idCidade.message.id
            const idEstado = await novoEstado(estadoJson)

            insertEndereco.id_cidade = idCidade.message.id
            insertEndereco.id_estado = idEstado.message.id

            const idEndereco = await novoEndereco(insertEndereco)

            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
        // } else {
        //     return { status: 400, message: MESSAGE_ERROR.INVALID_DATA }
        // }
    }
}

const atualizarUser = async (user) => {
    if (user.nome == '' || user.nome == null || user.rg == '' || user.rg == null || user.cpf == '' || user.cpf == null || user.cep == '' || user.cep == null || user.telefone == '' || user.telefone == null || user.data_nascimento == '' || user.data_nascimento == null || user.senha == '' || user.senha == null) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else if (!user.email.includes('@')) {
        return { status: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    } else if (user.email.length > 256 || user.nome.length > 150 || user.rg.length > 12 || user.cpf.length > 18 || user.cep.length > 9 || user.telefone.length > 20 || user.senha.length > 32 || user.foto.length > 400) {
        return { status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED }
    } else {
        // const safeCpf = await verifyCpf(user.cpf)
        // const safeRg = await verifyRg(user.rg)

        // if (safeCpf && safeRg) {
        const result = await updateUser(user)

        if (result) {
            return { status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
        // } else {
        //     return { status: 400, message: MESSAGE_ERROR.INVALID_DATA }
        // }
    }
}

const deletarUser = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await deleteUser(id)

        if (result) {
            return { status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM }
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarUsers = async () => {
    const result = await selectAllUsers()

    if (result) {
        let usersJson = {}
        usersJson.users = await formatUser(result, "")
        return usersJson
    } else {
        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

const listarUserById = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID }
    } else {
        const result = await selectUserById(id)

        if (result) {
            let userJson = await formatUser(result, "json")
            return { status: 200, message: userJson }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

const userLogin = async (userLogin, userPassword) => {
    if (userLogin == '' || userLogin == undefined || userPassword == '' || userPassword == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const login = await loginUser(userLogin, userPassword)

        if (login) {
            return { status: 200, message: login }
        } else {
            return { message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404 }
        }
    }
}

const verificarUser = async (userEmail) => {
    if (userEmail == '' || userEmail == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    } else {
        const result = await verifyUser(userEmail)

        if (result) {
            return { status: 200, message: result }
        } else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}

module.exports = {
    novoUser,
    atualizarUser,
    deletarUser,
    listarUsers,
    listarUserById,
    userLogin,
    verificarUser
}