const { exec } = require('child_process');

const now = new Date();
const foldername = `graphics-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
const zipfileName = `graphics-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.zip`;
const command = `zip -r ${zipfileName} ./${foldername}`;

function removeFolder() {
  const remove = `rm -r ./${foldername}`;
  exec(remove, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(remove);
  });
}

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
  removeFolder();
});
