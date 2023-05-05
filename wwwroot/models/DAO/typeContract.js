/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 29/03/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertTypeContract = async (typeContract) => {
    try {
        let sql = `INSERT INTO tbl_tipo_contrato (tipo_contrato, status_tipo_contrato)
        VALUES ('${typeContract.tipo_contrato}', true);`

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

const updateTypeContract = async (typeContract) => {
    try {
        let sql = `UPDATE tbl_tipo_contrato SET 
                tipo_contrato = '${typeContract.tipo_contrato}',
                status_tipo_contrato = ${typeContract.status_tipo_contrato} 
            WHERE id = ${typeContract.id};`

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

const deleteTypeContract = async (id) => {
    try {
        let sql = `UPDATE tbl_tipo_contrato SET
            status_tipo_contrato = false
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

const selectTypeContractById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_tipo_contrato WHERE id = ${id}`

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

const selectAllTypesContracts = async () => {
    try {
        let sql = `SELECT * FROM tbl_tipo_contrato ORDER BY id DESC`

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
    insertTypeContract, selectAllTypesContracts, updateTypeContract, deleteTypeContract, selectTypeContractById
}