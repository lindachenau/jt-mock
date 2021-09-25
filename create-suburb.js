const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createSuburbGql = gql`
  mutation CreateSuburb(
    $input: CreateSuburbInput!
    $condition: ModelSuburbConditionInput
  ) {
    createSuburb(input: $input, condition: $condition) {
      id
      name
      postcode
      state
      drivers {
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
const createSuburb = async (suburbInfo) => {
  try {
    const { suburbID, name, postcode, state } = suburbInfo
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createSuburbGql),
        variables: {
          input: {
            id: suburbID,
            name: name,
            postcode: postcode,
            state: state
          }
        }
      }
    });
    console.log(graphqlData.data.data.createSuburb);
  } catch (err) {
    console.log('error creating suburb: ', err);
  } 
}

module.exports = {
  createSuburb
}