const express = require("express");
const {
  addRequestToQueue,
  processNextRequest,
  getQueueSize,
} = require("../controllers/queueController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/enqueue", protect, addRequestToQueue);
router.get("/process", protect, processNextRequest);
router.get("/size", protect, getQueueSize);

module.exports = router;
