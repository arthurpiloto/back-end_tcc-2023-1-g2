/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 27/03/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertSchool = async (school) => {
    try {
        let sql = `INSERT INTO tbl_escola (nome, status_escola)
        VALUES ('${school.nome}', true);`

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

const updateSchool = async (school) => {
    try {
        let sql = `UPDATE tbl_escola SET 
                nome = '${school.nome}',
                status_escola = ${school.status_escola} 
            WHERE id = ${school.id};`

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

const deleteSchool = async (id) => {
    try {
        let sql = `UPDATE tbl_escola SET
            status_escola = false
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

const selectAllSchools = async () => {
    try {
        let sql = `SELECT * FROM tbl_escola ORDER BY id DESC`

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

const selectSchoolById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_escola WHERE id = ${id}`

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

module.exports={
    insertSchool, selectAllSchools, updateSchool, deleteSchool, selectSchoolById
}