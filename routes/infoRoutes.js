const express = require('express');
const router = express.Router();

// Endpoint for deployment validation and project information
router.get('/info', (req, res) => {
  res.json({
    application: "LibrarySite Final Release",
    version: "v1.0",
    contributor: "Simi",
    message: "Backend verification successful — final release is active",
    timestamp: new Date()
  });
});

module.exports = router;
