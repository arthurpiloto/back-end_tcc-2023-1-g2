/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA MANIPULAÇÃO DE DADOS 
COM O BD (insert, update, delete e select)
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 01/03/2023
VERSÃO: 1.0
************************************************************************/
const { PrismaClient } = require(`@prisma/client`)
const prisma = new PrismaClient()

const insertVan = async (van) => {
    try {
        let sql = `INSERT INTO tbl_van (placa, foto, quantidade_vagas, id_modelo, id_motorista, status_van)
        VALUES ('${van.placa}', '${van.foto}', ${van.quantidade_vagas}, ${van.id_modelo}, ${van.id_motorista}, true);`

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

const updateVan = async (van) => {
    try {
        let sql = `UPDATE tbl_van SET 
            placa = '${van.placa}',
            foto = '${van.foto}',
            quantidade_vagas = ${van.quantidade_vagas},
            id_modelo = ${van.id_modelo},
            id_motorista = ${van.id_motorista},
            status_van = ${van.status_van}
            WHERE id = ${van.id}`



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

const deleteVan = async (id) => {
    try {
        let sql = `UPDATE tbl_van SET
            status_van = false
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

const selectAllVans = async () => {
    try {
        let sql = `SELECT * FROM tbl_van ORDER BY id DESC`

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

const selectVanById = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_van WHERE id = ${id};`

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

const selectVanByDriverId = async (id) => {
    try {
        let sql = `SELECT * FROM tbl_van WHERE id_motorista = ${id};`

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
    insertVan,
    updateVan, 
    deleteVan, 
    selectAllVans, 
    selectVanById,
    selectVanByDriverId
}
