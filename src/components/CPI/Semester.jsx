import React from 'react'
import { grades } from '../../content/depts'

const Semester = ({sems ,courses, handelGradeChange}) => {
    return (
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
                {courses && courses.map((course,idx)=>{
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
                                    return <li key={i} onClick={()=>handelGradeChange(sems-1,idx,grade)} className="dropdown-item" style={{ cursor: "pointer" }}>{grade.name}</li>
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
      </div>
    )
}

export default Semester
