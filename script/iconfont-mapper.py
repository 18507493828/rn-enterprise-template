from shutil import copyfile
import sys, os
from fontTools.ttLib import TTFont

# 进入 fontFilePath 目录，可以执行 ttx -o iconfont.ttx iconfont.ttf 验证 
# step1: pip3 install fonttools --break-system-packages
# step2: python3 iconfont-mapper.py iconfont.ttf iconfont.js
tmpl = """
const map = {%s};
export const fromCharCode = (name)=>String.fromCharCode(String(map[name]));
export default map;
"""



# 路径定义
fontFilePath = "./src/assets/fonts/iconfont.ttf"
outputPath = "./src/components/Icon/config/iconfont.js"
androidFontFilePath = "./android/app/src/main/assets/fonts/iconfont.ttf"
# iosFontFilePath = "./ios/rnTemplate/Resources/iconfont.ttf"
# iosResourcesDir = "./ios/rnTemplate/Resources"  # iOS 资源目录

def main(fontFile, output):
    try:
        # # 创建 iOS 资源目录（如果不存在）
        # if not os.path.exists(iosResourcesDir):
        #     os.makedirs(iosResourcesDir)

        # 解析字体映射表
        font = TTFont(fontFile)
        glyphMap = font["cmap"].getcmap(3, 1).cmap
        tmp = ""
        for k in glyphMap:
            tmp += '"%s":%d,' % (glyphMap[k], int(k))

        # 生成 JavaScript 映射文件
        with open(output, "w+") as f:
            f.write(tmpl % tmp)

        # 复制字体文件到 Android 和 iOS 路径
        copyfile(fontFilePath, androidFontFilePath)
        # copyfile(fontFilePath, iosFontFilePath)

        print("Font mapping and file copying completed successfully!")

    except Exception as ex:
        print("Error:", ex)

if __name__ == '__main__':
    if os.path.exists(fontFilePath):
        main(fontFilePath, outputPath)
    else:
        print("Font file not found.")
    sys.exit()
