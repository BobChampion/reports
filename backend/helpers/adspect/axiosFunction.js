const axios = require('axios');
require('dotenv').config();

let getStreams = async (pageNumber) => {
  try {
    const response = await axios.get(
      `https://api.adspect.net/v1/streams?page=${pageNumber}&per-page=100`,
      {
        headers: {
          Authorization: `Basic ${process.env.API_KEY_FOR_ADSPECT}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getStreams,
};
