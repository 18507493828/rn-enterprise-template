const pro = require('child_process');
pro.exec('python3 ./script/iconfont-mapper.py', (error, stdout, stderr) => {
    if (error) {
        console.info(`stderr:${stderr}`);
    }
    console.log(`exec:${stdout || 'success'}`);
});
