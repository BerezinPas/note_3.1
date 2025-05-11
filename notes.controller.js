const path = require("path");
const chalk = require("chalk");
const Note = require("./models/note");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  await Note.create({ title });

  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await Note.find();

  return notes;
}

async function removeNote(id) {
  await Note.deleteOne({ _id: id });
  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

async function setNote(noteData) {
  await Note.updateOne({ _id: noteData.id }, { title: noteData.title });

  console.log(chalk.blue(`Note with id="${noteData.id}" has been updated.`));
}
module.exports = {
  addNote,
  getNotes,
  removeNote,
  setNote,
};
