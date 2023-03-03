/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE RECEBIMENTO,
TRATAMENTO E RETORNO DE DADOS ENTRE A API E A MODEL
AUTOR: NICOLAS DOBBECK
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { insertUser } = require('../models/DAO/user.js')

const newUser = async function (user){
    //Validacao dos campos obrigatorios para user
    if (user.nome ==  '' || user.nome == null || user.rg == '' || user.rg == null || user.cpf == '' || user.cpf == null || user.telefone == '' || user.telefone == null || user.data_nascimento == '' || user.data_nascimento == null || user.senha == ''|| user.senha == null) {
        return {status: 400, message: "Os campos obrigadtorios nao foram preenchidos"}
    } else if (!user.email.includes('@')){
        return {status: 400, message: "O email nao contem @, o que eh um requisito"}
    } else if (user.email.length > 256 || user.nome.length > 150 || user.rg.length > 12 || user.cpf.length > 18 || user.telefone.length > 20 || user.senha.length > 30){
        return {status: 400, message: "Numero de caracteres excedido"}
    } else{
        //Chamando a model de user
        const result = await insertUser(user)

        if (result) {
            return {status: 201, message: "Item criado com sucesso"}
        } else{
            return {status: 500, message: "Erro ao inserir usuario"}
        }
    }
};

module.exports={
    newUser
}