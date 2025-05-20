const axios = require('axios');
const updateSolrIndexService = require('./updateSolrIndexService');
const deleteSolrDocService = require('./deleteSolrDocService');
const logger = require('../logger');
async function initQueryIndexService() {
    try {
        const currentlyIndexdeData = await findIndexedPagePaths();
        const currentlyIndexedPaths = currentlyIndexdeData.map(doc => doc.path);
        const sitemapData = await findSitemapPages();
        const sitemapPages = sitemapData.map(doc => doc.path);
        const itemsToBeDeleted = currentlyIndexedPaths.filter(path => !sitemapPages.includes(path));
        logger.info('itemsToBeDeleted', itemsToBeDeleted);
        if (itemsToBeDeleted.length > 0) {
            const deleteQuery = itemsToBeDeleted.map(path => `path:${path}`).join(' OR ');
            deleteSolrDocService.deleteDocumentsByQuery(deleteQuery);
        }   
        const itemsToBeAdded = sitemapData.filter(doc => !currentlyIndexedPaths.includes(doc.path) || currentlyIndexdeData.some(indexedDoc => indexedDoc.path === doc.path && indexedDoc.lastmod !== doc.lastmod));
        logger.info('itemsToBeAdded', itemsToBeAdded);
        updateSolrIndexService.updateSolrIndex(itemsToBeAdded);
    } catch (err) {
        logger.error('Failed to get indexed paths:', err.message);
    }
}

async function findIndexedPagePaths() {
    const query = {
        query: "*:*",
        filter: [],
        limit: 10,
        offset: 0,
        fields: ["path"]
    };

    const SOLR_BASE_URL = `${process.env.SOLR_HOST}/${process.env.SOLR_CORE}/query`;

    try {
        const response = await axios.post(SOLR_BASE_URL, query, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data.response.docs;
    } catch (err) {
        logger.error('Error querying Solr in findIndexedPagePaths():', err.message);
        throw err;
    }
}

async function findSitemapPages() {
    const sitemapUrl = process.env.SITEMAP_URL;
    try {
        const response = await axios.get(sitemapUrl);

        return response.data.data;
    } catch (err) {
        logger.error('Error querying Solr:', err.message);
        throw err;
    }
}

module.exports = {
    initQueryIndexService
};
