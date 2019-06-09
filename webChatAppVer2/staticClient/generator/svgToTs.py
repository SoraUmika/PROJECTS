import sys
import re
import os

def svgNameToTsName(svgName: str):
    tsName = ""
    segments = re.split('_|-', svgName)
    endIndex = len(segments) - 1
    for i, seg in enumerate(segments):
        if 0 < i < endIndex:
            tsName += seg.capitalize()
    if svgName[0:7] == "outline":
        tsName += "Outline"
    return tsName

def getPath(filePath: str):
    with open(filePath, 'r') as fileContent:
        rawText = fileContent.readlines()[0]
        path = re.findall(pattern, rawText)[0]
    return path

pattern = re.compile(r'<(?:path|g).+/>(?:</g>)?')

svgFileName = sys.argv[1]
tsName = svgNameToTsName(svgFileName)

srcFilePath = f"src/image/{svgFileName}.svg"
targetFilePath = f"src/components/svg/{tsName}.tsx"

template = """import * as React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
const %s: React.FC<SvgIconProps> = props => {
    return (
        <SvgIcon {...props}>
            %s
        </SvgIcon>
    );
}
export default %s;
"""
path = getPath(srcFilePath)

with open(targetFilePath, "w+") as tsFile:
    tsFile.write(template % (tsName, path, tsName))
os.remove(srcFilePath)