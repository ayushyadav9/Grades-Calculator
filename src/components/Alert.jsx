import React, { useEffect } from 'react'

const Alert = ({spi,setAlert,error,seterror}) => {
    
    useEffect(() => {
        document.getElementById('alertModal').click();
    }, [])

    const handelClose = ()=>{
        seterror(null)
        setAlert(false)
    }
    return (
        <>
        <button type="button" id="alertModal" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#modalCPI">
            Launch static backdrop modal
        </button>
        <div className="modal fade" id="modalCPI" data-bs-backdrop="static" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{error?"Error":"SPI calculated"}</h5>
                <button type="button" onClick={handelClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {error? error : `Your SPI is ${spi}`}
            </div>
            <div className="modal-footer">
                <button type="button" onClick={handelClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Alert
