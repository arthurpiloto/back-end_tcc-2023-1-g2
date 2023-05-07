/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE ENDEREÇO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 07/05/2023
VERSÃO: 1.0
************************************************************************/
const { listarEstadoById } = require('../controllers/estadoController.js')
const { listarCidadeById } = require('../controllers/cidadeController.js')

const createEnderecoJson = async (endereco, message) => {
    let messageJson = {}

    if (message === "json") {
        messageJson.id = endereco.id
        messageJson.cep = endereco.cep
        messageJson.numero = endereco.numero
        messageJson.bairro = endereco.bairro
        messageJson.logradouro = endereco.logradouro
        messageJson.status_endereco = endereco.status_endereco

        let estadoJson = {}
        const estado = await listarEstadoById(endereco.id_estado)

        estadoJson.id = estado.message.id
        estadoJson.nome = estado.message.nome
        estadoJson.status_estado = estado.message.status_estado
        const cidade = await listarCidadeById(estado.message.id_cidade)
        estadoJson.cidade = cidade.message

        messageJson.estado = estadoJson
    } else {
        await Promise.all(endereco.map(async el => {
            el.id = el.id
            el.cep = el.cep
            el.numero = el.numero
            el.bairro = el.bairro
            el.logradouro = el.logradouro
            el.status_endereco = el.status_endereco

            let estadoJson = {}
            const estado = await listarEstadoById(el.id_estado)
            estadoJson.id = estado.message.id
            estadoJson.nome = estado.message.nome
            estadoJson.status_estado = estado.message.status_estado
            const cidade = await listarCidadeById(estado.message.id_cidade)
            estadoJson.cidade = cidade.message

            el.estado = estadoJson
            delete el.id_estado
            return el
        }))
        messageJson = endereco
    }

    return messageJson
}

module.exports = {
    createEnderecoJson
}
