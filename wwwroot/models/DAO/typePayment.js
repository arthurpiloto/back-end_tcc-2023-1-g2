/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 28/03/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertTypePayment = async (typePayment) => {
    try {
        let sql = `INSERT INTO tbl_tipo_pagamento (tipo_pagamento, status_tipo_pagamento)
        VALUES ('${typePayment.tipo_pagamento}', true);`

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

const updateTypePayment = async (typePayment) => {
    try {
        let sql = `UPDATE tbl_tipo_pagamento SET 
                tipo_pagamento = '${typePayment.tipo_pagamento}',
                status_tipo_pagamento = ${typePayment.status_tipo_pagamento}
            WHERE id = ${typePayment.id};`

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

const deleteTypePayment = async (id) => {
    try {
        let sql = `UPDATE tbl_tipo_pagamento SET
            status_tipo_pagamento = false
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

const selectTypePaymentByID = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_tipo_pagamento WHERE id = ${id}`

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

const selectAllTypesPayments = async () => {
    try {
        let sql = `SELECT * FROM tbl_tipo_pagamento ORDER BY id DESC`

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
    insertTypePayment, selectAllTypesPayments, updateTypePayment, deleteTypePayment, selectTypePaymentByID
}