import React, { useEffect, useState } from "react";
import { eee, grades } from "../content/depts";

const Spi = () => {
    const [data, setdata] = useState(null)
    const [sems, setsems] = useState(0)
    useEffect(() => {
        var url = new URL(window.location.href)
        var sem = url.searchParams.get("sem")
        // var dept = url.searchParams.get("dept")
        setsems(sem)
        setdata(eee[sem-1])
    }, [])

  return (
    <div class="text-center">
      <div class="container my-4" id="FirstSemCard">
        <div class="card">
          <h2 class="card-header">Semester: {sems}</h2>
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th scope="col">Course</th>
                <th scope="col"> Credit</th>
                <th scope="col">Grade</th>
              </tr>
            </thead>
            <tbody class="text-uppercase">
                {data && data.map((course,i)=>{
                    return(
                        <tr key={i}>
                        <td>{course.courseName}</td>
                        <td>{course.credit}</td>
                        <td>
                        <div class="btn-group">
                            <button type="button"class="btn btn-success dropdown-toggle my-2"data-bs-toggle="dropdown" aria-expanded="false">
                            Grade
                            </button>
                            <ul class="dropdown-menu">
                                {grades.map((grade,i)=>{
                                    return <li key={i} class="dropdown-item" style={{ cursor: "pointer" }}>{grade.name}</li>
                                })}
                            </ul>
                        </div>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Spi;
