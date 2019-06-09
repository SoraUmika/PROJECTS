"""
React component file generator.
"""
import sys
import os

FC = """import * as React from 'react';

type Props = {

}

const %s: React.FC<Props> = (props: Props) => {
    const {} = props;
    return (
        <React.Fragment>
            
        </React.Fragment>
    );
}

export default %s;

"""

STYLED = """import styled from 'styled-components';

const %s = styled`
    
`;

export default %s;

"""

STYLED_PROPS = """import styled from 'styled-components';

type Props = {

};

const %s = styled`
    
`;

export default %s;

"""

templates = {
    'fc': (FC, 
        lambda name: f'src/components/{name}/index.tsx', 
        lambda args: (args[0], args[0])
    ),
    'styled': (STYLED, 
        lambda name: f'src/components/Styles/{name}.ts', 
        lambda args: (args[0], args[0])
    ),
    'styledProps': (STYLED_PROPS, 
        lambda name: f'src/components/Styles/{name}.ts', 
        lambda args: (args[0], args[0])
    )
}

tempName, *args = sys.argv[1:]
temp, pathGen, formatArgGen = templates[tempName]
path = pathGen(args[0])
if (not os.path.exists(path)):
    with open(path, 'w+') as f:
        f.write(temp % formatArgGen(args))