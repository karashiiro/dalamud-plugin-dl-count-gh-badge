'use strict';

const bent = require("bent");
const express = require("express");

const app = express();

const getDownloadCounts = bent("https://raw.githubusercontent.com/goatcorp/DalamudPlugins/api5/downloadcounts.json", "json");

// Routes
app.get('/:pluginName', async (req, res) => {
  const downloadCounts = await getDownloadCounts();

  let count = 0;
  if (downloadCounts[req.params.pluginName]) {
    count = parseInt(downloadCounts[req.params.pluginName]);
  }
  
  const format = {
    schemaVersion: 1,
    label: "downloads",
    message: `${count.toLocaleString("en")}`,
    color: "brightgreen",
    cacheSeconds: 3600,
  };

  res.send(format);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Serverless Error");
});

module.exports = app;
