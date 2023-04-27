/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertDriver = async (driver) => {
    try {
        let sql = `INSERT INTO tbl_motorista (nome, email, rg, cpf, cnh, telefone, data_nascimento, inicio_carreira, senha, foto, avaliacao, descricao, status_motorista)
        values ('${driver.nome}', '${driver.email}', '${driver.rg}', '${driver.cpf}', '${driver.cnh}', '${driver.telefone}', '${driver.data_nascimento}', '${driver.inicio_carreira}', md5('${driver.senha}'), '${driver.foto}', ${driver.avaliacao}, '${driver.descricao}', true);`

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

const updateDriver = async (driver) => {
    try {
        let sql = `UPDATE tbl_motorista SET 
            nome = '${driver.nome}',
            email = '${driver.email}',
            rg = '${driver.rg}',
            cpf = '${driver.cpf}',
            cnh = '${driver.cnh}',
            telefone = '${driver.telefone}',
            data_nascimento = '${driver.data_nascimento}',
            inicio_carreira = '${driver.inicio_carreira}',
            senha = md5('${driver.senha}'),
            foto = '${driver.foto}',
            avaliacao = '${driver.avaliacao}',
            descricao = '${driver.descricao}',
            status_motorista = ${driver.status_motorista}
        WHERE id = ${driver.id};`

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

const deleteDriver = async (id) => {
    try {
        let sql = `UPDATE tbl_motorista SET
            status_motorista = false
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

const selectAllDrivers = async () => {
    try {
        let sql = `SELECT * FROM tbl_motorista WHERE status_motorista = 1 ORDER BY id DESC;`

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

const selectDriverIdByCPF = async (cpf) => {
    try {
        let sql = `SELECT CAST(id AS DECIMAL) AS id FROM tbl_motorista WHERE cpf LIKE '${cpf}'`

        const id = await prisma.$queryRawUnsafe(sql)

        if (id.length > 0) {
            return id
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectDriverById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_motorista WHERE id = ${id};`

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

const loginDriver = async (driverLogin, driverPassword) => {
    try {
        let sql = `SELECT * FROM tbl_motorista WHERE email = '${driverLogin}' AND senha = md5('${driverPassword}');`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0) {
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const verifyDriver = async (driverEmail) => {
    try {
        let sql = `SELECT * FROM tbl_motorista WHERE email = '${driverEmail}';`

        const result = await prisma.$queryRawUnsafe(sql)

        if (result != null) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

module.exports = {
    insertDriver,
    updateDriver,
    deleteDriver,
    selectAllDrivers,
    selectDriverIdByCPF,
    selectDriverById,
    loginDriver,
    verifyDriver
}
