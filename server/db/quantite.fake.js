const faker = require('faker')

function generateQuantite(){
    const quantite = {
        type: faker.random.arrayElement(['g', 'cas', 'cac']),
        quantity: faker.random.number({ min: 1, max: 50}),

    }
return quantite
}
module.exports = generateQuantite