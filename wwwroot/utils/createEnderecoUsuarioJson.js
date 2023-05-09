/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE ENDEREÇO_USUARIO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 07/05/2023
VERSÃO: 1.0
************************************************************************/
const { listarEnderecoById } = require('../controllers/enderecoController.js')
const userController = require('../controllers/userController.js')

const createEnderecoUsuarioJson = async (enderecoUsuario, message) => {
    let messageJson = {}

    messageJson.id = enderecoUsuario.id
    messageJson.usuario = await userController.listarUserById(enderecoUsuario.id_usuario)
    messageJson.endereco = await listarEnderecoById(enderecoUsuario.id_endereco)

    return messageJson
}

module.exports = {
    createEnderecoUsuarioJson
}
