import React from "react";
import { apiDeleteNoteByID } from "../apis";

export default function NotesList(props) {
  return (
    <ul className="list-group list-group-flush" style={{ cursor: "pointer" }}>
      {props.notes.map((note) => (
        <li
          key={note._id}
          className="list-group-item list-group-item-action p-0"
        >
          <button className="btn btn-outline-danger rounded-circle p-1 m-2 border-0">
            <img
              onClick={() => {
                apiDeleteNoteByID(note._id);
                const notes = props.notes.filter((x) => x._id !== note._id);
                props.setNotes(notes);
                if (notes.length === 0) {
                  props.setSelectedNote({ text: "" });
                  props.setAddNewNote(true);
                } else {
                  props.setSelectedNote(notes[0]);
                }
              }}
              alt="delete note"
              height="25px"
              src="https://img.icons8.com/carbon-copy/100/000000/trash.png"
            />
          </button>
          <span onClick={() => props.setSelectedNote(note)}>
            {note.text.length > 15
              ? `${note.text.substring(0, 15)}...`
              : note.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
