const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

require('child_process').execSync(`parcel fe/index.html -p ${config.port.fe}`, { stdio: 'inherit' });