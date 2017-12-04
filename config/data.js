var config = new Object();

config.RES = {
  CACHE_HIT: 'Cache hit',
  CACHE_MISS: 'Cache miss',
  CREATED: 'New string for key created',
  DELETED_KEY_CACHE: 'Key deleted from cache',
  NOT_FOUND: 'Key not found in cache or database',
  UPDATED: 'key data updated with new random string'
};

config.STATUS = {
  CREATED: 201,
  OK: 200,
  SERVER_ERROR: 500
};

module.exports = config;