const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const fileUpload = require('express-fileupload')

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
        let poolQuery = `SELECT "id", "name", "artist", "album"  FROM "songs" WHERE user_id = $1;`;

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

/**
 * POST new track(s)
 *  > use express-fileupload mv() included method to move the files into a local directory
 *  > add the record for the song with the path informaiton to the SQL table. 
 */
router.post('/:artist/:album/:name', fileUpload({ safeFileNames: true }), async (req, res) => {
    console.log('POST /api/song track file uploaded');
    if(req.isAuthenticated()) {
        console.log(req.files);
        console.log(req.params);

    let filetype;
    // site will only accept two kinds of file types. MP3 and FLAC files. The mv function requires the file name anyway,
    // declaring the file extension that will be appended to the file name. 
    if (req.files.file.mimetype === 'audio/mpeg') {
        filetype = 'mp3'
    } else if (req.files.file.mimetype === 'audio/flac') {
        filetype = 'flac'
    } else {
        console.log(filetype);
        res.sendStatus(500)
    }
    let filename = `${req.files.file.name}.${filetype}`
    let songDir = `server/FS_songs/${filename}` // this directory should be absolute if this app was to be deployed anywhere else. 

    let queryText = `INSERT INTO "songs" ("name", "album", "artist", "user_id", "songDir" )
                            VALUES($1, $2, $3, $4, $5)`

    let queryInputs = [
        req.params.name,
        req.params.album,
        req.params.artist,
        req.user.id,
        `/${filename}`
    ]
    const connection = await pool.connect();
    // creating async transaction incase the mv failes, or the upload doesn't work. This should avoid creating a SQL record on error
    try {
            await connection.query("BEGIN")
            await req.files.file.mv(songDir);
            await connection.query(queryText, queryInputs)
            await connection.query('COMMIT')
            res.sendStatus(201)
        } catch (error) {
            await connection.query('ROLLBACK')
            console.log(error);
            res.sendStatus(500)
        } finally {
            connection.release()
        }
    } else {
        res.sendStatus(403);
    }
})
router.post('/createSong', (req, res) => {
    res.sendStatus(500)
})

module.exports = router;
