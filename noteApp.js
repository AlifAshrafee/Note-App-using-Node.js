const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//customizing version
yargs.version('1.1.0');

//creating add command
yargs.command({
    command: 'add',
    describe: 'Adds a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
    }
});

//creating remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
});

//creating list command
yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler(){
        notes.listNotes();
    }
});

//creating remove command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

//console.log(yargs.argv);
yargs.parse();