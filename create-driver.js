const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createDriverGql = gql`
  mutation CreateDriver(
    $input: CreateDriverInput!
    $condition: ModelDriverConditionInput
  ) {
    createDriver(input: $input, condition: $condition) {
      id
      routes {
        items {
          id
          jobID
          fromStopID
          toStopID
          driverID
          createdBy
          updatedBy
          segmentNo
          status
        }
        nextToken
      }
      available
      suburbs {
        items {
          id
          suburbID
          driverID
        }
        nextToken
      }
    }
  }
`
const createDriver = async (driverID) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createDriverGql),
        variables: {
          input: {
            id: driverID,
            available: true
          }
        }
      }
    });
    console.log(graphqlData.data.data.createDriver);
  } catch (err) {
    console.log('error creating driver: ', err);
  } 
}

module.exports = {
  createDriver
}