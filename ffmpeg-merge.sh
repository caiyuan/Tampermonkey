#!/bin/sh

######
#
#  借助工具 FFmpeg 合并音视频文件
#
######

video='.mp4'
audio='.m4a'

ffmpeg='./ffmpeg'

prefix='merge.'

for i in `ls *$video`; do
	v=$i
	a=${i%$video}$audio
	cmd=`echo $ffmpeg -i $v -i $a -c copy $prefix$v`
	eval $cmd
done
