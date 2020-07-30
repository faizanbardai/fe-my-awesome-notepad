import React from "react";

export default function Notepad(props) {
  return (
    <form>
      <div className="form-group">
        <textarea
          placeholder="Type your note here..."
          required
          className="form-control border-0"
          style={{ height: "500px" }}
          value={props.selectedNote.text}
          onChange={(e) => {
            props.setSelectedNote({
              ...props.selectedNote,
              text: e.target.value,
            });
          }}
        />
      </div>
    </form>
  );
}
