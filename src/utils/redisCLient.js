const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

client.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  try {
    await client.connect();
    console.log("Redis server is live and connected successfully.");
  } catch (err) {
    console.error("An error occurred:", err);
  }
})();

module.exports = client;
