#!/bin/sh

######
#
#  Combine audio & video files with FFmpeg
#
######

video='.mp4'
audio='.m4a'

ffmpeg='/usr/local/bin/ffmpeg'

prefix='combine.'

for i in `ls *$video`; do
  v=$i
  a=${i%$video}$audio
  cmd=`echo $ffmpeg -i "$v" -i "$a" -c copy "$prefix$v"`
  eval $cmd
done
