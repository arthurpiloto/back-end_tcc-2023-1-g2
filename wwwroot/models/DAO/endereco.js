/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 05/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertEndereco = async (endereco) => {
    try {
        let sql = `INSERT INTO tbl_endereco (cep, numero, bairro, logradouro, status_endereco, id_estado)
        VALUES ('${endereco.cep}', '${endereco.numero}', '${endereco.neighborhood}', '${endereco.street}', true, ${endereco.id_estado});`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            sql = `SELECT id FROM tbl_endereco ORDER BY id DESC LIMIT 1;`
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

const updateEndereco = async (endereco) => {
    try {
        let sql = `UPDATE tbl_endereco SET
                cep = '${endereco.cep}',
                numero = '${endereco.numero}',
                bairro = '${endereco.neighborhood}',
                logradouro = '${endereco.street}',
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
        let sql = `DELETE FROM tbl_endereco WHERE id = ${id}`

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
