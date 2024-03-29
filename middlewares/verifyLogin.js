/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA VERIFICAÇÃO DO LOGIN DE 
USUÁRIO E MOTORISTA
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 15/03/2023
VERSÃO: 1.0
************************************************************************/

const { selectAllUsers } = require('../wwwroot/models/DAO/user.js')
const { selectAllDrivers } = require('../wwwroot/models/DAO/driver.js')

const verifyLogin = async (infos, message) => {
    let foundLogin
    if (message === "driver") {
        const allDrivers = await selectAllDrivers()
    
        infos.message.forEach(element => {
            allDrivers.forEach(driver => {
                if(driver.email == element.email && driver.senha == element.senha) {
                    foundLogin = driver
                }
            })
        })
    } else {
        const allUsers = await selectAllUsers()
    
        infos.message.forEach(element => {
            allUsers.forEach(user => {
                if(user.email == element.email && user.senha == element.senha) {
                    foundLogin = user
                }
            })
        })
    }

    return foundLogin
}

module.exports = {
    verifyLogin
}