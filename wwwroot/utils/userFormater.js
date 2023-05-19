/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA FORMATAÇÃO DOS DADOS DE USUÁRIO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 27/04/2023
VERSÃO: 1.0
************************************************************************/
const { formatDate } = require('./formatDate.js')
const { listarEnderecoByUsuarioId } = require('../controllers/enderecoUsuarioController.js')
const formatUser = async (result, message) => {
    userJson = {}
    if (message === "json") {
        await Promise.all(result.map(async element => {
            element.data_nascimento = await formatDate(element.data_nascimento)
            const endereco = await listarEnderecoByUsuarioId(element.id)
            element.endereco = endereco.message.endereco
            return element
        }))
        return result[0]
    } else {
        userJson = await Promise.all(result.map(async el => {
            el.data_nascimento = await formatDate(el.data_nascimento)
            const endereco = await listarEnderecoByUsuarioId(el.id)
            el.endereco = endereco.message.endereco
            return el
        }))
    }

    return userJson
}

module.exports = {
    formatUser
}
