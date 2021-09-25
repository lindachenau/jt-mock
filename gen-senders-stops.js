const faker = require('faker')
faker.locale = "en_AU"
const { v4: uuidv4 } = require('uuid');
const { NIL: uuidNil } = require('uuid')
const { createSender} = require('./create-sender');
const { createStop } = require('./create-stop')

// Generate nUsers users and 2 stops for each user
const genUsersStops = (nUsers) => {
  for (let n = 0; n < nUsers; n++) {
    const senderID = uuidv4();
    let name = faker.name.firstName() + ' ' + faker.name.lastName();
    let address = faker.address.streetAddress();
    let suburb = faker.address.city();
    let postcode = faker.address.zipCode();
    let state = faker.address.stateAbbr();

    createSender(senderID);
    createStop(
      {
        senderID: senderID,
        personName: name,
        address: address,
        suburb: suburb,
        postcode: postcode,
        state: state,
        isDepot: false,
        originORdestination: 0
      }
    );
    name = faker.name.firstName() + ' ' + faker.name.lastName();
    address = faker.address.streetAddress();
    suburb = faker.address.city();
    postcode = faker.address.zipCode();
    state = faker.address.stateAbbr();
    createStop(
      {
        senderID: senderID,
        personName: name,
        address: address,
        suburb: suburb,
        postcode: postcode,
        state: state,
        isDepot: false,
        originORdestination: 1
      }
    );
  }
}

const genDepots = (nDepots) => {
  for (let n = 0; n < nDepots; n++) {
    let address = faker.address.streetAddress();
    let suburb = faker.address.city();
    let postcode = faker.address.zipCode();
    let state = faker.address.stateAbbr();
    createStop(
      {
        senderID: uuidNil,
        address: address,
        suburb: suburb,
        postcode: postcode,
        state: state,
        isDepot: true,
        originORdestination: 0
      }
    );
  }
}

genUsersStops(50);
genDepots(10);
