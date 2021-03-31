const PORT_CHAT = 20000
const PORT_ACCESS = 20001
let MULTICAST_ADDR = undefined
const ALLOW = 'ALLOW'
const DENY = 'DENY'
const REQ = 'REQUEST'
const RES = 'RESPONSE'
let username = ''
let isAdmin = false

const dgram = require('dgram')
const process = require('process')
const readline = require('readline')
const groups = require('./groups.js')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const socketChat = dgram.createSocket({ type: 'udp4', reuseAddr: true })
const socketAccess = dgram.createSocket({ type: 'udp4', reuseAddr: true })

rl.question('Press \'1\' if you want to create chat. Press \'2\' if you want to join chat:  ', (answer) => {
    if (answer === '1') {
        createChat()
    } else if (answer === '2') {
        joinChat()
    } else {
        console.log('Wrong input.')
    }
})

function joinChat() {
    rl.question('What is your name? ', (answer) => {
        username = answer
        rl.question('Please enter the chat id:  ', (answer) => {
            MULTICAST_ADDR = groups.getAddressByGroupId(answer)
            if (MULTICAST_ADDR) {
                socketChat.bind(PORT_CHAT)
                socketAccess.bind(PORT_ACCESS)
                sendAllowanceReq(process.pid, username, answer)
            } else {
                console.log('No group with such id found.')
            }
        })
    })
}

function idInput() {
    rl.question('Please enter the chat id:  ', (answer) => {
        MULTICAST_ADDR = groups.addGroup(answer)
        if (MULTICAST_ADDR) {
            socketChat.bind(PORT_CHAT)
            socketAccess.bind(PORT_ACCESS)
        } else {
            idInput()
        }
    })
}

function createChat() {
    isAdmin = true
    rl.question('What is your name? ', (answer) => {
        username = answer
        if (isAdmin) {
            username += ' (Admin)'
            idInput()
        }
    })
}

socketAccess.on('listening', () => {
    socketAccess.addMembership(MULTICAST_ADDR)
})

socketChat.on('listening', () => {
    if (isAdmin) {
        socketChat.addMembership(MULTICAST_ADDR)
        console.log('New chat created!')
        send()
    }
})

//message to admin contains pid, groupId, type: request
//message from admin cont pid, response msg, type: response
socketAccess.on('message', (msg, rinfo) => {
    const message = JSON.parse(msg.toString())
    if (isAdmin && message.type === REQ) {
        rl.question(`Would you allow access for ${message.username}? Press 'y' or 'n'    `, (answer) => {
            if (answer === 'y') {
                sendAllowanceResp(message.pid, ALLOW)
            } else {
                sendAllowanceResp(message.pid, DENY)
            }
        })
    } else if (message.pid === process.pid) {
        if (message.response === ALLOW) {
            console.log('Welcome to chat!')
            socketAccess.close()
            socketChat.addMembership(MULTICAST_ADDR)
            send()
        } else if (message.response === DENY) {
            console.log('Access denied :(')
        }
    }
})

socketChat.on('message', (message, rinfo) => {
    const msg = JSON.parse(message.toString())
    if (msg.pid !== process.pid) {
        console.log(`${msg.username}: ${msg.message}`)
    }
})

function sendAllowanceResp(pid, response) {
    const res = Buffer.from(JSON.stringify({ pid, response, type: RES }))
    socketAccess.send(res, 0, res.length, PORT_ACCESS, MULTICAST_ADDR)
}

function sendAllowanceReq(pid, username, groupId) {
    const req = Buffer.from(JSON.stringify({ pid, groupId, username, type: REQ }))
    socketAccess.send(req, 0, req.length, PORT_ACCESS, MULTICAST_ADDR)
}

function sendMessage(msg) {
    const message = Buffer.from(JSON.stringify({ pid: process.pid, username, message: msg }))
    socketChat.send(message, 0, message.length, PORT_CHAT, MULTICAST_ADDR)
}

function send() {
    rl.on('line', (input) => {
        sendMessage(input)
    })
}

rl.on('SIGINT', () => {
    process.exit()
})

process.on('exit', (code) => {
    if (isAdmin) {
        groups.removeGroup(MULTICAST_ADDR)
    }
})