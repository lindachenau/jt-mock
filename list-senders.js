const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const listSendersGql = gql`
  query ListSenders(
    $limit: Int
  ) {
    listSenders(limit: $limit) {
      items {
        id
        stops {
          nextToken
        }
        jobs {
          nextToken
        }
      }
      nextToken
    }
  }
`
const listSenders = async () => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(listSendersGql),
        variables: {
          limit: 65536 // This should be the number of items in the table -> No pagination
        }
      }
    });
    const senders = graphqlData.data.data.listSenders.items;
    console.log(senders);
    return senders
  } catch (err) {
    console.log('error listing senders: ', err);
  } 
}

module.exports = {
  listSenders
}

// listSenders()