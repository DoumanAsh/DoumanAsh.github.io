const http = require('https');
const fs = require('fs');
const path = require('path');

const options = {
    host: 'api.imgur.com',
    port: 443,
    path: '/3/album/U6D9Y',
    headers: {
        Authorization: 'Client-ID 6bec47b5dfd412d'
    }
};

const DELAY = 60000; //1minute

function generate_data() {
    http.get(options, function(response) {
        let data = '';

        if (response.statusCode !== 200) {
            console.error("Cannot access imgur album. Status code %d", response.statusCode);
            console.log("retry in %s seconds...", DELAY / 1000);
            setTimeout(generate_data, DELAY);
            return;
        }

        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const result_file = path.join(__dirname, '..', 'waifu.json');
            const json_data = JSON.parse(data);
            fs.writeFile(result_file, JSON.stringify(json_data, null, 4), 'utf-8', () => {
                console.log("Waifu data is prepared");
            });
        });

    }).on("error", function(e){
        console.error("Got error: " + e.message);
        console.log("retry in %s seconds...", DELAY / 1000);
        setTimeout(generate_data, DELAY);
    });
}

generate_data();
