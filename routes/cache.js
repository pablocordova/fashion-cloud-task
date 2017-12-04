// External modules
const express = require('express');
const NodeCache = require( "node-cache" );
const randomstring = require("randomstring");
const router = express.Router();

const config = require('../config/data');
const Data = require('../models/data');

const myCache = new NodeCache();

router.post('/', async (req, res) => {

  const data = await Data.findOne({ key: req.body.key });

  // Case exit in database, the update it with new string randowm
  if (data) {
    data.data = randomstring.generate(7);
    data.save()
      .then((dataUpdated) => {
        return res.status(config.STATUS.OK).send({
          message: config.RES.UPDATED,
          result: dataUpdated
        });
      })
      .catch((error) => {
        return res.status(config.STATUS.SERVER_ERROR).send({
          message: config.RES.ERROR,
          result: error
        });
      });
  } else {
    // Else create one
    let newData = new Data;
    newData.key = req.body.key;
    newData.data = randomstring.generate(7);

    newData.save()
      .then((dataCreated) => {
        return res.status(config.STATUS.CREATED).send({
          message: config.RES.CREATED,
          result: dataCreated
        });
      })
      .catch((error) => {
        return res.status(config.STATUS.SERVER_ERROR).send({
          message: config.RES.ERROR,
          result: error
        });
      });
  }

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

  // Case key doesn't exits the key in cache
  if ( value == undefined ){

    // Make question if this key exists in MongoDB
    const data = await Data.findOne({ key: key });

    // If exits, then only create one in cache
    if (data) {
      const keyString = data.data;
      // update cache with this one
      obj = { data: keyString };
      myCache.set(key, obj, config.TTL );

      status = config.STATUS.CREATED;
      message = config.RES.CACHE_MISS
      string = keyString;
    } else {
      // Return data no exits in cache or database
      status = config.STATUS.OK;
      message = config.RES.NOT_FOUND
    }

  } else {
    // Also is necessary update new TTL case the key in cache is consumed
    myCache.ttl(key, config.TTL);
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

  myCache.flushAll();
  const info = myCache.getStats();

  return res.status(config.STATUS.OK).send({
    message: config.RES.DELETED_ALL_CACHE,
    info: info
  });

});

router.delete('/:key', (req, res) => {

  const key = req.params.key;

  const value = myCache.del(key);

  return res.status(config.STATUS.OK).send({
    message: config.RES.DELETED_KEY_CACHE,
    key: key,
    quantity: value
  });

});

module.exports = router;