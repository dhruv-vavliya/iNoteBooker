import react, { createContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlertContext = createContext();
toast.configure();

const AlertComponent = (props) => {

    const show = (Ttype ,Tmsg)=>{
        if (Ttype === "warning") toast.warning(Tmsg, { autoClose: 1000, position: toast.POSITION.BOTTOM_RIGHT });
        else if (Ttype === "success") toast.success(Tmsg, { autoClose: 1000, position: toast.POSITION.BOTTOM_RIGHT });
        else if (Ttype === "error") toast.error(Tmsg, { autoClose: 1000, position: toast.POSITION.BOTTOM_RIGHT });
        else if (Ttype === "info") toast.info(Tmsg, { autoClose: 1000, position: toast.POSITION.BOTTOM_RIGHT });
    }
    
    return (
        <AlertContext.Provider value={show} >
            { props.children }
        </AlertContext.Provider>
    )
}

export {AlertContext as default ,AlertComponent};