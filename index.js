const fs = require('fs');

const main = (path) => {
  if (path.length === 0) {
    console.log('File missing');
    throw new Error('File missing');
  } else if (fs.lstatSync(path).isDirectory()) {
    console.log('ERROR: Path is a directory');
    throw new Error('Path is a directory');
  } else if (fs.existsSync(path) === false) {
    console.log('ERROR: File Does Not Exist');
    throw new Error('File Does Not Exist');
  } else {
    return readFile(path, false)
      .then((response) => {
        if (checkJsonValidation(response)) {
          console.log('Valid JSON File contents:', JSON.parse(response));
          return JSON.parse(response);
          //   {
          //     status: 200,
          //     message: 'Valid JSON Data',
          //     data: JSON.parse(response),
          //   };
        } else {
          console.log('ERROR: JSON Invalid');
          throw new Error('JSON Invalid');
        }
      })
      .catch((err) => {
        console.log('ERROR: Something went wrong', err);
        throw new Error('Something went wrong');
      });
  }
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const checkJsonValidation = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

module.exports = main;
