const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createSuburbDriverGql = gql`
  mutation CreateSuburbDriver(
    $input: CreateSuburbDriverInput!
    $condition: ModelSuburbDriverConditionInput
  ) {
    createSuburbDriver(input: $input, condition: $condition) {
      id
      suburbID
      driverID
      suburb {
        id
        name
        postcode
        state
        drivers {
          nextToken
        }
      }
      driver {
        id
        routes {
          nextToken
        }
        available
        suburbs {
          nextToken
        }
      }
    }
  }
`
const createSuburbDriver = async (suburbID, driverID) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createSuburbDriverGql),
        variables: {
          input: {
            suburbID: suburbID,
            driverID: driverID
          }
        }
      }
    });
    console.log(graphqlData.data.data.createSuburbDriver);
  } catch (err) {
    console.log('error creating SuburbDriver: ', err);
  } 
}

module.exports = {
  createSuburbDriver
}