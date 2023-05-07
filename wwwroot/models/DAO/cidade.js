/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertCidade = async (cidade) => {
    try {
        let sql = `INSERT INTO tbl_cidade (nome, status_cidade)
        VALUES ('${cidade.nome}', true);`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            sql = `SELECT id FROM tbl_cidade WHERE nome LIKE '${cidade.nome}';`
            result = await prisma.$queryRawUnsafe(sql)

            if (result) {
                return result
            }
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const updateCidade = async (cidade) => {
    try {
        let sql = `UPDATE tbl_cidade SET 
                nome = '${cidade.nome}',
                status_cidade = ${cidade.status_cidade}
            WHERE id = ${cidade.id};`

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

const deleteCidade = async (id) => {
    try {
        let sql = `UPDATE tbl_cidade SET
            status_cidade = false
        WHERE id = ${id}`

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

const selectAllCidades = async () => {
    try {
        let sql = `SELECT * FROM tbl_cidade WHERE status_cidade = 1 ORDER BY id DESC`

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

const selectCidadeById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_cidade WHERE id = ${id}`

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

const selectCidadeByName = async (cidade) => {
    try {
        let sql = `SELECT * FROM tbl_cidade WHERE nome LIKE '${cidade}'`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result) {
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
    insertCidade,
    updateCidade,
    deleteCidade,
    selectAllCidades,
    selectCidadeById,
    selectCidadeByName
}
