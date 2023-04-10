const yargs = require('yargs');
const notes = require('./notes');
const { argv } = require('process');

// Customize yargs version
yargs.version('1.1.0');

// Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  }
})

// Create read note command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNotes(argv.title);
  }
})

// Create add note command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body of the Note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

// Create remove note command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
})


yargs.parse();