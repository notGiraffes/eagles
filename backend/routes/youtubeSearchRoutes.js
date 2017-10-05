const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv').config({path: '../.env'})

router.post('/youtube', function(req, res) {
  // console.log('sending request with query string')
  console.log(req.body);
  axios({
    method: 'get', 
    url: 'https://www.googleapis.com/youtube/v3/search',
    params: { 
      maxResults: 10,
      q: req.body.query,
      part: 'snippet',
      key: 'AIzaSyCrcduTSfmMXWq9DSkXS0lQp8LaaiVZQeA'
    }
  })
  .then((response) => {
    console.log('response from youtube server', response.data);
    res.send(response.data);
  })
  .catch((err) => {
    console.log('Youtube API get request error', err);
  })
})


module.exports = router;