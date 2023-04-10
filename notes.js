const fs = require('fs');
const c = require('ansi-colors');

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (ex) {
    return [];
  }
}

const listNotes = () => {
  const notes = loadNotes();

  console.log(c.bold.italic.underline.yellow('Your Notes...\n'));

  notes.forEach(note => console.log(c.magenta.bold(note.title)));
}

const readNotes = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(c.bold.yellow('Title: ') + c.bold.italic.cyan(note.title));
    console.log(c.bold.green('Body: ') + c.bold.magenta(note.body));
  } else {
    console.log(c.red.bold.inverse('No note found!'));
  }
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(c.green.inverse('New Note Added!'));
  } else {
    console.log(c.red.inverse('Error!\nNote title taken'));
  }
}


const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title)

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(c.green.inverse('Note removed!'));
  } else {
    console.log(c.red.inverse('No note found!'));
  }
}

module.exports = {
  listNotes: listNotes,
  readNotes: readNotes,
  addNote: addNote,
  removeNote: removeNote
}