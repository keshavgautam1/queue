const redisClient = require("../utils/redisClient");

exports.enqueueRequest = async (userId, request) => {
  await redisClient.rPush(`queue:${userId}`, JSON.stringify(request));
  console.log("Request added to queue:", request);
};

exports.dequeueRequest = async (userId) => {
  const request = await redisClient.lPop(`queue:${userId}`);
  console.log("Request:", request);
  return request ? JSON.parse(request) : null;
};

exports.getQueueLength = async (userId) => {
  return await redisClient.lLen(`queue:${userId}`);
};
