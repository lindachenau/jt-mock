const faker = require('faker')
faker.locale = "en_AU"
const { v4: uuidv4 } = require('uuid');
const { NIL: uuidNil } = require('uuid')
const { createSuburb} = require('./create-suburb');
const { createDriver } = require('./create-driver')
const { createSuburbDriver } = require('./create-suburb-driver')

// Generate nSuburbs suburbs
let suburbs= []
const genSuburbs = (nSuburbs) => {
  for (let n = 0; n < nSuburbs; n++) {
    const suburbID = uuidv4();
    let suburb = faker.address.city();
    let postcode = faker.address.zipCode();
    let state = faker.address.stateAbbr();

    createSuburb({
      id: suburbID,
      name: suburb,
      postcode: postcode,
      state: state
    });
    suburbs.push(suburbID)
  }
}

// Generate nDrivers drivers each services upto nSuburbs suburbs
const genDrivers = (nDrivers, nSuburbs) => {
  for (let n = 0; n < nDrivers; n++) {
    const driverID = uuidv4();
    createDriver(driverID);
    const shuffled = suburbs.sort(() => 0.5 - Math.random());
    const nSelected = Math.ceil(Math.random() * nSuburbs)
    const selected = shuffled.slice(0, nSelected);
    for (let m = 0; m < nSelected; m++) {
      createSuburbDriver(selected[m], driverID)
    }
  }
}

genSuburbs(50);
genDrivers(30, 5);
