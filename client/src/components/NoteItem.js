import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const { delete_note } = useContext(NoteContext);
    const {note ,editnote} = props;

    return (
        <>
            {/* adition pad */}
            <div className="card mx-2 my-2 border-info mb-3 col-xl-3 col-lg-3 col-md-4 col-sm-12" style={{ maxWidth: "18rem" }}>
                <div className="card-header row"><h5> {note.title} <span className="badge bg-info text-dark float-end">{note.tag}</span> </h5></div>
                <div className="card-body">
                    <p id="cont" className="card-text"> {note.description} </p>

                    <hr />
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-warning" type="button" onClick={ ()=>{ editnote(note) } } ><i className="fas fa-edit"></i> Edit</button>
                        <button className="btn btn-outline-danger" type="button" onClick={() => { delete_note(note._id) }} ><i className="fas fa-trash"></i> Delete</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default NoteItem;