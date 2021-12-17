import React, { useEffect, useState } from "react";
import { grades } from "../../content/depts";

const Popup = ({handelAddCourseSubmit}) => {
  const [course, setCourse] = useState("")
  const [gradeValue, setGradeValue] = useState({name:"Grade",value:0})
  const [creditValue, setcreditValue] = useState(0)
  const [isDisabled, setisDisabled] = useState(true)

  useEffect(() => {
    if(course!=="" && gradeValue.value!==0 && creditValue!==null){
      setisDisabled(false)
    }
    else{
      setisDisabled(true)
    }
  }, [course,gradeValue,creditValue])

  const handelSubmit = ()=>{
    handelAddCourseSubmit(course,gradeValue,creditValue)
    setCourse("")
    setGradeValue({name:"Grade",value:0})
    setcreditValue(0)
    document.getElementById('closeModal').click();
  }

  return (
    <>
      <div className="modal fade" id="addCourseModal" tabIndex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Course
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Course Name
                  </label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={course} onChange={(e)=>setCourse(e.target.value)}/>
                </div>
                <div className="mb-3" style={{display:"flex",justifyContent:"space-around"}}>
                  <input className="form-control-plaintext text-center" style={{width:"50%"}} value={creditValue} onChange={(e)=>setcreditValue(e.target.value>=0?e.target.value:0)} placeholder="Credits" type="number"/>
                  <div className="btn-group">
                      <button type="button"className="btn btn-success dropdown-toggle"data-bs-toggle="dropdown" aria-expanded="false">
                      {gradeValue.name}
                      </button>
                      <ul className="dropdown-menu">
                          {grades.map((grade,i)=>{
                              return <li key={i} className="dropdown-item" onClick={()=>setGradeValue(grade)} style={{ cursor: "pointer" }}>{grade.name}</li>
                          })}
                      </ul>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" id ="closeModal" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" disabled={isDisabled}  className="btn btn-primary" onClick={handelSubmit}>
                Add Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
