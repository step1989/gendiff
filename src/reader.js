import fs from 'fs';

const reader = (pathfile) => fs.readFileSync(pathfile, 'utf8');
export default reader;
