import React, { useEffect } from 'react'

const Alert = () => {
    
    useEffect(() => {
        document.getElementById('alertModal').click();
    }, [])
    return (
        <>
        <button type="button" id="alertModal" class="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#modalCPI">
            Launch static backdrop modal
        </button>
        <div class="modal fade" id="modalCPI" data-bs-backdrop="static" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Alert
