const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET song by id
 */
router.get('/:id', (req, res) => {
   
        console.log(' GET /api/song/:id requested', req.params.id);
        
        if (req.isAuthenticated()) {

            let poolQuery = `SELECT * FROM "songs" WHERE user_id = $1 AND "id" = $2;`;
            let requestPrameters = [req.user.id, req.params.id]
            pool.query(poolQuery, requestPrameters)
          // if request successful respond with SQL row
            .then( ( response ) => { 
                console.log('request successful');
                console.log(`returned ${response.rows}`);
                
                res.send(response.rows); 
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

/**
 * GET All songs in Library for user (authenticate based on user session)
 */
router.get('/', (req, res) => {
    console.log(' GET /api/song/ requested');
    
    if (req.isAuthenticated()) {
        let poolQuery = `SELECT "id", "name", "artist", "album", "length" FROM "songs" WHERE user_id = $1;`;

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
