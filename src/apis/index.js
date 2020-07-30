const baseURL = process.env.REACT_APP_BASE_URL;
// API to get all the notes saved in database
export const apiGetAllNotes = async () => {
  return await fetch(baseURL + "/notes");
};
// API to save a note
export const apiSaveNote = async (text) => {
  return await fetch(baseURL + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
};
// API to update a note by ID
export const apiUpdateNote = async (note) => {
  return await fetch(baseURL + "/notes/" + note._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: note.text }),
  });
};
// API to delete a note by ID
export const apiDeleteNoteByID = async (_id) => {
  return await fetch(baseURL + "/notes/" + _id, {
    method: "DELETE",
  });
};
