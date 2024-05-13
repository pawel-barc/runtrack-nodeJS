const fs = require('fs');

fs.readdir('../../jour01', (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach(file => {
    if (fs.statSync(`../../jour01/${file}`).isDirectory()) {
      console.log(file);
    }
  });
});
