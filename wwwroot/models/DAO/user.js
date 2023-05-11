/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertUser = async (user) => {
    try {
        let sql = `INSERT INTO tbl_usuario (nome, email, rg, cpf, cep, telefone, data_nascimento, senha, foto, status_usuario)
        VALUES ('${user.nome}', '${user.email}', '${user.rg}', '${user.cpf}', '${user.cep}', '${user.telefone}', '${user.data_nascimento}', md5('${user.senha}'), '${user.foto}', true);`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            sql = `SELECT id FROM tbl_usuario ORDER BY id DESC LIMIT 1;`
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

const updateUser = async (user) => {
    try {
        let sql = `UPDATE tbl_usuario SET 
            nome = '${user.nome}', 
            email = '${user.email}', 
            rg = '${user.rg}', 
            cpf = '${user.cpf}', 
            cep = '${user.cep}', 
            telefone = '${user.telefone}', 
            data_nascimento = '${user.data_nascimento}', 
            senha = md5('${user.senha}'), 
            foto = '${user.foto}',
            status_usuario = ${user.status_usuario}
        WHERE id = ${user.id};`

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

const deleteUser = async (id) => {
    try {
        let sql = `CALL deletePerfilUsuario(${id});`
        
        const result = await prisma.$queryRawUnsafe(sql)
        
        if (result) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectAllUsers = async () => {
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE status_usuario = 1 ORDER BY id DESC`

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

const selectUserById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE id = ${id};`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result != null) {
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const loginUser = async (userLogin, userPassword) => {
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE email = '${userLogin}' AND senha = md5('${userPassword}');`

        const result = await prisma.$queryRawUnsafe(sql)

        if(result.length > 0)
            return result
        else
            return false
    } catch (err) {
        return false
    }
}

const verifyUser = async (userEmail) => {
    try {
        let sql = `SELECT * FROM tbl_usuario WHERE email = '${userEmail}';`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result != null) {
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    selectAllUsers,
    selectUserById,
    loginUser,
    verifyUser
}
