const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const getSenderGql = gql`
  query GetSender($id: ID!) {
    getSender(id: $id) {
      stops {
        items {
          id
          originORdestination
        }
      }
    }
  }
`
const getSender = async (senderID) => {
  try {
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(getSenderGql),
        variables: {
          id: senderID
        }
      }
    });
    const sender = graphqlData.data.data.getSender.stops.items;
    console.log(sender);
    return sender
  } catch (err) {
    console.log('error getting sender: ', err);
  } 
}

module.exports = {
  getSender
}
