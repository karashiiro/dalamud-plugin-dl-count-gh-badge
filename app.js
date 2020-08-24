'use strict';

const bent = require("bent");
const express = require("express");

const app = express();

const getDownloadCounts = bent("https://raw.githubusercontent.com/goatcorp/DalamudPlugins/master/downloadcounts.json", "json");
const logo = "https://raw.githubusercontent.com/karashiiro/dalamud-plugin-dl-count-gh-badge/master/logo.svg";

// Routes
app.get('/:PluginName', async (req, res) => {
  const downloadCounts = await getDownloadCounts();

  let count = 0;
  if (downloadCounts[req.params.PluginName]) {
    count = downloadCounts[req.params.PluginName].count;
  }
  
  const format = {
    schemaVersion: 1,
    label: "Downloads",
    message: `${count}`,
    color: "green",
    logo,
  };

  
  res.send(format);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
