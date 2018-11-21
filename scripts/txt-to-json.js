const readline = require('readline')
const fs = require('fs')
const path = require('path')

const LINES_PER_RUNEWORD = 4;
const FILE_SOURCE_PATH = path.resolve(__dirname, '../db/RunewordList.txt');
const FILE_DEST_PATH = path.resolve(__dirname, '../db/RunewordList.json');

var isDone = false;
var lineCount = -1;
var currRuneword;
var runewords = [];

convertFile();

//
// Helper function below
//

function convertFile() {
    isDone = false;
    var rl = readline.createInterface({
        input : fs.createReadStream(FILE_SOURCE_PATH),
        output: process.stdout,
        terminal: false
    })
    rl.on('line',function(line){
        line = line.trim();
        onNextLine(line);
    })
}

function onNextLine(line) {

    if (!line || isDone)
        return;

    if (line === 'EOF') {
        isDone = true;
        generateOutput();
        return;
    }

    lineCount = (lineCount + 1) % LINES_PER_RUNEWORD;

    switch (lineCount) {
        case 0: // Name
            currRuneword = { name: line };
            console.log(`name: ${line}`);
            break;

        case 1: // Socket count & item type
            processSocketsAndItemType(currRuneword, line);
            break;

        case 2: // Runes
            processRunes(currRuneword, line);
            break;

        case 3: // Effects
            processEffects(currRuneword, line);
            addRuneword(currRuneword);
            break;
    }
}

function processSocketsAndItemType(currRuneword, line) {
    // TODO
}

function processRunes(currRuneword, line) {
    // TODO
}

function processEffects(currRuneword, line) {
    // TODO
}

function addRuneword(runeword) {
    runewords.push(runeword);
}

function generateOutput() {
    let count = runewords.length;
    console.log(`Total runewords: ${count}`);
    fs.writeFileSync(FILE_DEST_PATH, JSON.stringify(runewords, null, 2));
}