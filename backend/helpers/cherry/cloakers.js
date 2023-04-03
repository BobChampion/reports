const { adspectAPI, cherryAPI } = require('./axiosFunctions');
const STREAMS_PER_PAGE = 100;

const getServers = async () => {
  const { data } = await cherryAPI.get('/projects/143289/servers?fields=ip,id,server');
  return data;
};

const getStreams = async (streams = [], page = 1) => {
  const { data } = await adspectAPI.get(`/streams?page=${page}&per-page=${STREAMS_PER_PAGE}`);
  streams.push(...data);
  if (data.length >= STREAMS_PER_PAGE) {
    return await getStreams(streams, page + 1);
  } else {
    return streams;
  }
};

module.exports = async () => {
  try {
    const [servers, streams] = await Promise.all([getServers(), getStreams()]);
    const cloakers = servers.map((cloaker) => ({
      server_id: cloaker.id,
      domain: cloaker.hostname || null,
      ip: cloaker.ip_addresses[0]?.address || null,
      status: cloaker.state || null,
      created: cloaker.created_at ? new Date(cloaker.created_at) : null,
    }));
    for (const cloaker of cloakers) {
      const matchingStream = streams.find(({ name }) =>
        name?.toLowerCase().split(' ').includes(cloaker.domain?.toLowerCase()),
      );
      cloaker.stream_id = matchingStream?.stream_id || null;
      cloaker.stream_mode = matchingStream?.mode || null;
      cloaker.platform = matchingStream?.name.split(' ')[0].toLowerCase() || null;
      cloaker.white_page = matchingStream?.safe_pages[0]?.page || null;
      cloaker.white_action = matchingStream?.safe_pages[0]?.action || null;
      cloaker.black_page = matchingStream?.money_pages[0]?.page || null;
      cloaker.black_action = matchingStream?.money_pages[0]?.action || null;
      cloaker.delayed_start = matchingStream?.skipClicks ?? null;
      cloaker.hyperloglog = matchingStream?.hll_threshold ?? null;
    }
    // require('fs').writeFileSync('./cloakers.json', JSON.stringify(cloakers, null, 2));
    return cloakers;
  } catch (error) {
    console.log(error);
  }
};
