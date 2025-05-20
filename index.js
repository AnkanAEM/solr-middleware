require('dotenv').config();
const express = require('express');
const searchRoutes = require('./routes/search');
const indexRoutes = require('./routes/addIndex');
const deleteRoutes = require('./routes/delete');
const logger = require('./logger');
require('./cron_jobs/indexingJob'); // Import the cron job to start it

logger.info('App started');  
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/get', searchRoutes);
app.use('/api/post', indexRoutes);
app.use('/api', deleteRoutes);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
