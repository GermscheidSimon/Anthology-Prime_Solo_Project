const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
/**
 *   Library Router -- ;; 
 *      > 'GET' all songs related to a specific user
 */

/**
 * GET All songs in Library for user (authenticate based on user session)
 */
router.get('/', (req, res) => {
    console.log(' GET /api/library/ requested');
    
    if (req.isAuthenticated()) {
        let poolQuery = `SELECT * FROM "songs" WHERE user_id = $1;`;

        pool.query(poolQuery, [req.user.id])
      // if request successful respond with SQL rows
        .then( ( response ) => { 
            console.log('request successful');
            console.log(`returned ${response.rowCount} rows of data`);
            
            
            res.send(response.rows) ;
        })
      // if query fails, send 500 status to client and log error
        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
      // if no user session was given or exists, respond with forbidden status
      console.log('forbidden request');
            res.sendStatus(403);
    }            
});


module.exports = router;
