
 
import style from "./Subject.module.css";


 import {useState , useEffect} from "react";

 import axios from "axios";
 import { read, utils, writeFile } from 'xlsx';

 


  
     function Subject()
     {

    //  ---------------------- add Subject & close buttton working  -------------------------------------
        const [display , setDisplay]  = useState({
            display:"none"
        });

         function handleAddSubject()
         {
            setDisplay({display:"block"});
         }

         function handleCloseAdd(){
             setDisplay({display:"none"});
         }
         const [course, setCourse] = useState()


     // --------------- Fetching all subjects from db.json file-------------------------

      const [subjects , setSubjects] = useState([]);

         useEffect(()=>{
            
            async function getAllSubject(){
                let value = await axios.get("http://localhost:3333/subject");
                setSubjects(value.data);
                //  console.log(value.data[0].subject_name);
            }
                getAllSubject();
         },[]);

     // --------------------Adding Subject And re-render subject component-----------------
     var date = new Date();
     var d =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
     var t =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;

      const [subject , setSubject] = useState({
          subject_name:"",desc:"",file:"",subject_date:d+" "+t
      });
      
      function handlecourse(e){
        const file=e.target.files;
        const reader =new FileReader();
        reader.onload = () => {
            setSubject({ 
        ...subject,
        [e.target.name]: file
       });
        }
        }
       

    function handleInput(e){
        setSubject({ 
            ...subject,
            [e.target.name]: e.target.value
        });
        //  console.log(exam);
    }


       async function handleAddNewSubject(){
            await axios.post("http://localhost:3333/subject" , subject);
            setStatus(true);
        }

        const [status , setStatus] = useState();

      

    // ------------------------Deleting Subject and reload component------------------------------

       async function deleteSubject(id){
          await axios.delete(`http://localhost:3333/subject/${id}`);
          setStatusDelete(true);
       }

       const [statusDelete , setStatusDelete] = useState();
      
       
        if(statusDelete) return <Subject />;

        if(status) return <Subject />;

        // -------------------------------------------------------

        if(subjects.length === 0) return(
                             <>
                                <div id={style.content}>

                                        <div id={style.displayHeadingBox}> 
                                              <h2>No Course Available</h2>     
                                         </div>

                                       <div id={style.addSubjectBox}>
                                           <button onClick={handleAddSubject}>Add Course</button>
                                       </div>

                                        {/* Add Subject */}


                                        <div id={style.addBox} style={display} >   
                                           <label htmlFor="">Course name :</label> 
                       <input onChange={(e) => handleInput(e)}  type="text" name="subject_name" placeholder="Enter Course name" required /> 
                       <label htmlFor="">Description :</label> &nbsp;
                       <input onChange={(e) => handleInput(e)} type="textbox" name="desc" style={{height:75}} placeholder="Enter Description" /> 
                       <div className="d-flex mt-2" >
                        <label className="col-3" for="level">Upload File :</label>&nbsp;
                        <input   style={{width:"500px"}}  className="col-6 form-control" type="file" name="file" id="level" />
                        </div>

                                          <div id={style.buttonBox}>
                                              <button onClick={handleAddNewSubject}  >Add</button>
                                               <button onClick={handleCloseAdd} >Close</button>
                                          </div>
                                   </div>
 
</div>
                             </>
         );
                
         return(
             <>
            
            <div id={style.content}>

                  <div id={style.displayHeadingBox}> 
                      <h2>Courses List</h2>     
                      <div id={style.addSubjectBox}>
                       <button onClick={handleAddSubject}>Add Course</button>
                   </div>
                 </div>
                 <div id={style.addBox} style={display} >   
                       <label htmlFor="">Course name :</label> 
                       <input onChange={(e) => handleInput(e)}  type="text" name="subject_name" placeholder="Enter Course name" required /> 
                       <label htmlFor="">Description :</label> &nbsp;
                       <input onChange={(e) => handleInput(e)} type="textbox" name="desc" style={{height:75}} placeholder="Enter Description" /> 
                       <div className="d-flex mt-2" >
                        <label className="col-3" for="level">Upload File :</label>&nbsp;
                        <input onChange={(e) => handlecourse(e)}  style={{width:"600px"}}  className="col-6 form-control" type="file" name="file" id="level" />
                        </div>
                       <div id={style.buttonBox}>
                          <button onClick={handleAddNewSubject}  >Save</button>
                          <button onClick={handleCloseAdd} >Back</button>
                        </div>
                   </div>
                 <div id={style.tableBox}>
                     <table>
                             {
                                 subjects.map((data , i) => {
                                    return(
                                        <tr key={i}>
                                           <td> <div id={style.title}><h1>{data.subject_name}</h1>
                                            <br></br><p>{data.desc}</p>
                                            </div>
                                            </td>
                 <td><button onClick={ () => deleteSubject(data.id) }>Delete</button></td>
                                       </tr>
                                    );
                                   
                                 })
                             }
                            
                     </table>
                  </div>

                  

                   {/* Add Subject */}

                
                   
                   
            </div>



                 
             </>
         );
     }

     export default Subject;