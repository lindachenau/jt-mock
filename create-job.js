const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const createJobGql = gql`
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
      id
      senderID
      itemValue
      freightCost
      insurance
      description
      stripeID
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
      status
      photos {
        items {
          id
          jobID
          url
          type
        }
        nextToken
      }
    }
  }
`
const createJob = async (jobInfo) => {
  try {
    const { senderID, itemValue, freightCost, insurance, description} = jobInfo;
    const graphqlData = await axios({
      url: process.env.API_URL,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_KEY
      },
      data: {
        query: print(createJobGql),
        variables: {
          input: {
            senderID: senderID,
            itemValue: itemValue,
            freightCost: freightCost,
            insurance: insurance,
            description: description,
            stripeID: "",
            status: 0
          }
        }
      }
    });
    const job = graphqlData.data.data.createJob;
    console.log(job);
    return job
  } catch (err) {
    console.log('error creating job: ', err);
  } 
}

module.exports = {
  createJob
}
