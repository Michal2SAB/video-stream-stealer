ffmpeg -f concat -i segments.txt -c copy tsvideo.ts

ffmpeg -i tsvideo.ts -acodec copy -vcodec copy mp4video.mp4
