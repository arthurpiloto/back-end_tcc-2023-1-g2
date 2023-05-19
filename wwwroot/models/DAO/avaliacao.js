/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 19/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertAvaliacao = async (avaliacao) => {
    try {
        let sql = `INSERT INTO tbl_avaliacao (avaliacao)
        VALUES ('${avaliacao}');`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const updateAvaliacao = async (avaliacao) => {
    try {
        let sql = `UPDATE tbl_avaliacao SET 
                avaliacao = '${avaliacao.avaliacao}'
            WHERE id = ${avaliacao.id};`

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

const deleteAvaliacao = async (id) => {
    try {
        let sql = `DELETE FROM tbl_avaliacao WHERE id = ${id};`

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

const selectAllAvaliacoes = async () => {
    try {
        let sql = `SELECT * FROM tbl_avaliacao ORDER BY id DESC;`

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

const selectAvaliacaoById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_avaliacao WHERE id = ${id}`

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

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacoes,
    selectAvaliacaoById
}
