/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertEndereco = async (resultCep, endereco) => {
    try {
        let sql = `INSERT INTO tbl_endereco (cep, numero, bairro, logradouro, status_endereco, id_estado)
        VALUES ('${resultCep.cep}', '${endereco.numero}', '${resultCep.neighborhood}', '${resultCep.street}', true, ${endereco.id_estado});`

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

const updateEndereco = async (resultCep, endereco) => {
    try {
        let sql = `UPDATE tbl_endereco SET
                cep = '${resultCep.cep}',
                numero = '${endereco.numero}',
                bairro = '${resultCep.neighborhood}',
                logradouro = '${resultCep.street}',
                status_endereco = ${endereco.status_endereco},
                id_estado = ${endereco.id_estado}
            WHERE id = ${endereco.id};`

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

const deleteEndereco = async (id) => {
    try {
        let sql = `UPDATE tbl_endereco SET
            status_endereco = false
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

const selectAllEnderecos = async () => {
    try {
        let sql = `SELECT * FROM tbl_endereco WHERE status_endereco = 1 ORDER BY id DESC`

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

const selectEnderecoById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_endereco WHERE id = ${id}`

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
    insertEndereco,
    updateEndereco,
    deleteEndereco,
    selectAllEnderecos,
    selectEnderecoById
}
