const sqlite3 = require("sqlite3").verbose();
const Promise = require("bluebird");

let cached = global.sqlite;
if (!cached) cached = global.sqlite = {};

export function connectToDatabase() {
  if (cached.db) return cached.db;
  cached.db = new sqlite3.Database(":memory:");
  cached.db.get = Promise.promisify(cached.db.get, { multiArgs: true });
  cached.db.run = Promise.promisify(cached.db.run, { multiArgs: true });
  return cached.db;
}
