/************************************************************************
OBJETIVO: ARQUIVO RESPONSÁVEL PELA VERIFICAÇÃO DO LOGIN DE 
USUÁRIO
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 15/03/2023
VERSÃO: 1.0
************************************************************************/

const { selectAllUsers } = require('../src/models/DAO/user.js')

const verifyLogin = async (userInfos) => {
    const allUsers = await selectAllUsers()
    let foundUser
    
    allUsers.forEach(user => {
        if(user.email == userInfos.email && user.senha == userInfos.senha) {
            foundUser = user
        }
    })

    return foundUser
}

module.exports = {
    verifyLogin
}