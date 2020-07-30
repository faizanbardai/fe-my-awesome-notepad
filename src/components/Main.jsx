import React, { useEffect, useState } from "react";
import { apiGetAllNotes, apiUpdateNote } from "../apis";
import Header from "./Header";
import NotesList from "./NotesList";
import Notepad from "./Notepad";
import FirstNote from "./FirstNote";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();
  const [addNewNote, setAddNewNote] = useState(false);
  const [enableSave, setEnableSave] = useState(false);
  const fetchNotes = async () => {
    const response = await apiGetAllNotes();
    const notes = await response.json();
    setNotes(notes);
    if (notes.length === 0) {
      setSelectedNote({ text: "" });
      setAddNewNote(true);
    } else {
      setSelectedNote(notes[0]);
    }
    setLoading(false);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (selectedNote) {
      setEnableSave(selectedNote.text !== "");
    }
  }, [notes, selectedNote]);

  useEffect(() => {
    if (notes.length > 0 && selectedNote && selectedNote._id) {
      setEnableSave(
        selectedNote.text !==
          notes.find((note) => note._id === selectedNote._id).text
      );
    }
  }, [notes, selectedNote]);
  return (
    <>
      {loading && (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      )}
      {!loading && addNewNote && (
        <FirstNote
          notes={notes}
          selectedNote={selectedNote}
          setNotes={setNotes}
          enableSave={enableSave}
          setSelectedNote={setSelectedNote}
          setAddNewNote={setAddNewNote}
        />
      )}
      {!loading && !addNewNote && (
        <div className="container">
          <Header
            setAddNewNote={setAddNewNote}
            setSelectedNote={setSelectedNote}
          />
          <div className="row">
            <div className="col-sm-12 col-md-4 ">
              <NotesList
                notes={notes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                setNotes={setNotes}
                setAddNewNote={setAddNewNote}
              />
            </div>
            <div className="col-sm-12 col-md-8 border-left border-dark">
              <Notepad
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
              />
            </div>
          </div>
          <div className="fixed-bottom mb-2">
            <div className="container bg-light text-right">
              {enableSave ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-pill border-0 mr-2"
                    onClick={() => {
                      const oldNote = notes.find(
                        (note) => note._id === selectedNote._id
                      );
                      setSelectedNote(oldNote);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline-primary rounded-pill border-0"
                    onClick={async () => {
                      const updatedNote = await apiUpdateNote(
                        selectedNote
                      ).then((response) => response.json());
                      let newNotesArray = notes.filter(
                        (x) => x._id !== updatedNote._id
                      );
                      newNotesArray = [updatedNote, ...newNotesArray];
                      setNotes(newNotesArray);
                    }}
                  >
                    Save
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
