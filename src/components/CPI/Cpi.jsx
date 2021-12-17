import React, { useState,useEffect } from 'react'
import { ece,eee } from '../../content/depts'
import Semester from './Semester'
import useWindowDimensions from "../Utils/useWindowDimensions";
import Popup from '../SPI/Popup';
import Alert from './Alert';

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
    const [addCourseSem, setaddCourseSem] = useState(null)
    const [cpi, setCpi] = useState(0)
    const [error, seterror] = useState(null)
    const [alert, setAlert] = useState(false)

    const { width } = useWindowDimensions();

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
        let checkError =[]
        for (let i = 0; i < data.length; i++) {
            checkError = data[i].filter((ele)=>ele.grade?true:false);
        }
        if(checkError.length===0){
            seterror("Please Choose Grade of at least one Course")
        }else{
            setCpi(CPICalculator(data))
        }
        setAlert(true)
    }

    const handelAddCourseSubmit = (course,gradeValue,creditValue)=>{
        const tempData = [...data];
        let newCourse = {
          courseName:course,
          credit:parseInt(creditValue),
          grade:gradeValue.name
        }

        tempData[addCourseSem-1] = [
            ...tempData[addCourseSem-1],
            newCourse,
        ]
        setdata(tempData)    
    }

    return (
        <>
        <Popup handelAddCourseSubmit={handelAddCourseSubmit}/>
        {alert && <Alert cpi={cpi} setAlert={setAlert} error={error} seterror={seterror}/>}
        <div className={`${width<600?"":"card"}`} >
            <div className={`${width<600?"":"card-body"}`}>
                <div className={`${width<600?"":"row"}`}>
                    {data && data.map((semester,i)=>{
                        return <div key={i} className="col-md-6"><Semester setaddCourseSem={setaddCourseSem} sems = {i+1} courses = {semester} handelGradeChange={handelGradeChange}/> </div> 
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
        </>
    )
}

export default Cpi
