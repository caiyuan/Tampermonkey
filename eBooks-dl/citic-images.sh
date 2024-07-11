#!/bin/bash

# 检查是否提供了文件名参数
if [ $# -ne 1 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

filename=$1

# 使用 awk 处理输入文件
awk '
{
    if ($0 ~ /^".*"/) {
        print last_title " # " $0
    } else {
        last_title = $0
    }
}
' "$filename"



# -----------------------------------------------------------------------------------
#
### 输入
#
# 零压力社交 - 唐文理 & 格雷戈里·福斯特
# "https://upload.yunpub.cn/ei/202406/85/e409cfa9b7433d9dc85de8675911eei195.jpg"
# "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# 零压力社交 - 唐文理 & 格雷戈里·福斯特
# "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# 高效能时间管理术 - 帕特里克·福赛思
# "https://upload.yunpub.cn/ei/202401/d1/be3202096a46c7ab7039d3f43c2680ia7p.jpg"
# "https://upload.yunpub.cn/ei/202401/50/bf81792e494e849e39f8ec7a4f5812iq8z.jpg"
# "https://upload.yunpub.cn/ei/202401/5d/61e287bb15461fa3b77969d866b0bdik17.jpg"
#
### 输出
#
# 零压力社交 - 唐文理 & 格雷戈里·福斯特 # "https://upload.yunpub.cn/ei/202406/85/e409cfa9b7433d9dc85de8675911eei195.jpg"
# 零压力社交 - 唐文理 & 格雷戈里·福斯特 # "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# 零压力社交 - 唐文理 & 格雷戈里·福斯特 # "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# 零压力社交 - 唐文理 & 格雷戈里·福斯特 # "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# 零压力社交 - 唐文理 & 格雷戈里·福斯特 # "https://upload.yunpub.cn/ei/202406/b0/aae9072fda4f7f9cadaa152b05eb07ib8x.png"
# 高效能时间管理术 - 帕特里克·福赛思 # "https://upload.yunpub.cn/ei/202401/d1/be3202096a46c7ab7039d3f43c2680ia7p.jpg"
# 高效能时间管理术 - 帕特里克·福赛思 # "https://upload.yunpub.cn/ei/202401/50/bf81792e494e849e39f8ec7a4f5812iq8z.jpg"
# 高效能时间管理术 - 帕特里克·福赛思 # "https://upload.yunpub.cn/ei/202401/5d/61e287bb15461fa3b77969d866b0bdik17.jpg"
#
# -----------------------------------------------------------------------------------
