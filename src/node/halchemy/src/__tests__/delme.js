const halchemy = require('halchemy')
const readline = require('readline/promises')

async function prompt(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const answer = await rl.question(message)
    rl.close()
    return answer
}

async function displayOrders() {
    const api = new halchemy.Api('http://localhost:2112')
    const root = await api.root.get()
    let page = 1

    while (true) {
        const orders = await api.follow(root).to('orders').withParameters({ max_results: 10, page }).get()
        for (const order of orders.collection('_items')) {
            console.log(`${order['orderId']} - ${order['orderDate']}`)
        }

        let prompt_message = '[N]ext page'
        if (page > 1) {
            prompt_message += ', [P]revious page'
        }
        const choice = (await prompt(prompt_message + ': ')).toUpperCase()

        if (choice === 'N' || choice === 'P') {
            page += choice === 'N' ? 1 : -1
        } else {
            break
        }
    }
}
displayOrders()


// from halchemy import Api
//
// api = Api('http://localhost:2112')
//
// root = api.root.get()
// page = 1
//
// while True:
//     customers = api.follow(root).to('customers').with_parameters({'max_results':10,'page':page}).get()
//     for customer in customers.collection('_items'):
//         print(f'{customer["membershipId"]} - {customer["givenName"]} {customer["familyName"]}')
//
//     prompt = '[N]ext page'
//     if page > 1:
//         prompt += ', [P]revious page'
//     choice = input(prompt + ': ').upper()
//
//     if choice in ['N', 'P']:
//         page += 1 if choice == 'N' else -1
//     else:
//         break
