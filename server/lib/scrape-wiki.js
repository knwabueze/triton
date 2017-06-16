const fetch = require('isomorphic-fetch')
const cheerio = require('cheerio')

function scrapeWiki(wikiPage, tableSelector) {
    return new Promise(resolve => {
        const newWikiPage = wikiPage.replace(/(\s){1}/gi, '_');

        fetch(`https://en.wikipedia.org/wiki/${newWikiPage}`)
            .then(response => response.text())
            .then(data => {
                resolve(traverseTable(data, tableSelector));
            })
            .catch(err => { throw err });
    })
}

function traverseTable(html, tableSelector) {
    const $ = cheerio.load(html);

    const $tableRows = $(`${tableSelector} tr`);

    let rowObject = {};
    let jsonData = [];

    $tableRows.each(function (idx, el) {
        if (idx === 0) {
            $tableRows.first().find('th').each(function (idx_2, el_2) {
                const key = $(this).text().replace(/([^a-zA-z1-9])/i, "_");
                rowObject[key] = "";
            })
            return;
        } else if (idx === $tableRows.length - 1) {
            return;
        } else {
            const keys = Object.keys(rowObject);
            const obj = Object.create(rowObject);
            $tableRows.slice(idx, idx + 1).find('td').each(function (idx_3, el_3) {
                if (idx_3 > keys.length - 1) {
                    console.log($(this).text());
                }
                const data = tryParseInt($(this).text());
                obj[keys[idx_3]] = data;
            })
            jsonData[idx] = obj;
            return;
        }
    })

    jsonData = jsonData.slice(1);

    return jsonData;
}

function tryParseInt(str) {
    let returnValue = String(str);
    if (str != null) {
        if (!isNaN(str)) {
            returnValue = parseInt(str, 10);
        }
    }
    return returnValue;
}

module.exports = scrapeWiki;