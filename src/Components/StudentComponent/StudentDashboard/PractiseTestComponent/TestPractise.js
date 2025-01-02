
   
   import style from "../StudentDashboard.module.css";

   import axios from "axios";

   import React, { useState, useEffect } from "react";
   import { useHistory, useParams } from "react-router-dom";
   import { read, utils, writeFile } from 'xlsx';
   

   function Subject(){
    let { id } = useParams();
    const [showanswer,setShowanswer]=useState();
    
    function onRadioButtonChange(e){
    let ans=e.target.value;
    var pieces=ans.split("@#$%");
    var element=document.getElementById(pieces[2]);
    if(pieces[0]===pieces[1]){ 
        element.innerHTML="     CORRECT ANSWER";
    }
    else{
        element.innerHTML="";
    }
    }
    let count = 0;

    async function submitTest()
    {history.push(`/StudentDashboard/Practise/${id}`);
    }

     let history = useHistory();

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
    
        async function getAllusers() {
            let value = await axios.get(`${apiUrl}/subject/${id}`); // Use apiUrl here
    
            const wb = read(value.data.file);
            const sheets = wb.SheetNames;
    
            if (sheets.length) {
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                setMovies(rows);
            }
        }
        getAllusers();
    }, [id]);
    



     const handleImport = ($event) => {
        fetch('Book1.xl')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Do something with the data
        })
        .catch(error => {
          console.error(error);
          // Handle the error
        });
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setMovies(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const handleExport = () => {
        const headings = [[
            'Movie',
            'Category',
            'Director',
            'Rating'
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, movies, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'Movie Report.xlsx');
    }
    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile">Choose file</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button onClick={handleExport} className="btn btn-primary float-right">
                                Export <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id={style.displayBoxQuestionHeadingBox}>
                <h1>Answer all the questions</h1>
            </div>
            {
                 
                movies.map((data , i) => {
                    return (
                        <div id={style.displayBoxQuestionBox} key={i}>
                        <table>
                            <tr><span>{data.Column1}</span></tr>
                            <tr> <input onChange={(e) => onRadioButtonChange(e)} value={data.Column6+"@#$%a"+"@#$%"+i}
                            id={style.option1} name={"answer"+count}   type="radio" />  
                            <label htmlFor="option1">{data.Column2}</label>
                            </tr>
                            <tr><input onChange={(e) => onRadioButtonChange(e)} value={data.Column6+"@#$%b"+"@#$%"+i}
                            id={style.option1} name={"answer"+count} type="radio" /> 
                            <label htmlFor="option2">{data.Column3}</label>
                            </tr>
                            <tr><input onChange={(e) => onRadioButtonChange(e)} value={data.Column6+"@#$%c"+"@#$%"+i}
                            id={style.option1} name={"answer"+count}  type="radio" /> 
                            <label htmlFor="option3">{data.Column4}</label>
                            </tr>
                            <tr><input onChange={(e) => onRadioButtonChange(e)} value={data.Column6+"@#$%d"+"@#$%"+i}
                            id={style.option1} name={"answer"+count}  type="radio" /> 
                            <label htmlFor="option4">{data.Column5}</label></tr>
                            <tr style={{backgroundColor:"green",marginLeft:30,color:"white"}}><span id={i}></span></tr>
                            </table>
                        </div>

                    );
                  
                  return <React.Fragment key={i}></React.Fragment>
                })
            }
            <div id={style.submitExam}><button onClick={submitTest}>Finish</button></div>
        
        </>

    );
   }

  export default Subject;