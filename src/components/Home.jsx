import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { departments,semesters } from '../content/home'

const Home = () => {
    const [cpispi, setcpispi] = useState("CPI/SPI")
    const [dept, setdept] = useState("Department")
    const [seme, setseme] = useState({name:"Semester",value:0})
    const [isDisabled, setisDisabled] = useState(true)

    const history = useHistory()

    useEffect(() => {
        if(cpispi !== "CPI/SPI" && seme.value !== 0 && dept!=="Department"){
            setisDisabled(false)
        }
    }, [cpispi,dept,seme])

    const handelSubmit = ()=>{
        if(cpispi !== "CPI/SPI" && seme.value !== 0 && dept!=="Department"){
            history.push(`${cpispi}?sem=${seme.value}&dept=${dept}`)
        }
    }

    return (
        <div class="container">
        <h1 class="text-center h1 my-4">CPI/SPI Calculator</h1>
        <div class="container">
            <div class="row text-center my-4">
                <div class="col-lg-4">
                <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle my-2" data-bs-toggle="dropdown" aria-expanded="false">
                        {cpispi}
                    </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item" onClick={()=>setcpispi("CPI")} style={{cursor:"pointer"}}>CPI</li>
                            <li class="dropdown-item" onClick={()=>setcpispi("SPI")} style={{cursor:"pointer"}}>SPI</li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-4">
                <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle my-2" data-bs-toggle="dropdown" aria-expanded="false">
                        {seme.name}
                    </button>
                    <ul class="dropdown-menu">
                        {semesters.map((sem,i)=>{
                            return <li key={i} class="dropdown-item" onClick={()=>setseme(sem)} style={{cursor:"pointer"}}>{sem.name}</li>
                        })}
                    </ul>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle my-2" data-bs-toggle="dropdown" aria-expanded="false">
                        {dept}
                    </button>
                        <ul class="dropdown-menu">
                            {departments.map((dept,i)=>{
                                return <li key={i} class="dropdown-item" onClick={()=>setdept(dept.value)} style={{cursor:"pointer"}}>{dept.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-grid gap-2 d-md-flex">
            <button type="button" disabled={isDisabled} class="btn btn-primary mx-auto" onClick={handelSubmit}>Submit</button>
        </div>
        <section class="my-4">
            <div class="container">
                <div class="card">
                    <h2 class="card-header text-center">How to Use</h2>
                    <ul class="list-group">
                        <li class="list-group-item font-weight-bold">* Enter the latest grade recieved in Repeated Course</li>
                        <li class="list-group-item">Select SPI or CPI , then select Semester/Semester Completed and then
                            your
                            Department</li>
                        <li class="list-group-item">Select coursewise Grade and hit Calculate Button</li>
                        <li class="list-group-item">Courses having S/X are not calculated in CPI/SPI</li>
                        <li class="list-group-item">Courses not done can be left empty and 'Add Course' can be used to add
                            extra Courses.Adding Course name is not Mandatory</li>
                        <li class="list-group-item">You can also estimate your CPI by entering expected CPI and total
                            credit(total credit done at end of any sem( ex-413 for Chemistry at end of 8 sem))</li>
                        <li class="list-group-item">For estimation you will need to enter your all Course grades till
                            recent semester</li>
                        <li class="list-group-item">MTech/MSc student can add their course manually</li>
                    </ul>
                </div>
            </div>
        </section>
        </div>
    )
}



export default Home
