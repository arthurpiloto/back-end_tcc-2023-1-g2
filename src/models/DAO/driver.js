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
        values ('${driver.nome}', '${driver.email}', '${driver.rg}', '${driver.cpf}', '${driver.cnh}', '${driver.telefone}', '${driver.data_nascimento}', '${driver.inicio_carreira}', '${driver.senha}', '${driver.foto}', ${driver.avaliacao}, '${driver.descricao}', ${driver.status_motorista});`

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
            senha = '${driver.senha}',
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
        let sql = `SELECT tbl_motorista.id as id_motorista, tbl_motorista.nome, tbl_motorista.email, tbl_motorista.rg, tbl_motorista.cpf, tbl_motorista.cnh, tbl_motorista.telefone, 
        tbl_motorista.data_nascimento, tbl_motorista.inicio_carreira, tbl_motorista.senha, tbl_motorista.foto as foto_motorista, tbl_motorista.avaliacao, tbl_motorista.descricao, tbl_motorista.status_motorista, 
        tbl_van.id as id_van, tbl_van.placa, tbl_van.foto as foto_van, tbl_van.quantidade_vagas, tbl_van.status_van,
        tbl_modelo.id as id_modelo, tbl_modelo.modelo as modelo_van, tbl_modelo.status_modelo
            FROM tbl_van
            
                INNER JOIN tbl_motorista
                    ON tbl_motorista.id = tbl_van.id_motorista
                INNER JOIN tbl_modelo
                    ON tbl_modelo.id = tbl_van.id_modelo
            ORDER BY tbl_motorista.id DESC;`

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
        let sql = `SELECT tbl_motorista.id as id_motorista, tbl_motorista.nome, tbl_motorista.email, tbl_motorista.rg, tbl_motorista.cpf, tbl_motorista.cnh, tbl_motorista.telefone, 
        tbl_motorista.data_nascimento, tbl_motorista.inicio_carreira, tbl_motorista.senha, tbl_motorista.foto as foto_motorista, tbl_motorista.avaliacao, tbl_motorista.descricao, tbl_motorista.status_motorista,
        tbl_van.id as id_van, tbl_van.placa, tbl_van.foto as foto_van, tbl_van.quantidade_vagas, tbl_van.status_van,
        tbl_modelo.id as id_modelo, tbl_modelo.modelo as modelo_van, tbl_modelo.status_modelo
            FROM tbl_van
            
                INNER JOIN tbl_motorista
                    ON tbl_motorista.id = tbl_van.id_motorista
                INNER JOIN tbl_modelo
                    ON tbl_modelo.id = tbl_van.id_modelo
            WHERE tbl_motorista.id = ${id};`

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

module.exports = {
    insertDriver,
    updateDriver,
    deleteDriver,
    selectAllDrivers,
    selectDriverIdByCPF,
    selectDriverById
}
