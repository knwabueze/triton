const express = require('express');
const scrapeWiki = require('../lib/scrape-wiki');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.use((req, res, next) => {
    const fileUrl = path.resolve(__dirname, '..', 'data.json')
    fs.exists(fileUrl, exists => {
        if (!exists) {
            scrapeWiki('List of Intel codenames', '.wikitable')
                .then(data => {
                    const write$ = fs.createWriteStream(fileUrl, {
                        encoding: 'utf8'
                    });
                    write$.write(JSON.stringify(data));
                    write$.on('error', err => {
                        return next(new Error(err))
                    })
                    write$.end();
                    return next();
                })
        } else {
            return next();
        }
    })
})


router.get('/', (req, res) => {
    const fileUrl = path.resolve(__dirname, '..', 'data.json');
    const data$ = fs.createReadStream(fileUrl);
    const query = req.query;

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");

    data$.on('open', () => {
        console.log("BEGIN Streaming Intel Codename data with query:", query);
        data$.pipe(res);
    })

    data$.on('error', err => {
        console.error("END Streaming Intel Codename data with error:", err);
        res.end(err);
    })

    data$.on('close', () => {
        console.log("END Streaming Intel Codename data.");
    })
})

module.exports = router;