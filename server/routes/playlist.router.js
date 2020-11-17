const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
    
   if (req.isAuthenticated) {
        const queryText = `
            SELECT * FROM "songs_playlists"
                JOIN "songs" on "songs_playlists"."songs_id" = "songs"."id"
                JOIN "playlists" on "songs_playlists"."playlists_id" = "playlists"."id"
                WHERE "playlists_id" = $1;
        `

        pool.query(queryText, [req.params.id])

        .then( ( response ) => {
            console.log('request successful');
            console.log(`returned ${response.rows}`);
            res.send(response.rows)
        })

        .catch( ( error ) => {
            console.log(error);
            res.sendStatus(500)
        });
        
   } else {
       res.sendStatus(403)
   }
});


module.exports = router;
