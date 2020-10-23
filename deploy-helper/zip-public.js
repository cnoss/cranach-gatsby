const { exec } = require('child_process');

const now = new Date();
const zipfile_name = `graphics-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.zip`;
const command = `zip -r ${zipfile_name} ./public`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
