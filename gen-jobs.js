const faker = require('faker');
faker.locale = "en_AU";
const { NIL: uuidNil } = require('uuid')
const { createJob} = require('./create-job');
const { listDepots } = require('./list-depots');
const { listSenders } = require('./list-senders');
const { createRoute } = require('./create-route');
const { getSender } = require('./get-sender');

// Generate one job for each sender
const genJobs = async() => {
  const senders = await listSenders();
  const depots = await listDepots();
  for (let n = 0; n < senders.length; n++) {
    const stops = await getSender(senders[n].id)
    // Each job has 1 to 4 routes between origin and destination
    const itemValue = Math.ceil(Math.random() * 100)
    const freightCost = Math.ceil(Math.random() * 10)
    const insurance = Math.ceil(Math.random() * 20)
    const description = faker.commerce.product()
    const job = await createJob({
      senderID: senders[n].id,
      itemValue: itemValue,
      freightCost: freightCost,
      insurance: insurance,
      description: description
    })
    // Randomly select 0 to 3 depots
    const shuffled = depots.sort(() => 0.5 - Math.random());
    const nSelected = Math.floor(Math.random() * 4)
    const selected = shuffled.slice(0, nSelected);
    const origin = stops[0].id
    const destination = stops[1].id
    // Add depots between origin and destination
    let allStops = []
    allStops.push(origin)
    selected.forEach(s => allStops.push(s.id))
    allStops.push(destination)
    for (let m = 0; m <= nSelected; m++) {
      createRoute({
        jobID: job.id,
        fromStopID: allStops[m],
        toStopID: allStops[m + 1],
        driverID: uuidNil,
        createdBy: uuidNil,
        updatedBy: uuidNil,
        segmentNo: m + 1,
      })      
    }
  }
}

genJobs();