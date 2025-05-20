const cron = require('node-cron');
const { updateSolrIndex } = require('../services/updateSolrIndexService');
const logger = require('../logger');

cron.schedule('0 * * * *', async () => {
    console.log('running reindex task every hour');
    logger.info('running reindex task every hour');
    try {
        const response = await updateSolrIndex();
        logger.info(response);
    } catch (err) {
        logger.error('❌ Error during scheduled index update:', err.message);
    }
});