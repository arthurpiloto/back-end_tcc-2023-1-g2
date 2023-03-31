/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA CRIAÇÃO DO JSON DE MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 16/03/2023
VERSÃO: 1.0
************************************************************************/
const createDriverJson = async (result) => {
    let arrayDrivers = []
    for (let index = 0; index <= result.length; index++) {
        let jsonData = {}
        let driverJson = {}
        let vanJson = {}
        let modelJson = {}
        result.forEach(element => {
            modelJson = {
                id: element.id_modelo,
                modelo: element.modelo_van,
                status: element.status_modelo
            }
            vanJson = {
                id: element.id_van,
                placa: element.placa,
                foto: element.foto_van,
                quantidade_vagas: element.quantidade_vagas,
                status: element.status_van,
                modelo: modelJson
            }
            driverJson = {
                id: element.id_motorista,
                nome: element.nome,
                email: element.email,
                rg: element.rg,
                cpf: element.cpf,
                cnh: element.cnh,
                telefone: element.telefone,
                data_nascimento: element.data_nascimento,
                inicio_carreira: element.inicio_carreira,
                senha: element.senha,
                foto: element.foto_motorista,
                avaliacao: element.avaliacao,
                descricao: element.descricao,
                status: element.status_motorista,
                vans: [vanJson]
            }
        })
        jsonData.driver = driverJson
        arrayDrivers.push(jsonData)
    }
    console.log(arrayDrivers)
}

module.exports = {
    createDriverJson
}
