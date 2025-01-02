 
   import { useState ,useEffect} from "react";
   import axios from "axios";

   import {NavLink} from "react-router-dom";


    import style from "../SubjectComponent/Subject.module.css";

    function Exam(){

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

     const [exam , setExam] = useState({
       exam_name:"",
       exam_desc:"",
       exam_level:"",
       exam_file:"",
       exam_passMarks:"",
       exam_totalQuestion:"",
       exam_marks:"",
       exam_date: d+" "+t
   });

  function handleInput(e){
       setExam({ 
           ...exam,
           [e.target.name]: e.target.value
       });
       //  console.log(exam);
   }
   function handlecourse(e){
       setExam({ 
           ...exam,
           [e.target.name]: e.target.value
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


      async function deleteExam(id){
       //    console.log(id);
          
           for(let i=0; i<questions.length ;i++)
           {
               if( parseInt( questions[i].exam_id) === parseInt( id )){
                   // console.log(questions[i].id);
                   await axios.delete(`http://localhost:3333/question/${questions[i].id}`);
               } 
           }
           await axios.delete(`http://localhost:3333/exam/${id}`);
           setStatusDeleteExam(true);
      }

      if(status) return <Exam />

      if(statusDeleteExam) return <Exam />

        return (
            <>
               <div id={style.displayHeadingBox}> 
                    <h2>Test List</h2>     
               </div>

                <div id={style.tableBox}>
                    <table >
                          
                              {
                                  exams.map((data ,i) => {
                                      return(
                                        <tr key={i}>
                                           <td><div id={style.title}><h1>{data.exam_name}</h1>
                                            <br></br><p>{data.exam_desc}</p>
                                            </div></td>
                                           <td style={{float:"right"}}>
                                               

                                          <NavLink exact to={`/AdminDashboard/Question/ViewQuestion/${data.id}`}>
                                                 <button style={{width:60,height:80,borderStyle:"hidden"}}>View Question</button>
                                               </NavLink> 
                                                &ensp;&ensp;&ensp;
                                             <NavLink exact to={`/AdminDashboard/Question/AddQuestion/${data.id}`}>
                                                 <button style={{width:60,height:80,border:"none"}}>Add Question</button>
                                               </NavLink> </td>

                                             <td><NavLink exact to={`/AdminDashboard/Question/Details/${data.id}`}>
                                                 <button>Details</button>
                                               </NavLink> <br></br>
                                                <button onClick={() => deleteExam(data.id)}>Delete</button></td>
                                          
                                        </tr>
                                      );
                                  })
                              }
                              
                     </table>
                 </div>

                  <div id={style.addBox} style={display}>   
                     <label htmlFor="">Enter Course Name :</label>&ensp;&nbsp;
                     <input onChange={(e) => handleInput(e)} name="exam_name" type="text" 
                     placeholder="Enter Course Name" /> 

                     <label htmlFor="">Enter Test description :</label>
                     <input onChange={(e) => handleInput(e)} name="exam_desc"  type="text" 
                     placeholder="Enter Course desc" style={{height:60}}/>

                     <label htmlFor="">Enter Test Level </label>&emsp;&emsp;&emsp;
                      <select onChange={(e) => handleInput(e)} name="exam_level" style={{marginTop:15}}>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Difficult">Difficult</option>
                        </select> &emsp;&emsp;
                        <label className="col-3" for="level">Upload File :</label>&nbsp;
                        <input onChange={(e) => handlecourse(e)}  style={{width:"550px"}}  className="col-6 form-control" type="file" name="exam_file" id="level" /><br></br>
                      <label htmlFor="">Total Question :</label>
                      <input onChange={(e) => handleInput(e)} name="exam_totalQuestion" type="number" style={{width:50}}/> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                     <label htmlFor="">Total Marks :</label>
                      <input onChange={(e) => handleInput(e)} name="exam_marks" type="number" style={{width:50}}/> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

                     <label htmlFor="">Pass Marks :</label>
                     <input onChange={(e) => handleInput(e)} name="exam_passMarks" type="number" style={{width:50}}/> 

                      <div id={style.buttonBox}>
                         <button onClick={handleAddNewExam} >Add</button>
                         <button onClick= {handleCloseExam}  >Close</button>
                       </div>
                  </div>
            </>
        );
    }

    export default Exam;