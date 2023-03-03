/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertDriver } = require('../models/DAO/driver.js')
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js')

const newDriver = async function (driver){
    //Validacao dos campos obrigatorios para user
    if (user.nome ==  '' || user.nome == null || user.rg == '' || user.rg == null || user.cpf == '' || user.cpf == null || user.telefone == '' || user.telefone == null || user.data_nascimento == '' || user.data_nascimento == null || user.senha == ''|| user.senha == null) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    } else if (!user.email.includes('@')){
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL}
    } else if (user.email.length > 256 || user.nome.length > 150 || user.rg.length > 12 || user.cpf.length > 18 || user.telefone.length > 20 || user.senha.length > 30){
        return {status: 413, message: MESSAGE_ERROR.CHARACTERS_EXCEEDED}
    } else{
        //Chamando a model de user
        const result = await insertUser(user)

        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
        } else{
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
};

module.exports={
    newDriver
}