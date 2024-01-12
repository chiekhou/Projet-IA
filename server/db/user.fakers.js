const faker = require('faker')

function generateUser(){
    const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password : faker.internet.password()

    }
return user
}
module.exports = generateUser