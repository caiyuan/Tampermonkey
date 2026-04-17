#!/bin/sh

# 合并音频和视频文件

VIDEO_EXT='.mp4'
AUDIO_EXT='.m4a'
FFMPEG_BIN='/usr/local/bin/ffmpeg'

for video_src in *"$VIDEO_EXT"; do
  "$FFMPEG_BIN" \
    -i "$video_src" \
    -i "${video_src%$VIDEO_EXT}$AUDIO_EXT" \
    -c copy "muxed_$video_src"
done
