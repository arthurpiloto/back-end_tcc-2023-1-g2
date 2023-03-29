/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertComment = async (comment) => {
    try {
        let sql = `INSERT INTO tbl_comentario (comentario, id_usuario, id_motorista)
        VALUES ('${comment.comentario}', ${comment.id_usuario}, ${comment.id_motorista});`

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

const updateComment = async (comment) => {
    try {
        let sql = `UPDATE tbl_comentario SET 
                comentario = '${comment.comentario}', 
                id_usuario =  ${comment.id_usuario},
                id_motorista = ${comment.id_motorista}
            WHERE id = ${comment.id};`

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

const deleteComment = async (id) => {
    try {
        let sql = `DELETE FROM tbl_comentario WHERE id = ${id}`

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

const selectCommentById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_comentario WHERE id = ${id}`

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

const selectAllComments = async () => {
    try {
        let sql = `SELECT * FROM tbl_comentario ORDER BY id DESC`

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
    insertComment, updateComment, selectAllComments, deleteComment, selectCommentById
}