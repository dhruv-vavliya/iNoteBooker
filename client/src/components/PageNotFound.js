import React from 'react'
import pnf from '../pnf.svg'

const PageNotFound = () => {
    return (
        <>
            <img src={pnf} alt="dhruv vavliya" height="30%" width="30%" className="mx-auto mt-5" style={{ display:"block" }} />
            <br />
            <h1 style={{ color:"#9a9fa3" ,textAlign: "center" }} >Oops ! You lost path ...</h1>
        </>
    )
}

export default PageNotFound