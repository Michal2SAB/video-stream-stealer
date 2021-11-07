# Description
Download many .ts video stream files from a website, then create a single mp4 video file from them.

# How to do this

1. Find the url for the .ts files. Fiddler is the best option imo, cause it's simple. Just capture traffic while you're watching the video.

2. Edit the download.js file to update the ```url``` var + update ```start```, ```end```, and ```newstart``` vars. Read info next to them in code.

3. Double click run.bat to run the program. 

4. Once the program is finished and you received no errors, double click on convert.bat to converts the segments into one mp4 file.

5. Delete everything inside the collection folder and delete tsvideo.ts (unless you wanna keep them for some reason) and enjoy your brand new mp4 video that you just stole from some website like a champ.

# Why even do this?

Uh.. because some sites don't allow you to download their videos. On some sites you might even need to pay for the feature. Some only allow downloading low quality too. Plenty reasons.
