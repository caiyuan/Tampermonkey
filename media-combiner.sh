#!/bin/sh

# 合并音频和视频文件

video='.mp4'
audio='.m4a'

ffmpeg='/usr/local/bin/ffmpeg'

prefix='X.'

for v in *$video; do
  a="${v%$video}$audio"
  output="$prefix$v"
  $ffmpeg -i "$v" -i "$a" -c copy "$output"
done
