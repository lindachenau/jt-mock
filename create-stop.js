const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createStopGql = gql`
  mutation CreateStop(
    $input: CreateStopInput!
    $condition: ModelStopConditionInput
  ) {
    createStop(input: $input, condition: $condition) {
      id
      senderID
      personName
      address
      suburb
      postcode
      state
      isDepot
      originORdestination
      active
    }
  }
`
const createStop = async (stopInfo) => {
  try {
    const { senderID, personName, address, suburb, postcode, state, isDepot, originORdestination } = stopInfo;
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createStopGql),
        variables: {
          input: {
            senderID: senderID ? senderID : "",
            personName: personName ? personName : "",
            address: address,
            suburb: suburb,
            postcode: postcode,
            state: state,
            isDepot: isDepot,
            originORdestination: originORdestination,
            active: true
          }
        }
      }
    });
    console.log(graphqlData.data.data.createStop);
  } catch (err) {
    console.log('error creating stop: ', err);
  } 
}

module.exports = {
  createStop
}
