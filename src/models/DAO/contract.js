/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR:  NICOLAS DOBBECK MENDES
DATA DE CRIAÇÃO: 29/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertContract = async (contract) => {
    try {
        let sql = `INSERT INTO tbl_contrato (valor, nome_passageiro, idade_passageiro, id_usuario, id_motorista, id_escola, id_tipo_pagamento, id_tipo_contrato, status_contrato)
        VALUES (${contract.valor}, '${contract.nome_passageiro}', ${contract.idade_passageiro}, ${contract.id_usuario}, ${contract.id_motorista}, ${contract.id_escola}, ${contract.id_tipo_pagamento}, ${contract.id_tipo_contrato}, ${contract.status_contrato});`
        
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
        return false
    }
}

const updateContract = async (contract) => {
    try {
        let sql = `UPDATE tbl_contrato SET 
                valor = ${contract.valor}, 
                nome_passageiro =  '${contract.nome_passageiro}',
                idade_passageiro = ${contract.idade_passageiro},
                id_usuario = ${contract.id_usuario},
                id_motorista = ${contract.id_motorista},
                id_escola = ${contract.id_escola},
                id_tipo_pagamento = ${contract.id_tipo_pagamento},
                id_tipo_contrato = ${contract.id_tipo_contrato},
                status_contrato = ${contract.status_contrato}
            WHERE id = ${contract.id};`

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

const deleteContract = async (id) => {
    try {
        let sql = `DELETE FROM tbl_contrato WHERE id = ${id}`

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

const selectAllContracts = async () => {
    try {
        let sql = `SELECT * FROM tbl_contrato ORDER BY id DESC`

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

const selectContractById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_contrato WHERE id = ${id}`

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
    insertContract, updateContract, selectAllContracts, deleteContract, selectContractById
}