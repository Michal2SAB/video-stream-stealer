const https = require('https'); // or 'http' for http:// URLs
const fs = require('fs');

steal(); // run the whole program

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
};

async function steal() {
    var start = 0; // the first video segment number (sometimes it's 1)
    var end = 10; // the last video segment number (capture end of video with fiddler)

    const path = "segments.txt"; // where all the info for ffmpeg will be stored.
    if (fs.existsSync(path)) fs.unlinkSync(path); // if segments.txt exists, delete it first.
    
    // colors to make the console prettier
    const color = {
        green: '\x1b[32m',
        cyan: '\x1b[36m',
        normal: '\x1b[37m',
        yellow: '\x1b[33m'
    }

    while(start <= end) {
        await sleep(1000); // wait 1 second, to not lose connection
        try {
            var nr = start.toString();
            var url = `https://example.com/segments/720p-${nr}.ts-v1.ts`; // the link you captured with fiddler while playing your video. ${nr} is the number for next .ts fragment, so it'd be "720p-121.ts-v1.ts" for example.

            if(start != end) console.log(`${color.cyan}Downloading: ${color.yellow + nr}.ts`);
            const file = fs.createWriteStream('./collection/' + nr + '.ts');

            const response = https.get(url, function(response) {
            response.pipe(file);
            });
            response;
            fs.appendFileSync(path, `file 'collection/${nr}.ts'\r\n`);
            start++;
        } catch (err) {
            console.log(err);
        }
    }
    console.log(color.normal);
    console.log(`>>${color.green} Done!${color.normal} Downloaded ${color.yellow + nr + color.normal} .ts files. Now let's merge them all into one..`);
    console.log("");
};
};
