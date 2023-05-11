/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 03/03/2023
VERSÃO: 1.0
************************************************************************/
const prisma = require('../../libs/prisma.js')

const insertDriver = async (driver) => {
    try {
        let sql = `INSERT INTO tbl_motorista (nome, email, rg, cpf, cnh, telefone, data_nascimento, inicio_carreira, senha, foto, avaliacao, descricao, status_motorista, id_preco)
        values ('${driver.nome}', '${driver.email}', '${driver.rg}', '${driver.cpf}', '${driver.cnh}', '${driver.telefone}', '${driver.data_nascimento}', '${driver.inicio_carreira}', md5('${driver.senha}'), '${driver.foto}', ${driver.avaliacao}, '${driver.descricao}', true, ${driver.id_preco});`

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
            status_motorista = ${driver.status_motorista},
            id_preco = ${driver.id_preco}
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
        let sql = `CALL deletePerfilMotorista(${id});`

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
            return result
        } else {
            return false
        }
    } catch (err) {
        return false
    }
}

const selectDriversByFilters = async (driverName, price, school) => {
    try {
        let sqlWhere = ""

        if (driverName && price && school) {
            sqlWhere = `WHERE tbl_motorista.nome LIKE '%${driverName}%' AND tbl_preco.id = ${price} AND tbl_escola.id = ${school}`
        } else if (driverName && price) {
            sqlWhere = `WHERE tbl_motorista.nome LIKE '%${driverName}%' AND tbl_preco.id = ${price}`
        } else if (driverName && school) {
            sqlWhere = `WHERE tbl_motorista.nome LIKE '%${driverName}%' AND tbl_escola.id = ${school}`
        } else if (price && school) {
            sqlWhere = `WHERE tbl_preco.id = ${price} AND tbl_escola.id = ${school}`
        } else if (driverName) {
            sqlWhere = `WHERE tbl_motorista.nome LIKE '%${driverName}%'`
        } else if (price) {
            sqlWhere = `WHERE tbl_preco.id = ${price}`
        } else if (school) {
            sqlWhere = `WHERE tbl_escola.id = ${school}`
        }

        let sql = `SELECT tbl_motorista.id as id_motorista, tbl_motorista.email, tbl_motorista.nome, 
        tbl_motorista.rg, tbl_motorista.cpf, tbl_motorista.cnh, tbl_motorista.telefone, tbl_motorista.data_nascimento, tbl_motorista.senha, tbl_motorista.foto,
        tbl_motorista.avaliacao as avaliacao_motorista, tbl_motorista.descricao as descricao_motorista, tbl_motorista.inicio_carreira, tbl_motorista.status_motorista,
        tbl_preco.id as id_preco, tbl_preco.faixa_preco,
        tbl_escola.id as id_escola, tbl_escola.nome as nome_escola, tbl_escola.status_escola FROM tbl_escola_motorista
            INNER JOIN tbl_escola
                ON tbl_escola.id = tbl_escola_motorista.id_escola
            INNER JOIN tbl_motorista
                ON tbl_motorista.id = tbl_escola_motorista.id_motorista
            INNER JOIN tbl_preco
                ON tbl_preco.id = tbl_motorista.id_preco
        ${sqlWhere} ORDER BY tbl_escola_motorista.id DESC;`

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
    selectDriverById,
    loginDriver,
    verifyDriver,
    selectDriversByFilters
}
