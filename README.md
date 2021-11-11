# Description
Download many .ts video stream files from a website, then create a single mp4 video file from them.

# Requirements
1. Node.js
2. ffmpeg.exe

# How to do this

1. Find the url for the .ts files. Fiddler is the best option imo, cause it's simple. Just capture traffic while you're watching the video.

2. Edit the download.js file to update the ```url``` var + update ```start``` and ```end``` vars. Read info next to them in code.

3. Run the program by double clicking run.bat. 

4. Once the program is finished and you received no errors, enjoy your brand new .mp4 video that you just stole from some website like a champ. Your video will be called "mp4video.mp4".

5. Also delete everything inside the collection folder and delete tsvideo.ts (unless you wanna keep them for some reason)

# Why even do this?

Uh.. because some sites don't allow you to download their videos. On some sites you might even need to pay for the feature. Some only allow downloading low quality too. Also many times you won't be able to capture the .m3u8 file. Plenty reasons.
