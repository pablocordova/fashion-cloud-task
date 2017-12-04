// External modules
const express = require('express');
const NodeCache = require( "node-cache" );
const randomstring = require("randomstring");
const router = express.Router();

const config = require('../config/data');
const Data = require('../models/data');

const myCache = new NodeCache();

router.post('/', (req, res) => {

});

router.get('/', (req, res) => {

  mykeys = myCache.keys();

  return res.status(config.STATUS.OK).send({
    keys: mykeys
  });

});

router.get('/:key', async (req, res) => {


  const key = req.params.key
  const value = myCache.get(key);

  let status = '';
  let message = '';
  let string = '';

  // Case key doesn't exits
  if ( value == undefined ){

    // Make question if this key exists in MongoDB
    const data = await Data.findOne({ key: key });

    // If exits, then only create one in cache
    if (data) {
      const keyString = data.data;
      // update cache with this one
      obj = { data: keyString };
      myCache.set(key, obj, 10000 );

      status = config.STATUS.CREATED;
      message = config.RES.CACHE_MISS
      string = keyString;
    } else {
      // Return data no exits in cache or database
      status = config.STATUS.OK;
      message = config.RES.NOT_FOUND
    }

  } else {

    status = config.STATUS.OK
    message = config.RES.CACHE_HIT
    string = value.data;

  }

  return res.status(status).send({
    message: message,
    key: key,
    string: string
  });

});

router.delete('/', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;