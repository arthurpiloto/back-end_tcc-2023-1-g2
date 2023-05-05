/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 04/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertPrice = async (price) => {
    try {
        let sql = `INSERT INTO tbl_preco (faixa_preco)
        VALUES ('${price.faixa_preco}');`

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

const updatePrice = async (price) => {
    try {
        let sql = `UPDATE tbl_preco SET 
                faixa_preco = '${price.faixa_preco}'
            WHERE id = ${price.id};`

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

const deletePrice = async (id) => {
    try {
        let sql = `DELETE FROM tbl_preco WHERE id = ${id}`

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

const selectAllPrices = async () => {
    try {
        let sql = `SELECT * FROM tbl_preco ORDER BY id DESC`

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

const selectPriceById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_preco WHERE id = ${id}`

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
    insertPrice,
    updatePrice,
    deletePrice,
    selectAllPrices,
    selectPriceById
}
