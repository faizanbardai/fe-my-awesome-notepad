const baseURL = process.env.REACT_APP_BASE_URL;
export const apiGetAllNotes = async () => {
  return await fetch(baseURL + "/notes");
};
export const apiSaveNote = async (text) => {
  return await fetch(baseURL + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
};
export const apiUpdateNote = async (note) => {
  return await fetch(baseURL + "/notes/" + note._id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: note.text }),
  });
};
export const apiDeleteNoteByID = async (_id) => {
  return await fetch(baseURL + "/notes/" + _id, {
    method: "DELETE",
  });
};
