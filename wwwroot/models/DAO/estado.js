/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertEstado = async (estado) => {
    try {
        let sql = `INSERT INTO tbl_estado (nome, status_estado, id_cidade)
        VALUES ('${estado.nome}', true, ${estado.id_cidade});`

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

const updateEstado = async (estado) => {
    try {
        let sql = `UPDATE tbl_estado SET 
                nome = '${estado.nome}',
                status_estado = ${estado.status_estado},
                id_cidade = ${estado.id_cidade}
            WHERE id = ${estado.id};`

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

const deleteEstado = async (id) => {
    try {
        let sql = `UPDATE tbl_estado SET
            status_estado = false
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

const selectAllEstados = async () => {
    try {
        let sql = `SELECT * FROM tbl_estado WHERE status_estado = 1 ORDER BY id DESC`

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

const selectEstadoById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_estado WHERE id = ${id}`

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
    insertEstado,
    updateEstado,
    deleteEstado,
    selectAllEstados,
    selectEstadoById
}
