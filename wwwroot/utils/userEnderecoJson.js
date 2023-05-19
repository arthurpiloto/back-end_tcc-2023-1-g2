/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CONSTRUÇÃO DO JSON DE ENDEREÇO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 19/05/2023
VERSÃO: 1.0
************************************************************************/
const { listarEnderecoById } = require('../controllers/enderecoController.js')

const userEnderecoJson = async (result) => {
    let json = {}
    const idEndereco = result.map(el => { return el.id_endereco })
    const idUsuario = result.map(el => { return el.id_usuario })
    const idEnderecoUsuario = result.map(el => { return el.id })
    json.id = idEnderecoUsuario[0]
    json.id_usuario = idUsuario[0]
    const endereco = await listarEnderecoById(idEndereco[0])
    json.endereco = endereco.message

    return json
}

module.exports = {
    userEnderecoJson
}
