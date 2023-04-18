/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const selectShoolsByDriverId = async (id) => {
    try {
        let sql = `SELECT id_escola FROM tbl_escola_motorista WHERE id_motorista = ${id};`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result.length != 0) {
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    selectShoolsByDriverId
}
