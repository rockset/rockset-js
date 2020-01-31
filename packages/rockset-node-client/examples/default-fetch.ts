import rocksetConfigure from 'rockset';

const host = 'https://api.rs2.usw2.rockset.com';
const apikey = '...';
const rockset = rocksetConfigure(apikey, host);

// All of these examples are strongly typed

// Create a collection
rockset.collections
  .createCollection('commons', {
    name: 'collection'
  })
  .then(console.log)
  .catch(console.error);

// Execute a query helper
const executeQuery = async (query: string) =>
  rockset.queries.query({
    sql: {
      query
    }
  });

executeQuery('Select count(*) from _events;');

// Create a saved query
rockset.queries
  .createSavedQuery('commons', {
    name: 'myQuery',
    query_sql: 'SELECT :param as echo',
    parameters: [{
      name: 'param',
      type: 'string',
      default_value: 'Hello world!'
    }]
  })
  .then(console.log)
  .catch(console.error);

// Run a saved query with default parameters (or no parameters)
rockset.queries
  .runSavedQuery(/* workspace */ 'commons', /* queryName */ 'myQuery', /* version */ 1)
  .then(console.log)
  .catch(console.error);

// Run a saved query with custom parameters
rockset.queries
  .runSavedQuery('commons', 'myQuery', 1, {
    parameters: [{
      name: 'param',
      value: 'All work and no play makes Jack a dull boy',
    }]
  })
  .then(console.log)
  .catch(console.error);

// Delete a collection
rockset.collections
  .deleteCollection('commons', 'collection')
  .then(console.log)
  .catch(console.error);
