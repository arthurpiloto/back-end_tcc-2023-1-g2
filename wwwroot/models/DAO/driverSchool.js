/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertDriverSchool = async (driverSchool) => {
    try {
        let sql = `INSERT INTO tbl_escola_motorista (id_escola, id_motorista)
        VALUES (${driverSchool.id_escola}, ${driverSchool.id_motorista})`

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

const updateDriverSchool = async (driverSchool) => {
    try {
        let sql = `UPDATE tbl_escola_motorista SET 
                id_escola = '${driverSchool.id_escola}',
                id_motorista = ${driverSchool.id_motorista} 
            WHERE id = ${driverSchool.id};`

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

const selectShoolsByDriverId = async (id) => {
    try {
        let sql = `SELECT tbl_escola_motorista.id as id, tbl_escola_motorista.id_escola, tbl_escola.nome as nome_escola FROM tbl_escola_motorista
        INNER JOIN tbl_escola
            ON tbl_escola.id = tbl_escola_motorista.id_escola
        WHERE tbl_escola_motorista.id_motorista = ${id};`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result.length != 0) {
            return result
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    insertDriverSchool,
    updateDriverSchool,
    selectShoolsByDriverId
}
