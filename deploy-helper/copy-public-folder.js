const { exec } = require('child_process');

const now = new Date();
const foldername = `graphics-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
const command = `cp -R ./public ./${foldername}`;
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
