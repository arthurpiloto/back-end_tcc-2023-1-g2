/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertUser = async (user) => {
    try {
        let sql = `INSERT INTO tbl_usuario (nome, email, rg, cpf, telefone, data_nascimento, senha, foto)
        values ('${user.nome}', '${user.email}', '${user.rg}', '${user.cpf}', '${user.telefone}', '${user.data_nascimento}', '${user.senha}', '${user.foto}');`

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

module.exports = {
    insertUser,
}
