#!/bin/bash

# 检查是否提供了版本参数
if [[ $1 != "--version="* ]]; then
    echo "请使用正确的格式提供版本号：./updateEnv.sh --version=x.x.x"
    exit 1
fi

# 获取版本号
VERSION="${1#--version=}"

# 要更新的文件列表
ENV_FILES=(".env" ".env.dev" ".env.pre" ".env.staging")

# 获取脚本所在目录的父目录（项目根目录）
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# 更新每个环境文件
for file in "${ENV_FILES[@]}"; do
    FILE_PATH="$ROOT_DIR/$file"
    
    # 检查文件是否存在
    if [ ! -f "$FILE_PATH" ]; then
        echo "警告: $file 不存在"
        continue
    fi
    
    # 获取当前的版本号
    CURRENT_APP_VERSION_CODE=$(grep "APP_VERSION_CODE=" "$FILE_PATH" | cut -d'=' -f2)
    CURRENT_IOS_BUILD_NUM=$(grep "IOS_BUILD_NUM=" "$FILE_PATH" | cut -d'=' -f2)
    
    # 计算新的版本号
    NEW_APP_VERSION_CODE=$((CURRENT_APP_VERSION_CODE + 1))
    NEW_IOS_BUILD_NUM=$((CURRENT_IOS_BUILD_NUM + 1))
    
    # 使用 sed 更新文件内容
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/APP_VERSION=.*/APP_VERSION=$VERSION/" "$FILE_PATH"
        sed -i '' "s/APP_VERSION_CODE=.*/APP_VERSION_CODE=$NEW_APP_VERSION_CODE/" "$FILE_PATH"
        sed -i '' "s/IOS_BUILD_NUM=.*/IOS_BUILD_NUM=$NEW_IOS_BUILD_NUM/" "$FILE_PATH"
    else
        # Linux
        sed -i "s/APP_VERSION=.*/APP_VERSION=$VERSION/" "$FILE_PATH"
        sed -i "s/APP_VERSION_CODE=.*/APP_VERSION_CODE=$NEW_APP_VERSION_CODE/" "$FILE_PATH"
        sed -i "s/IOS_BUILD_NUM=.*/IOS_BUILD_NUM=$NEW_IOS_BUILD_NUM/" "$FILE_PATH"
    fi
    
    echo "已更新 $file"
done