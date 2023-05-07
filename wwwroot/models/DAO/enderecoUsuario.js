/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 17/04/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertEnderecoUsuario = async (enderecoUsuario) => {
    try {
        let sql = `INSERT INTO tbl_endereco_usuario (id_endereco, id_usuario)
        VALUES (${enderecoUsuario.id_endereco}, ${enderecoUsuario.id_usuario})`

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

const updateEnderecoUsuario = async (enderecoUsuario) => {
    try {
        let sql = `UPDATE tbl_endereco_usuario SET 
                id_endereco = '${enderecoUsuario.id_endereco}',
                id_usuario = ${enderecoUsuario.id_usuario} 
            WHERE id = ${enderecoUsuario.id};`

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

const deleteEnderecoUsuario = async (id) => {
    try {
        let sql = `DELETE FROM tbl_endereco_usuario WHERE id = ${id}`

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

const selectAllEnderecosUsuario = async () => {
    try {
        let sql = `SELECT * FROM tbl_endereco_usuario;`

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

const selectEnderecoByUserId = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_endereco_usuario WHERE id_usuario = ${id};`

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
    insertEnderecoUsuario,
    updateEnderecoUsuario,
    deleteEnderecoUsuario,
    selectAllEnderecosUsuario,
    selectEnderecoByUserId
}
