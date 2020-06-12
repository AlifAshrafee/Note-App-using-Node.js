const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('Note added!'));
    }else {
        console.log(chalk.bgRed('Title already exists!'));
    }
    
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notesToKeep.length < notes.length){
        console.log(chalk.bgGreen('Note removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgRed('No note found with the title: ' + title));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if(notes.length == 0){
        console.log(chalk.bgRed('No notes available!'));
    } else {
        console.log(chalk.bgGreen('Your Notes:'));
        notes.forEach(note => {
            console.log(note.title);
        });
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title);

    if(noteToRead){
        console.log(chalk.bgGreen(noteToRead.title));
        console.log(noteToRead.body);
    } else {
        console.log(chalk.bgRed('No note found with title: ' + title));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}