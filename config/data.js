var config = new Object();

config.RES = {
  CACHE_HIT: 'Cache hit',
  CACHE_MISS: 'Cache miss',
  NOT_FOUND: 'Key not found in cache or database'
};

config.STATUS = {
  CREATED: 201,
  OK: 200,
  SERVER_ERROR: 500
};

module.exports = config;