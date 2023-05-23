/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  ARTHUR PILOTO SILVA
DATA DE CRIAÇÃO: 23/05/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertUsuarioAvaliacaoMotorista = async (usuarioAvaliacaoMotorista) => {
    try {
        let sql = `INSERT INTO tbl_usuario_avaliacao_motorista (id_usuario, id_motorista, id_avaliacao)
        VALUES (${usuarioAvaliacaoMotorista.id_usuario}, ${usuarioAvaliacaoMotorista.id_motorista}, ${usuarioAvaliacaoMotorista.id_avaliacao});`

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

const updateUsuarioAvaliacaoMotorista = async (usuarioAvaliacaoMotorista) => {
    try {
        let sql = `UPDATE tbl_usuario_avaliacao_motorista SET 
            id_usuario = ${usuarioAvaliacaoMotorista.id_usuario},
            id_motorista = ${usuarioAvaliacaoMotorista.id_motorista},
            id_avaliacao = ${usuarioAvaliacaoMotorista.id_avaliacao}
        WHERE id = ${usuarioAvaliacaoMotorista.id};`

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

const deleteUsuarioAvaliacaoMotorista = async (id) => {
    try {
        let sql = `DELETE FROM tbl_usuario_avaliacao_motorista WHERE id = ${id};`

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

const selectAllUsuariosAvaliacoesMotoristas = async () => {
    try {
        let sql = `SELECT * FROM tbl_usuario_avaliacao_motorista ORDER BY id DESC;`

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

const selectUsuarioAvaliacaoMotoristaById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_usuario_avaliacao_motorista WHERE id = ${id}`

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

const selectUsuarioAvaliacaoMotoristaByIdMotorista = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_usuario_avaliacao_motorista WHERE id_motorista = ${id}`

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
    insertUsuarioAvaliacaoMotorista,
    updateUsuarioAvaliacaoMotorista,
    deleteUsuarioAvaliacaoMotorista,
    selectAllUsuariosAvaliacoesMotoristas,
    selectUsuarioAvaliacaoMotoristaById,
    selectUsuarioAvaliacaoMotoristaByIdMotorista
}
