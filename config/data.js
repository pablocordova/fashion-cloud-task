var config = new Object();

config.RES = {
  CACHE_HIT: 'Cache hit',
  CACHE_MISS: 'Cache miss',
  CREATED: 'New string for key created',
  DELETED_ALL_CACHE: 'All keys deleted',
  DELETED_KEY_CACHE: 'Key deleted from cache',
  NOT_FOUND: 'Key not found in cache or database',
  UPDATED: 'key data updated with new random string'
};

config.STATUS = {
  CREATED: 201,
  OK: 200,
  SERVER_ERROR: 500
};

// time expired 1 hour
config.TTL = 3600;

module.exports = config;