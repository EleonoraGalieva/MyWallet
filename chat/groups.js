const fs = require('fs')

function addGroup(groupId) {
    const groups = loadGroups()
    let multicastAddress = ''
    let duplicateAddress
    const duplicateGroupId = groups.find((group) => group.groupId === groupId)
    if (duplicateGroupId) {
        console.log('This group id is already taken, please try another one.')
        return undefined
    }
    do {
        multicastAddress = createMulticastAddress()
        duplicateAddress = groups.find((group) => group.address === multicastAddress)
    } while (duplicateAddress)
    groups.push({
        address: multicastAddress,
        groupId
    })
    saveGroups(groups)
    return multicastAddress
}

function getAddressByGroupId(groupId) {
    const groups = loadGroups()
    const groupFound = groups.find((group) => group.groupId === groupId)
    if (groupFound) {
        return groupFound.address
    }
}

function removeGroup(address) {
    const groups = loadGroups()
    const groupsLeft = groups.filter((group) => group.address !== address)
    if (groups.length !== groupsLeft.length) {
        saveGroups(groupsLeft)
    } else {
        return 'Error: a group with such address does not exist.'
    }
}

function saveGroups(groups) {
    const dataJSON = JSON.stringify(groups)
    fs.writeFileSync('groups.json', dataJSON)
}

function loadGroups() {
    try {
        const dataBuffer = fs.readFileSync('groups.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

function getRandomAddrNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function createMulticastAddress() {
    const address = []

    address.push(233)
    address.push(getRandomAddrNum(252, 255))
    address.push(getRandomAddrNum(18, 255))
    address.push(getRandomAddrNum(0, 255))

    return address.join('.')
}

module.exports = {
    addGroup,
    getAddressByGroupId,
    removeGroup
}