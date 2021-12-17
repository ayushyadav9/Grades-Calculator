import React, { useEffect, useState } from "react";
import { eee, ece, grades } from "../../content/depts";
import Alert from "./Alert";
import Popup from "./Popup";

const gradeMultiplier = (grade)=>{
  switch (grade) {
    case "AA/AS": return 10
    case "AB": return 9
    case "BB": return 8
    case "BC": return 7
    case "CC": return 6
    case "CD": return 5
    case "DD": return 4
    default: return 0
  }
}

const SPICalculator = (data)=>{
  console.log(data)
  let ans = 0;
  let tc = 0;
  for(let i=0;i<data.length;i++){
    ans += data[i].credit*(data[i].grade?gradeMultiplier(data[i].grade):0)
    tc += data[i].credit
  }
  return (ans/tc).toFixed(2);
}

const Spi = () => {
    const [data, setdata] = useState(null)
    const [sems, setsems] = useState(0)
    const [alert, setAlert] = useState(false)
    const [spi, setSpi] = useState(0)
    const [error, seterror] = useState(null)

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
        credit:parseInt(creditValue),
        grade:gradeValue.name
      }
      setdata([...data,newCourse])
      
    }

    const handelCalculateSPI = ()=>{
      const checkError = data.filter((ele)=>ele.grade?true:false);
      if(checkError.length===0){
        seterror("Please Choose Grade of at least one Course")
      }else{
        setSpi(SPICalculator(data))
      }
      setAlert(true)
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
     {alert && <Alert spi={spi} setAlert={setAlert} error={error} seterror={seterror}/>}
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
                      <button className="btn btn-outline-success" data-bs-toggle="modal"  data-bs-target="#addCourseModal">Add Course</button>
                    </div>
                  </td><td></td><td></td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container" id="btn_cal">
        <div className="row my-4">
          <div className="col-6"><button className="btn btn-success" id="btn_CPI" onClick={handelCalculateSPI}>Calculate SPI</button></div>
          <div className="col-6"><button id="calculateagain_btn" className="btn btn-danger">Calculate Again</button></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Spi;
