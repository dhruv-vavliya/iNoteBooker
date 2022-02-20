import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='sticky-bottom my-3'  style={{ backgroundColor: "#b3ecff" ,borderRadius:"5px" ,left:"0" , bottom: "0", width: "100%"  }} >
                <div className='text-center py-sm-2 py-md-3' >
                    &copy; {new Date().getFullYear()} Copyright: <Link to="/"> inotebooker.com </Link>
                    By Dhruv_Vavliya
                </div>
            </div>
        </>
    )
}

export default Footer