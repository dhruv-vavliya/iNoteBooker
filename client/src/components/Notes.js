import React ,{useContext ,useState ,useEffect ,useRef } from 'react';
import NoteItem from './NoteItem';
import Footer from './Footer';

import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const {notes ,fetch_notes ,update_note } = useContext(NoteContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if( token === '' ) navigate('/login');
        else fetch_notes();
    }, []);

    
    const update_toggle = useRef(null);
    const [note, setNote] = useState({ id:'' ,title:'' ,description:'' ,tag:'general' });

    const editnote = (onote)=>{
        setNote(onote);
        update_toggle.current.click();
    };

    const handle_edit = () => {
        update_note(note);
        update_toggle.current.click();
    }
    const handle_change = (e) => {
        setNote({ ...note ,[e.target.name] : e.target.value });
    }
    
    return (
        <>      

            {/* updation pad */}
            <button type="button" className="btn btn-primary d-none" ref={update_toggle} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit a Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                        <div className="modal-body" >
                            <div className="container card text-dark bg-light mb-3"  >
                                <div className="row">
                                    <div className="card-header col-8"><input id="title" name='title' value={note.title} onChange={handle_change} type="text" className="form-control" placeholder="Title"
                                        aria-label="title" aria-describedby="addon-wrapping" />
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
                                        <textarea id="description" name='description' value={note.description} onChange={handle_change} className="form-control" placeholder="take a note..."
                                            aria-label="description" ></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard Changes</button>
                            <button type="button" className="btn btn-primary"  disabled={ note.title==="" || note.description==="" } onClick={ handle_edit } >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>




            <br />
            <h1>Your Notes</h1>
            <hr />
            <div id="my_content" className="row d-flex justify-content-center">
                { notes.length === 0 && <h1 style={{color : "#E7E9EB" }} >Oops ! Currently data is not available....</h1> }
                {
                    notes && notes.map( (note)=>{
                        return <NoteItem key={note._id} note={note} editnote={editnote} />
                    })
                }
            </div>
            <Footer/>
        </>
    )
}

export default Notes;
