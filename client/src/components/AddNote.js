import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote() {
    const { add_note } = useContext(NoteContext);

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "general"
    });

    const handle_add = (e) => {
        setNote({
            title: "",
            description: "",
            tag: "general"
        });
        e.preventDefault();
        add_note(note);
    }
    const handle_change = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h1>Add a Note</h1>
            <hr />
            <div className="container card text-dark bg-light mb-3" >

                <div className="row">
                    <div className="card-header col-8"><input id="title" name='title' type="text" className="form-control" placeholder="Title"
                        aria-label="title" aria-describedby="addon-wrapping" value={note.title} onChange={handle_change} />
                    </div>

                    <div className="col-4 card-header">
                        <select className="form-select" aria-label="Default select general" name='tag' value={note.tag} onChange={handle_change} >
                            <option defaultValue value="general" >General</option>
                            <option value="technology">Technology</option>
                            <option value="news">News</option>
                            <option value="motivation">Motivation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                </div>

                <div className="card-body">
                    <div className="input-group">
                        <textarea id="description" name='description' className="form-control" placeholder="take a note..." value={note.description} onChange={handle_change}
                            aria-label="description" ></textarea>
                    </div>
                    <br />
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" disabled={note.title === "" || note.description === ""} type="button" onClick={handle_add}  ><i className="far fa-plus-square"></i> Add a Note</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default AddNote;
