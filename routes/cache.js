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

});

router.get('/:key', (req, res) => {


  const key = req.params.key
  const value = myCache.get(key);

  let status = '';
  let message = '';
  let string = '';

  // Case key doesn't exits
  if ( value == undefined ){

    // Create one
    const stringRandom = randomstring.generate(7);
    obj = { data: stringRandom };
    myCache.set(key, obj, 10000 );

    status = config.STATUS.CREATED;
    message = config.RES.CACHE_MISS
    string = stringRandom;

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