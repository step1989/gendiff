
const fs = require('fs');

const mapper = {
  EISDIR: (pathfile) => console.log(`"${pathfile}" is a folder`),
  ENOENT: (pathfile) => console.log(`"${pathfile}" - no such file or not acces`),
};

const reader = (pathfile) => {
  try {
    fs.accessSync(pathfile);
    return fs.readFileSync(pathfile, 'utf8');
  } catch (e) {
    mapper[e.code](pathfile);
    process.exit(-1);
    return true;
  }
};

export default reader;
