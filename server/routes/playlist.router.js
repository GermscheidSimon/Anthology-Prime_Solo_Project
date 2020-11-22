const { response } = require('express');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET all playlists
 */

router.get('/', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `
                SELECT * FROM "playlists"
                    WHERE "user_id" = $1`
        pool.query(queryText, [req.user.id])

        .then( (response) => {
            console.log('request successful');
            console.log(`returned ${response.rows}`);
            res.send(response.rows)
        })

        .catch( (error) => {
            console.log(error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(500)
    }
  });

/**
 *  GET playlist details by ID
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
            console.log(`returned ${response}`);

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

router.post('/', (req, res) => {
    if (req.isAuthenticated) {
       const queryText = `INSERT INTO "playlists" ("playlistName", "user_id") 
                                Values($1, $2);`

        pool.query(queryText, [req.body.playlistName, req.user.id])

        .then( ( response ) => {
            console.log(response);
            res.sendStatus(201);
        })

        .catch( (error) => {
            console.log(error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})
router.get('/name/:id', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `SELECT * FROM "playlists" WHERE "user_id" = $1 AND "id" = $2`

        console.log(req.params.id)
        pool.query(queryText, [req.user.id, req.params.id])

        .then( (response) => {
            console.log(response.rows[0]);
            res.send(response.rows[0])
        })

        .catch( (error) => {
            console.log(error);
        })
    }
})

module.exports = router;
