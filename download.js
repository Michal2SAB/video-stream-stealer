const https = require('https'); // or 'http' for http:// URLs
const fs = require('fs');
const {execSync} = require('child_process');

steal(); // run the whole program

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
};

async function steal() {
    var start = 0; // the first video segment number (sometimes it's 1)
    var end = 10; // the last video segment number (capture end of video with fiddler)
    var outputName = 'mp4video'; // the output name you want for your converted mp4 video
    var fixedName = outputName.replace(/ /g, "-");

    const path = "segments.txt"; // where all the info for ffmpeg will be stored.
    if (fs.existsSync(path)) fs.unlinkSync(path); // if segments.txt exists, delete it first.
    
    // colors to make the console prettier
    const color = {
        green: '\x1b[32m',
        cyan: '\x1b[36m',
        normal: '\x1b[37m',
        yellow: '\x1b[33m',
        red: '\x1b[31m'
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
    await sleep(1000);
    console.log(color.normal);
    console.log(`${color.green}>> Done!${color.normal} Downloaded ${color.yellow + nr + color.normal} .ts files. Now let's merge them all into one..`);
    console.log("");
    try {
        execSync("ffmpeg -f concat -i segments.txt -c copy tsvideo.ts -hide_banner -nostats -loglevel 0 -y");
        console.log(`${color.green}>> Done!${color.normal} Now let's convert final .ts file to .mp4 video..`);
        execSync(`ffmpeg -i tsvideo.ts -acodec copy -vcodec copy ${fixedName}.mp4 -hide_banner -nostats -loglevel 0 -y`);
        // If the conversion doesn't give wanted results or doesn't convert at all, you can replace the second command with 
        // "ffmpeg -i tsvideo.ts -qscale 0 ${fixedName}.mp4 -hide_banner -nostats -loglevel 0"
        // note that output fiel size will increase.
        console.log("");
        console.log(`${color.green}>> Success!${color.normal} Created brand new .mp4 video for you. Enjoy and thank${color.yellow} Michal2SAB${color.normal} lol`)
    } catch (err) {
        console.log(color.red + err + color.normal);
        console.log("");
    }
};
