const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createSenderGql = gql`
  mutation CreateSender(
    $input: CreateSenderInput!
    $condition: ModelSenderConditionInput
  ) {
    createSender(input: $input, condition: $condition) {
      id
      stops {
        items {
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
        nextToken
      }
      jobs {
        items {
          id
          senderID
          itemValue
          freightCost
          insurance
          description
          stripeID
          status
        }
        nextToken
      }
    }
  }
`
const createSender = async (senderID) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createSenderGql),
        variables: {
          input: {
            id: senderID
          }
        }
      }
    });
    console.log(graphqlData.data.data.createSender);
  } catch (err) {
    console.log('error creating sender: ', err);
  } 
}

module.exports = {
  createSender
}
