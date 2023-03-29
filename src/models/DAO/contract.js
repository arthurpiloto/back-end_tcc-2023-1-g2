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
        let sql = `INSERT INTO tbl_contrato (valor, nome_passageiro, idade_passageiro, id_usuario, id_motorista, id_escola, id_tipo_pagamento, id_tipo_contrato)
        VALUES (${contract.valor}, '${contract.nome_passageiro}', ${contract.idade_passageiro}, ${contract.id_usuario}, ${contract.id_motorista}, ${contract.id_escola}, ${contract.id_tipo_pagamento}, ${contract.id_tipo_contrato});`
        
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

module.exports={
    insertContract
}