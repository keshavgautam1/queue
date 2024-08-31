const {
  enqueueRequest,
  dequeueRequest,
  getQueueLength,
} = require("../services/queueService");

exports.addRequestToQueue = async (req, res) => {
  try {
    await enqueueRequest(req.user._id, req.body);
    res.status(200).json({ success: true, message: "Request added to queue" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.processNextRequest = async (req, res) => {
  try {
    const request = await dequeueRequest(req.user._id);
    if (request) {
      // Process the request here
      res.status(200).json({ success: true, request });
    } else {
      res.status(200).json({ success: true, message: "No requests in queue" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getQueueSize = async (req, res) => {
  try {
    const length = await getQueueLength(req.user._id);
    res.status(200).json({ success: true, length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
