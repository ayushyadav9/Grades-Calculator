import React, { useState,useEffect } from 'react'
import { ece,eee } from '../../content/depts'
import Semester from './Semester'

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
  
  const CPICalculator = (data)=>{
    let ans = 0;
    let tc = 0;
    for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].length;j++){
            ans += data[i][j].credit*(data[i][j].grade?gradeMultiplier(data[i][j].grade):0)
            tc += data[i][j].credit
        }
    }
    return (ans/tc).toFixed(2);
  }

const Cpi = () => {
    const [data, setdata] = useState(null)

    useEffect(() => {
        var url = new URL(window.location.href)
        var sem = url.searchParams.get("sem")
        var dept = url.searchParams.get("dept")
        if(dept==="EEE"){
            setdata(eee.slice(0,sem))
        }else if(dept==="ECE"){
            setdata(ece.slice(0,sem))
        }
    }, [])

    const handelGradeChange = (sems, idx, grade)=>{
        const tempData = [...data];
        tempData[sems][idx] = { 
            ...tempData[sems][idx],
            grade: grade.name,
        }
        setdata(tempData)
    }
    
    const handelCalculateCPI = () =>{
        console.log(CPICalculator(data))
    }

    return (
        <div className="card" >
            <div className="card-body">
                <div className="row">
                    {data && data.map((semester,i)=>{
                        return <div key={i} className="col-md-6"><Semester sems = {i+1} courses = {semester} handelGradeChange={handelGradeChange}/> </div> 
                    })} 
                </div>   
            </div>
            <div className="container" id="btn_cal">
        <div className="row my-4">
          <div className="col-6"><button className="btn btn-success" id="btn_CPI" onClick={handelCalculateCPI}>Calculate CPI</button></div>
          <div className="col-6"><button id="calculateagain_btn" className="btn btn-danger">Calculate Again</button></div>
        </div>
      </div>
        </div>
    )
}

export default Cpi
