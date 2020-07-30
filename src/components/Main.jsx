import React, { useEffect, useState } from "react";
import { apiGetAllNotes, apiUpdateNote } from "../apis";
import Header from "./Header";
import NotesList from "./NotesList";
import Notepad from "./Notepad";
import FirstNote from "./FirstNote";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Note() {
  // Saving and accessing all the notes received from database
  const [notes, setNotes] = useState([]);

  // On selection, a single note is saved in selectedNote
  const [selectedNote, setSelectedNote] = useState();

  // addNewNote is a boolean value to decide if the add note screen is shown or not
  const [addNewNote, setAddNewNote] = useState(false);

  // enableSave is a boolean value to display save and cancel buttons
  const [enableSave, setEnableSave] = useState(false);

  // Setting the state to loading while fetching data from server
  const [loading, setLoading] = useState(true);

  // fetchNotes is an asynchronous function to fetch all the notes from database
  const fetchNotes = async () => {
    // Fetching all notes via API
    const response = await apiGetAllNotes();

    // Converting the response into JSON
    const notes = await response.json();

    // Setting the notes to state
    setNotes(notes);

    // Condition: if an empty notes array is received,
    // selected note is set to empty string and
    // user is shown "add new note" screen.
    if (notes.length === 0) {
      setSelectedNote({ text: "" });
      setAddNewNote(true);
    } else {
      // Condition: if some notes are received from database then setting the first note as selected.
      setSelectedNote(notes[0]);
    }

    // After fetch completes, loading is stopped
    setLoading(false);
  };

  // Using effect to run this operation only once when the component is mounted
  useEffect(() => {
    fetchNotes();
  }, []);

  // At any time selected note is empty, save button is not displayed.
  useEffect(() => {
    if (selectedNote) {
      setEnableSave(selectedNote.text !== "");
    }
  }, [notes, selectedNote]);

  // Any time the user reverses the changes to note, save button is not displayed.
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
      {/* Loading conditionally rendered */}
      {loading && (
        <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        </div>
      )}
      {/* If add new note is true, First Note screen is shown */}
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

      {/* Otherwise list of notes and main notepad is displayed */}
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
          <div className="mb-2">
            <div className="container bg-light text-right">
              {/* Conditionally rendering save/cancel buttons */}
              {enableSave ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary rounded-pill border-0 mr-2"
                    // If the user decides to cancel the changes,
                    // fiding the note by ID in notes array and seeting the note found as selected
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
                    // Updating the note by ID
                    onClick={async () => {
                      const updatedNote = await apiUpdateNote(
                        selectedNote
                      ).then((response) => response.json());
                      // Removing the old note
                      let newNotesArray = notes.filter(
                        (x) => x._id !== updatedNote._id
                      );
                      // Adding newly updated note to the top of the array
                      newNotesArray = [updatedNote, ...newNotesArray];
                      // Updating the notes state
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
