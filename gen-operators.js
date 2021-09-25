const faker = require('faker')
faker.locale = "en_AU"
const { createOperator} = require('./create-operator');
const { listDepots } = require('./list-depots')

// Generate one operator for each depot
const genOperators = async() => {
  const depots = await listDepots();
  for (let n = 0; n < depots.length; n++) {
    createOperator(depots[n].id)
  }
}

genOperators();