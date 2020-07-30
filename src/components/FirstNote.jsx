import React from "react";
import Notepad from "./Notepad";
import { apiSaveNote } from "../apis";

export default function FirstNote(props) {
  return (
    <div className="container">
      <div className="d-flex border-bottom border-dark py-2">
        <div className="w-100 text-center py-1">My Awesome Notepad</div>
      </div>
      <Notepad
        selectedNote={props.selectedNote}
        setSelectedNote={props.setSelectedNote}
      />
      <div className="fixed-bottom mb-2">
        <div className="container bg-light text-right">
          {props.notes.length > 0 && (
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill border-0 mr-2"
              onClick={() => {
                props.setSelectedNote(props.notes[0]);
                props.setAddNewNote(false);
              }}
            >
              Cancel
            </button>
          )}
          {props.enableSave ? (
            <>
              <button
                type="button"
                className="btn btn-outline-primary rounded-pill border-0"
                onClick={async () => {
                  const newNote = await apiSaveNote(
                    props.selectedNote.text
                  ).then((response) => response.json());
                  props.setNotes([newNote, ...props.notes]);
                  props.setSelectedNote(newNote);
                  props.setAddNewNote(false);
                }}
              >
                Save
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
