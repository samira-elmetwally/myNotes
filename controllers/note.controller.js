const fs = require("fs");
const path = require("path");
const notesPath = path.join(__dirname, "..", "notes.txt");

let notes = JSON.parse(fs.readFileSync(notesPath, "utf8"));

exports.getAllNotes = (req, res) => {
  //   console.log(req.url);
  //   console.log(res.statusCode);
  res.status(200).json({
    url: req.url,
    success: true,
    data: notes,
  });
  //   res.json(notes);
};

//-------------------------------

exports.addNewNote = (req, res) => {
  let { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({
      success: false,
      message: "all fields is required!",
    });
  }
  let id = String(+notes[notes.length - 1].id + 1);

  let newNote = {
    id,
    ...req.body,
  };
  notes.push(newNote);
  fs.writeFileSync("./notes.txt", JSON.stringify(notes));

  //   console.log(notes[notes.length - 1]);
  //   console.log(notes[notes.length - 1].id);

  res.json(notes);
};

//--------------------------

exports.editOldNote = (req, res) => {
  console.log(req.params.id);
  let index = notes.findIndex((note) => note.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "note not found",
    });
  }
  notes[index] = { ...notes[index], ...req.body };
  fs.writeFileSync("./notes.txt", JSON.stringify(notes));
  res.status(200).json({
    success: true,
    updatedNote: notes[index],
  });
};

//-----------------------

exports.deleteNote = (req, res) => {
  console.log(req.params.id);
  let index = notes.findIndex((note) => note.id == Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "note not found",
    });
  }
  notes.splice(index, 1);
  fs.writeFileSync("./notes.txt", JSON.stringify(notes));
  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
};

