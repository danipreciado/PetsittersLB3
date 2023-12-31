// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const cors = require('cors'); 
//const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');


const app = module.exports = loopback();
app.use(cors());

app.start = function() {
  // start the web server


  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
    
  });
};

app.use(auth('secret'));

/* app.use(['/api/petsitters/list'], async (req, res, next) => {
  
  const queryToken = req.query.access_token;
  
  const accessToken = req.header("Authorization") || queryToken;
  if (!accessToken) {
    return res.status(401).json({ message: "User not authenticated" });
  }
 
 try {
  console.log(accessToken);
    const validToken = jwt.verify(accessToken, 'secret');

    console.log(jwt.verify(accessToken, 'secret'));
  
    req.user = validToken;
    if (validToken) {
      
      return next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  } 
})  */

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
