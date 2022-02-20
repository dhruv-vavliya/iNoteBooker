import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from '../../components/Alert';

// const HOST = window.location.host;

const NoteContext = createContext();

const NoteComponent = (props) => {
    const show = useContext( AlertContext );
    const [notes, setNotes] = useState([]);
    const [updatemode, setupdatemode] = useState(false);
    const navigate = useNavigate();

    // fetch all notes
    const fetch_notes = async ()=>{
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' ,
                'auth-token' : localStorage.getItem('auth-token')
            }
        };
        let response = await fetch( `/notes/fetchnotes` ,request );
        if( response.status !== 200 ) navigate('/login');
        else{ 
            props.setloggedin(true);
            response = await response.json();
            setNotes( response );
        }
    }

    // Add note
    const add_note = async (note) => {        
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' ,
                'auth-token' : localStorage.getItem('auth-token')
            },
            body: JSON.stringify(note)
        };
        let response = await fetch( `/notes/addnote` ,request );
        if( response.status !== 200 ) show( 'warning' ,'sorry for internal server error....' );
        else{
            fetch_notes();
            show( 'success' ,'note successfully added...' );
        }
    }

    // Delete note
    const delete_note = async (id) => {
        const request = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' ,
                'auth-token' : localStorage.getItem('auth-token')
            }
        };
        let response = await fetch( `/notes/deletenote/${id}` ,request );
        if( response.status !== 200 ) show( 'warning' ,'sorry for internal server error....' );
        else{ 
            fetch_notes();
            show( 'success' ,'note successfully deleted...' );
        }
    }

    // Update note
    const update_note = async (note) => {
        const request = {
            method : 'PUT' ,
            headers : {
                'Content-Type' : 'application/json' ,
                'auth-token' : localStorage.getItem('auth-token')
            },
            body : JSON.stringify(note)
        }
        let response = await fetch( `/notes/updatenote/${note._id}` ,request );
        if( response.status !== 200 ) show( 'warning' ,'sorry for internal server error....' );
        else{ 
            fetch_notes();
            show( 'success' ,'note successfully updated...' );
        }
    }

    return (
        <NoteContext.Provider value={{ notes ,updatemode ,setupdatemode ,fetch_notes ,add_note, delete_note, update_note }} >
            {props.children}
        </NoteContext.Provider>
    )
}
export { NoteContext as default, NoteComponent };