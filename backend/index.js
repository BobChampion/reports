const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8081;

// voluumn
let campaigns = [];
let errors = [];

//axios-functions //adspect
const { getStreams } = require('./helpers/adspect/axiosFunction');

//axios-functions //voluumn
const { voluumnAuth } = require('./helpers/voluumn/axiosFunctions');

//puppetter
const { doPuppetterTask, tests } = require('./helpers/voluumn/puppetterrFunctions');
const { getStreamsWithClick } = require('./helpers/adspect/puppetteer');

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  res.send(tests);
});

app.get('/api/campaigns', (req, res) => {
  voluumnAuth('campaigns').then((result) => {
    campaigns = result;
    res.send(campaigns);
  });
});

app.get('/api/errors', (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  voluumnAuth('errors', from, to).then((result) => {
    errors = result;
    res.send(errors);
  });
});

app.get('/api/tests', (req, res) => {
  res.send(tests);
});

app.delete('/api/tests', (req, res) => {
  tests.length = 0;
  res.send('Tests cleared');
});

app.post('/api/tests/:campaignName', (req, res) => {
  let { campaignName } = req.params;
  doPuppetterTask(campaignName, campaigns, res);
});

const automateCloakers = require('./helpers/cherry/cloakers');

let streamsResults = [];
app.get('/api/streams', async (req, res) => {
  streamsResults = [];
  const NUM_PAGES = 5; // number of pages to fetch
  (async () => {
    try {
      for (let i = 1; i <= NUM_PAGES; i++) {
        const data = await getStreams(i);
        streamsResults.push(...data);
      }
      res.send(streamsResults);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/api/cherrystreams', async (req, res) => {
  (async () => {
    try {
      const cloakers = await automateCloakers();
      const filteredStreams = streamsResults.filter((stream) => {
        return !cloakers.some((cherryStream) => stream.name.includes(cherryStream.domain));
      });
      res.send(filteredStreams);
    } catch (error) {
      console.log(error);
    }
  })();
});

app.get('/api/streamswithclick', (req, res) => {
  getStreamsWithClick(res);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
