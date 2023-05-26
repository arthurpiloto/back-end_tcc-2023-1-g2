/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE AVALIAÇÃO
AUTOR: ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 26/05/2023
VERSÃO: 1.0
************************************************************************/
const { listarUserById } = require('../controllers/userController.js')
const { formatDate } = require('./formatDate.js')
const createAvaliacao = async (avaliacao, message) => {
    let messageJson = {}
    if (message == "json") {
        messageJson = await Promise.all(avaliacao.map(async el => {
            const user = await listarUserById(el.id_usuario)
            el.data_avaliacao = await formatDate(el.data_avaliacao)
            el.user = user.message.nome
            delete el.id_usuario
            return el
        }))
    } else {
        await Promise.all(avaliacao.map(async el => {
            const user = await listarUserById(el.id_usuario)
            el.data_avaliacao = await formatDate(el.data_avaliacao)
            el.user = user.message.nome
            delete el.id_usuario
            return el
        }))
        messageJson = avaliacao
    }

    return messageJson
}

module.exports = {
    createAvaliacao
}
