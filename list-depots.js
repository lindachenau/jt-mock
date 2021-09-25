const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const listStopsGql = gql`
  query ListStops(
    $filter: ModelStopFilterInput
    $limit: Int
  ) {
    listStops(filter: $filter, limit: $limit) {
      items {
        id
      }
    }
  }
`
const listDepots = async () => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(listStopsGql),
        variables: {
          filter: {isDepot: {eq: true}},
          limit: 65536 // This should be the number of items in the table -> No pagination
        }
      }
    });
    const depots = graphqlData.data.data.listStops.items;
    console.log(depots);
    return depots
  } catch (err) {
    console.log('error listing depots: ', err);
  } 
}

module.exports = {
  listDepots
}

// listDepots()