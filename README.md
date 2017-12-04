# CACHE API

Api to manage the cache

## Use

1. Clone or download the project
2. Run your MongoDB
3. inside the project make: 
```sh
$ npm install
$ npm start
```
## Routes

### Create new key in database
```POST http://localhost:3000/api/cache/{$key}```

```$key```: name of the key to be created in database, its string will be create randomly in the backend.

### Get all keys of cache
```GET http://localhost:3000/api/cache```

Return list of keys in cache

### Get data of specific key in cache
```GET http://localhost:3000/api/cache/{$key}```

Return string of key in cache only in case it exits in database, if exits in database and doesn't exits in cache then update it in cache.

### Delete all keys in cache
```DELETE http://localhost:3000/api/cache```

Delete all data in cache

### Delete specific key in cache
```DELETE http://localhost:3000/api/cache/{$key}```

Delete Specific key in cache

## Observations:

- For this example the cache has a size of 5 keys to save, after it is overcome, the new data will replace to the oldest data in cache.
- Te TTL is of 1 hour.