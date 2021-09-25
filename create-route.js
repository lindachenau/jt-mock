const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createRouteGql = gql`
  mutation CreateRoute(
    $input: CreateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    createRoute(input: $input, condition: $condition) {
      id
      jobID
      fromStopID
      from {
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
      toStopID
      to {
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
      driverID
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
      createdBy
      updatedBy
      segmentNo
      status
    }
  }
`
const createRoute = async (routeInfo) => {
  try {
    const { jobID, fromStopID, toStopID, driverID, createdBy, updatedBy, segmentNo } = routeInfo;
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createRouteGql),
        variables: {
          input: {
            jobID: jobID,
            fromStopID: fromStopID,
            toStopID: toStopID,
            driverID: driverID,
            createdBy: createdBy,
            updatedBy: updatedBy,
            segmentNo: segmentNo,
            status: 0
          }
        }
      }
    });
    console.log(graphqlData.data.data.createRoute);
  } catch (err) {
    console.log('error creating route: ', err);
  } 
}

module.exports = {
  createRoute
}
