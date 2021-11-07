@echo off
title Video Stream Stealer @Michal2SAB
node download.js
ffmpeg -f concat -i segments.txt -c copy tsvideo.ts
echo.
echo Attempting to convert final .ts file to .mp4 video..
echo.
ffmpeg -i tsvideo.ts -acodec copy -vcodec copy mp4video.mp4
echo.
echo Success! Created brand new .mp4 video for you. Enjoy and thank Michal2SAB lol
echo.
pause
