 
   import { useState ,useEffect} from "react";
   import axios from "axios";

   import {NavLink,useParams} from "react-router-dom";


    import style from "../SubjectComponent/Subject.module.css";

    function Exam(){
    const {id} = useParams();

//  ---------------------- add Exam & close buttton working  -------------------------------------
        const [display , setDisplay]  = useState({
            display:"none"
        });

         function handleAddExam()
         {
            setDisplay({display:"block"});
         }

         function handleCloseExam(){
             setDisplay({display:"none"});
         }
         

// --------------- Fetching all Exam from db.json file-------------------------

      const [exams , setExams] = useState([]);

      useEffect(()=>{
         
         async function getAllExam(){
             let value = await axios.get("http://localhost:3333/Exam");
             setExams(value.data);
            //  console.log(exams);
         }
             getAllExam();
      },[]);


// --------------------Adding Exam And re-render Exam component-----------------

     var date = new Date();
     var d =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
     var t =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;

     var date = new Date();
     var sd =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
     var st =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;

      const [exam , setExam] = useState({
        exam_name:"",
        exam_desc:"",
        exam_level:"Easy",
        exam_file:"",
        exam_passMarks:"",
        exam_totalQuestion:"",
        exam_marks:"",
        exam_begin:"",
        time_begin:"",
        exam_ends:"",
        time_ends:""
    });

   function handleInput(e){
        setExam({ 
            ...exam,
            [e.target.name]: e.target.value
        });
        //  console.log(exam);
    }
    function handlecourse(e){
        var file=e.target.files[0];
        setExam({ 
            ...exam,
            [e.target.name]: file.name
        });
        //  console.log(exam);
    }
    async function handleAddNewExam(){
        await axios.post("http://localhost:3333/Exam" , exam);
        setStatus(true);
    }

    const [status , setStatus] = useState();


    // ----------------------------Deleting Exam-----------------------------------------------

       const [questions , setQuestions] = useState([]);

       useEffect(() => {
           async function getAllQuestions(){
               let value = await axios.get("http://localhost:3333/question");
               setQuestions(value.data);
            }
            getAllQuestions();
       },[])


       const [statusDeleteExam , setStatusDeleteExam] = useState();


       async function deleteExam(idd){
        //    console.log(id);
           
            for(let i=0; i<questions.length ;i++)
            {
                if( parseInt( questions[i].exam_id) === parseInt( idd )){
                    // console.log(questions[i].id);
                    await axios.delete(`http://localhost:3333/question/${questions[i].id}`);
                } 
            }
            await axios.delete(`http://localhost:3333/exam/${idd}`);
            setStatusDeleteExam(true);
       }

      if(status) return <Exam />

      if(statusDeleteExam) return <Exam />

        return (
            <>
               <div id={style.displayHeadingBox}> 
                    <h2>Test List</h2>   
                    <div id={style.addSubjectBox}>
                      <button onClick={handleAddExam}>+ Create New Test</button>
                 </div>  
               </div>
               <div id={style.addBox} style={display}>   
                   <label style={{Align:"center"}}><u><b>Create Your Test</b></u></label><br></br>
                     <label htmlFor="">Enter Course Name :</label>&ensp;&nbsp;
                     <input onChange={(e) => handleInput(e)} name="exam_name" type="text" 
                     placeholder="Enter Course Name" /> 
                    <br></br>
                     <label htmlFor="">Enter Test description :</label>
                     <input onChange={(e) => handleInput(e)} name="exam_desc"  type="text" 
                     placeholder="Enter Course desc" style={{height:60}}/>
                    <br></br>
                     <label htmlFor="">Enter Test Level </label>&emsp;&emsp;&emsp;
                      <select onChange={(e) => handleInput(e)} name="exam_level" style={{marginTop:15}}>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Difficult">Difficult</option>
                        </select> &emsp;&emsp;
                        <label className="col-3" for="level">Upload File :</label>&nbsp;
                        <input onChange={(e) => handlecourse(e)}  style={{width:"340px"}}  className="col-6 form-control" type="file" name="exam_file" id="level" /><br></br>
                      <label htmlFor="">Total No of Question :</label>
                      <input onChange={(e) => handleInput(e)} name="exam_totalQuestion" type="number" style={{width:50}}/> &emsp;&emsp;&emsp;

                     <label htmlFor="">Total Marks :</label>
                      <input onChange={(e) => handleInput(e)} name="exam_marks" type="number" style={{width:50}}/> &emsp;&emsp;&emsp;

                     <label htmlFor="">Pass Marks :</label>
                     <input onChange={(e) => handleInput(e)} name="exam_passMarks" type="number" style={{width:50}}/> &emsp;&emsp;&ensp;
                     <br></br><label htmlFor="">Begin:</label>
                     <input onChange={(e) => handleInput(e)} name="exam_begin" type="date" style={{width:130}}/>&nbsp;
                     <input onChange={(e) => handleInput(e)} name="time_begin" type="time" style={{width:130}}/>&ensp;&ensp;
                     <label htmlFor="">End:</label>
                     <input onChange={(e) => handleInput(e)} name="exam_ends" type="date" style={{width:130}}/>&nbsp;
                     <input onChange={(e) => handleInput(e)} name="time_ends" type="time" style={{width:130}}/>
                      <div id={style.buttonBox}>
                         <button onClick={handleAddNewExam} >Add</button>
                         <button onClick= {handleCloseExam}  >Close</button>
                       </div>
                  </div>
                <div id={style.tableBox}>
                    <table>
                        
                        
                              {
                                  exams.map((data ,i) => {
                                      return(
                                        <tr key={i}>
                                            <td>
                                            <div id={style.title}><h1>{data.exam_name}</h1>
                                            <br></br><p>{data.exam_desc}</p>
                                            </div>
                                            </td>
                                            <td>
                                           <p>Starts from : {data.exam_begin} {data.time_begin}</p><br></br>
                                           <p>Ends at &ensp;&ensp;&ensp;: {data.exam_ends} {data.time_ends}</p>
                                            </td>
                                            <td><NavLink exact to={`/TeacherDashboard/Exam/Details/${data.id}`}>
                                                 <button>Details</button> <br></br>
                                               </NavLink> 
                                             <button onClick={() => deleteExam(data.id)}>Delete</button></td>
                                               
                                        </tr>
                                      );
                                  })
                              }
                              
                     </table>
                 </div>

                 

                  
            </>
        );
    }

    export default Exam;