import React from "react";
import { apiDeleteNoteByID } from "../apis";

export default function NotesList(props) {
  return (
    <ul className="list-group list-group-flush" style={{ cursor: "pointer" }}>
      {props.notes.map((note) => (
        <li
          key={note._id}
          // note in note list is set to active if it is the selected note by user
          className={`list-group-item list-group-item-action p-0 ${
            note._id === props.selectedNote._id ? "active" : null
          }`}
        >
          <div className="d-flex">
            <button className="btn btn-outline-danger rounded-circle p-1 my-1 border-0">
              <img
                onClick={() => {
                  // deleting the note by ID
                  apiDeleteNoteByID(note._id);
                  // Removing the note deleted
                  const notes = props.notes.filter((x) => x._id !== note._id);
                  // Updating the state
                  props.setNotes(notes);
                  // In case the last note was deleted, setting the state
                  // to ask user to add a new note (welcome scrren)
                  if (notes.length === 0) {
                    props.setSelectedNote({ text: "" });
                    props.setAddNewNote(true);
                  } else {
                    // If it's not the last note then setting the first not as selected one
                    props.setSelectedNote(notes[0]);
                  }
                }}
                alt="delete note"
                height="25px"
                src="https://img.icons8.com/carbon-copy/100/000000/trash.png"
              />
            </button>
            <div
              onClick={() => props.setSelectedNote(note)}
              className="p-1 my-1 w-100"
            >
              {/* Truncating the text if the note string length exceeds by 35 characters */}
              {note.text.length > 35
                ? `${note.text.substring(0, 35)}...`
                : note.text}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
