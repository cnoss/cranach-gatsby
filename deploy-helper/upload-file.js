const { exec } = require('child_process');

const now = new Date();
const zipfileName = `graphics-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.zip`;
const command = `sftp cnoss@lucascranach.org <<< $'put ${zipfileName}'`;


exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(command);
});
