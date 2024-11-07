#!/bin/bash

ofs() {

    # 创建目标目录结构
    mkdir -p META-INF
    mkdir -p OEBPS/Images
    mkdir -p OEBPS/Styles
    mkdir -p OEBPS/Text

    # 移动并重命名文件
    for file in *_*; do
        case "$file" in
            META-INF_*)
                mv "$file" "META-INF/${file#META-INF_}"
                ;;
            OEBPS_Images_*)
                mv "$file" "OEBPS/Images/${file#OEBPS_Images_}"
                ;;
            OEBPS_Styles_*)
                mv "$file" "OEBPS/Styles/${file#OEBPS_Styles_}"
                ;;
            OEBPS_Text_*)
                mv "$file" "OEBPS/Text/${file#OEBPS_Text_}"
                ;;
            OEBPS_*)
                mv "$file" "OEBPS/${file#OEBPS_}"
                ;;
            *)
                echo "未处理的文件: $file"
                ;;
        esac
    done

    # 将 mimetype.txt 重命名为 mimetype
    if [ -f "mimetype.txt" ]; then
        mv "mimetype.txt" "mimetype"
    fi
}

# 遍历所有目录并调用 ofs 函数
for dir in */; do
    (
        cd "$dir" || continue
        ofs
    )
done
