#!/usr/bin/env node

MongoWatch = require('mongo-watch');
new MongoWatch({
  format: 'pretty', 
  db: 'local',
  host: '127.0.0.1',
  port: 3001
}).watch()
