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
        <div className="container">
        <h1 className="text-center h1 my-4">CPI/SPI Calculator</h1>
        <div className="container">
            <div className="row text-center my-4">
                <div className="col-lg-4">
                <div className="btn-group">
                    <button type="button" className="btn btn-success dropdown-toggle my-2" data-bs-toggle="dropdown" aria-expanded="false">
                        {cpispi}
                    </button>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={()=>setcpispi("CPI")} style={{cursor:"pointer"}}>CPI</li>
                            <li className="dropdown-item" onClick={()=>setcpispi("SPI")} style={{cursor:"pointer"}}>SPI</li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-4">
                <div className="btn-group">
                    <button type="button" className="btn btn-success dropdown-toggle my-2" data-bs-toggle="dropdown" aria-expanded="false">
                        {seme.name}
                    </button>
                    <ul className="dropdown-menu">
                        {semesters.map((sem,i)=>{
                            return <li key={i} className="dropdown-item" onClick={()=>setseme(sem)} style={{cursor:"pointer"}}>{sem.name}</li>
                        })}
                    </ul>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="btn-group">
                    <button type="button" className="btn btn-success dropdown-toggle my-2" data-bs-toggle="dropdown" aria-expanded="false">
                        {dept}
                    </button>
                        <ul className="dropdown-menu">
                            {departments.map((dept,i)=>{
                                return <li key={i} className="dropdown-item" onClick={()=>setdept(dept.value)} style={{cursor:"pointer"}}>{dept.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-grid gap-2 d-md-flex">
            <button type="button" disabled={isDisabled} className="btn btn-primary mx-auto" onClick={handelSubmit}>Submit</button>
        </div>
        <section className="my-4">
            <div className="container">
                <div className="card">
                    <h2 className="card-header text-center">How to Use</h2>
                    <ul className="list-group">
                        <li className="list-group-item font-weight-bold">* Enter the latest grade recieved in Repeated Course</li>
                        <li className="list-group-item">Select SPI or CPI , then select Semester/Semester Completed and then
                            your
                            Department</li>
                        <li className="list-group-item">Select coursewise Grade and hit Calculate Button</li>
                        <li className="list-group-item">Courses not done can be left empty and 'Add Course' can be used to add
                            extra Courses.Adding Course details are not Mandatory</li>
                    </ul>
                </div>
            </div>
        </section>
        </div>
    )
}



export default Home
