/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertVan = async (van) => {
    try {
        let sql = `INSERT INTO tbl_van (placa, foto, quantidade_vagas, id_modelo, id_motorista)
        values ('${van.placa}', '${van.foto}', ${van.quantidade_vagas}, ${van.id_modelo}, ${van.id_motorista});`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    insertVan,
}
