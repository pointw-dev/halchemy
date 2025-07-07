const fs = require('fs');
const { execSync } = require('child_process');

// function stampVersion(line, pattern, version) {
//     return line.replace(new RegExp(pattern), (match, p1) => match.replace(p1, version));
// }

function viewFile(currentVersion, filename, pattern) {
    let isGood = true;
    const fileContent = fs.readFileSync(filename, 'utf8');
    const lines = fileContent.split('\n');
    console.log(`\n=== ${filename}`);
    lines.forEach((line, index) => {
        const result = line.match(new RegExp(pattern.replace('{version}', '(.*?)')));
        if (result) {
            const fileVersion = result[1];
            console.log(`line ${index + 1}: ${line}`);
            if (currentVersion !== fileVersion) {
                console.log(`** Not set to current version: >${fileVersion}< should be >${currentVersion}<`);
                isGood = false;
            }
        }
    });
    return isGood;
}

function stampVersion(line, pattern, version) {
    return line.replace(new RegExp(pattern, 'g'), function (match, p1, offset, string) {
        return match.replace(p1, version);
    });
}

function changeFile(newVersion, filename, pattern, dryRun = false) {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const lines = fileContent.split('\n');
    let modded = '';
    console.log(`\n=== ${filename}`);
    lines.forEach((line, index) => {
        const newLine = stampVersion(line, pattern.replace('{version}', '(.*?)'), newVersion);
        modded += newLine + '\n';
        if (line !== newLine) {
            console.log(`line ${index + 1} from: ${line}`);
            console.log(` to:   ${newLine}`);
        }
    });

    if (!dryRun) {
        fs.writeFileSync(filename, modded);
    } else {
        console.log(' - unchanged (dry run)');
    }
}


// Additional functions for `changeFile`, handling command-line arguments, etc., will follow a similar pattern.

module.exports = {
    viewFile,
    changeFile
};
