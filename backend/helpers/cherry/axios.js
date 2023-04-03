const axios = require('axios');
require('dotenv').config();
const { encodeKey } = require('./functions');

exports.cherryAPI = axios.create({
  baseURL: 'https://api.cherryservers.com/v1',
  headers: { Authorization: `Bearer ${process.env.CHERRY_API_KEY}` },
});

exports.adspectAPI = axios.create({
  baseURL: 'https://api.adspect.net/v1',
  headers: { Authorization: `Basic ${encodeKey(process.env.ADSPECT_API_KEY)}` },
});
