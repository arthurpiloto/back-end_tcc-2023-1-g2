/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertModel = async (model) => {
    try {
        let sql = `INSERT INTO tbl_modelo (modelo)
        values ('${model.modelo}');`

        const result = await prisma.$executeRawUnsafe(sql)

        console.log(result)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectModelIdByName = async (name) => {
    try {
        let sql = `SELECT CAST(id AS DECIMAL) AS id FROM tbl_modelo WHERE modelo LIKE '${name}';`

        const id = await prisma.$queryRawUnsafe(sql)

        if (id.length > 0) {
            return id
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    insertModel,
    selectModelIdByName
}
