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
        let sql = `INSERT INTO tbl_modelo (modelo, status_modelo)
        VALUES ('${model.modelo}', ${model.status_modelo});`

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

const updateModel = async (model) => {
    try {
        let sql = `UPDATE tbl_modelo SET
            modelo = '${model.modelo}',
            status_modelo = ${model.status_modelo}
        WHERE id = ${model.id};`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

const deleteModel = async (id) => {
    try {
        let sql = `UPDATE tbl_modelo SET
            status_modelo = false
        WHERE id = ${id}`;
        
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

const selectAllModels = async () => {
    try {
        let sql = `SELECT * FROM tbl_modelo WHERE status_modelo = 1 ORDER BY id DESC `

        const result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
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
    updateModel,
    deleteModel,
    selectAllModels,
    selectModelIdByName
}
