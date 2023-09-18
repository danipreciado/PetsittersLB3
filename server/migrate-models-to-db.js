const server = require('./server'); 
const ds = server.dataSources.Petsitter;

const models = ['pettype'];

ds.automigrate(models, function(err) {
    if (err) throw err;
    console.log('Models migrated successfully.');
    ds.disconnect();
});

