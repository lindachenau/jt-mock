const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createOperatorGql = gql`
  mutation CreateOperator(
    $input: CreateOperatorInput!
    $condition: ModelOperatorConditionInput
  ) {
    createOperator(input: $input, condition: $condition) {
      id
      depotID
      incomingRoutes {
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
      outgoingRoutes {
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
    }
  }
`
const createOperator = async (depotID) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createOperatorGql),
        variables: {
          input: {
            depotID: depotID
          }
        }
      }
    });
    console.log(graphqlData.data.data.createOperator);
  } catch (err) {
    console.log('error creating operator: ', err);
  } 
}

module.exports = {
  createOperator
}