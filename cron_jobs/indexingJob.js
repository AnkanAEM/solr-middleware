const cron = require('node-cron');
const logger = require('../logger');
const { initQueryIndexService } = require('../services/queryIndexService');

cron.schedule('0 * * * *', async () => {
    console.log('running reindex task every hour');
    logger.info('running reindex task every hour');
    try {
        await initQueryIndexService();
        logger.info('✅ Indexes were updated successfully');
    } catch (err) {
        logger.error('❌ Error during scheduled index update:', err.message);
    }
});