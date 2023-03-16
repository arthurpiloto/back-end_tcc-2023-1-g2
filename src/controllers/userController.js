/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertUser, updateUser, deleteUser, selectAllUsers, selectUserById, loginUser } = require('../models/DAO/user.js')
const { createJwt, validateJwt } = require('../../middlewares/jwt.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const novoUser = async (user) => {
    //Validacao dos campos obrigatorios para user
    if (user.nome ==  '' || user.nome == null || user.rg == '' || user.rg == null || user.cpf == '' || user.cpf == null || user.telefone == '' || user.telefone == null || user.data_nascimento == '' || user.data_nascimento == null || user.senha == ''|| user.senha == null) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if (!user.email.includes('@')){
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } else if (user.email.length > 256 || user.nome.length > 150 || user.rg.length > 12 || user.cpf.length > 18 || user.telefone.length > 20 || user.senha.length > 30){
        return {status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED}
    } else {
        const result = await insertUser(user)

        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const atualizarUser = async (user) => {
    if (user.nome ==  '' || user.nome == null || user.rg == '' || user.rg == null || user.cpf == '' || user.cpf == null || user.telefone == '' || user.telefone == null || user.data_nascimento == '' || user.data_nascimento == null || user.senha == ''|| user.senha == null) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if (!user.email.includes('@')){
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } else if (user.email.length > 256 || user.nome.length > 150 || user.rg.length > 12 || user.cpf.length > 18 || user.telefone.length > 20 || user.senha.length > 30){
        return {status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED}
    } else {
        const result = await updateUser(user)

        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarUser = async (id) => {
    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else {
        const result = await deleteUser(id)

        if (result) {
            return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const listarUsers = async () => {
    const result = await selectAllUsers()

    if (result) {
        let usersJson = {}
        usersJson.users = result
        return usersJson
    } else {
        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
}

const listarUserById = async (id) => {
    if (id == '' || id == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else {
        const result = await selectUserById(id)

        if (result) {
            let userJson = {}
            userJson.user = result
            return userJson
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const userLogin = async(userLogin, userPassword) => {
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

module.exports = {
    novoUser,
    atualizarUser,
    deletarUser,
    listarUsers,
    listarUserById,
    userLogin
}