const https = require('https'); // or 'http' for http:// URLs
const fs = require('fs');

steal(); // run the whole program

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
};

async function steal() {
    var start = 0; // the first video segment number (sometimes it's 1)
    var end = 10; // the last video segment number (capture end of video with fiddler)
    var newstart = 0; // same as start

    const path = "segments.txt"; // where all the info for ffmpeg will be stored.
    
    // colors to make the console prettier
    const color = {
        green: '\x1b[32m',
        cyan: '\x1b[36m',
        normal: '\x1b[37m',
        yellow: '\x1b[33m'
    }

    while(start <= end) {
        // if we downloaded all our segments, create segments.txt file and finish the program's job.
        if(start === end) {
            console.log("");
            console.log(`${color.normal}>> ${color.green}Done! ${color.normal}Downloaded ${end} video segments.`);
            console.log("");
            console.log(`>> ${color.cyan}Creating segments.txt in collection folder..`)
            
            if (fs.existsSync(path)) fs.unlinkSync(path); // if segments.txt exists, delete it first.
            while(newstart <= end) {
                var nr = newstart.toString();
                fs.appendFileSync(path, `file 'collection/${nr}.ts'\r\n`);
                newstart++;
            }
            console.log("");
            console.log(`${color.normal}>> ${color.green}Success! ${color.normal}Now it's time to merge all .ts files into one..`)
            console.log("");
        }
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
            start++;
        } catch (err) {
            console.log(err);
        }
    }
};
