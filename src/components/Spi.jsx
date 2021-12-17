import React, { useEffect, useState } from "react";
import { eee, ece, grades } from "../content/depts";
import Popup from "./Popup";

const Spi = () => {
    const [data, setdata] = useState(null)
    const [sems, setsems] = useState(0)

    useEffect(() => {
      var url = new URL(window.location.href)
      var sem = url.searchParams.get("sem")
      var dept = url.searchParams.get("dept")
      setsems(sem)
        if(dept==="EEE"){
          setdata(eee[sem-1])
        }
        else if(dept==="ECE"){
          setdata(ece[sem-1])
        }
    }, [])

    const handelAddCourseSubmit = (course,gradeValue,creditValue)=>{
      let newCourse = {
        courseName:course,
        credit:creditValue,
        grade:gradeValue.name
      }
      setdata([...data,newCourse])
    }

    const handelAddCourse = ()=>{
      document.getElementById('popupButton').click();
    }

    const handelGradeChange = (grade,idx)=>{
      const tempData = [...data];
      tempData[idx] = { 
        ...tempData[idx],
        grade: grade.name,
      }
      setdata(tempData)
    }

  return (
    <>
    <Popup handelAddCourseSubmit={handelAddCourseSubmit}/>
    <div className="text-center">
      <div className="container my-4" id="FirstSemCard">
        <div className="card">
          <h2 className="card-header">Semester: {sems}</h2>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">Course</th>
                <th scope="col"> Credit</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody className="text-uppercase">
                {data && data.map((course,idx)=>{
                    return(
                        <tr key={idx}>
                        <td>{course.courseName}</td>
                        <td>{course.credit}</td>
                        <td>
                        <div className="btn-group">
                            <button type="button"className="btn btn-success dropdown-toggle my-2"data-bs-toggle="dropdown" aria-expanded="false">
                            {course.grade?course.grade:"Grade"}
                            </button>
                            <ul className="dropdown-menu">
                                {grades.map((grade,i)=>{
                                    return <li key={i} className="dropdown-item" onClick={()=>handelGradeChange(grade,idx)} style={{ cursor: "pointer" }}>{grade.name}</li>
                                })}
                            </ul>
                        </div>
                        </td>
                    </tr>
                    )
                })}
                <tr>
                  <td>
                    <div className="container">
                      <button className="btn btn-outline-success" onClick={handelAddCourse} >Add Course</button>
                    </div>
                  </td><td></td><td></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Spi;
