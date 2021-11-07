const https = require('https'); // or 'http' for http:// URLs
const fs = require('fs');

steal(); // run the whole program

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
};

async function steal() {
    var start = 0; // sometimes sites start with segment 1, sometimes 0, you have to capture the link with fiddler and see what the start number is
    var end = 71; // you can capture with fiddler what the last segment is while playing the last seconds of a video, you can visit the link yourself and see at what point it says "not found" on the site too.

    const path = "segments.txt"; // where all the info for ffmpeg will be stored.

    while(start <= end) {
        // if we downloaded all our segments, create segments.txt file and finish the program's job.
        if(start === end) {
            console.log("");
            console.log(`Done, downloaded ${nr} video segments.`);
            console.log("");
            console.log('Creating segments.txt in collection folder..')
            var newstart = 1;
            if (fs.existsSync(path)) fs.unlinkSync(path); // if segments.txt exists, delete it first.
            while(newstart <= end) {
                var nr = newstart.toString();
                fs.appendFileSync(path, `file 'collection/${nr}.ts'\r\n`);
                newstart++;
            }
            console.log("");
            console.log("Done, now you can run convert.bat and create a mp4 file with it.")
        }
        await sleep(1000); // wait 1 second, to not lose connection
        try {
            var nr = start.toString();
            var url = `https://example.com/segments/720p-${nr}.ts-v1.ts`; // the link you captured with fiddler while playing your video. ${nr} is the number for next .ts fragment, so it'd be "720p-121.ts-v1.ts" for example.

            if(start != end) console.log(`Downloading: "${nr}.ts"`);
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
