

   import axios from "axios";
   import React, {useState , useEffect} from "react"; 

   import {NavLink , useParams} from "react-router-dom"; 
   import style from "../StudentDashboard.module.css";
    import male from "../../../../images/male.png"
    import female from "../../../../images/female.png"
    import edit from "../../../../images/editicon.png"

function Result() {
    const {id} = useParams();
    const [image,setImage]=useState();
    const [user , setUser] = useState({
        uname:"",
        student_id:"",
        email:"",
        number:"",
        gender:"",
        course:"",
        branch:"",
        institution:""
    });

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
    
        async function getAllusers() {
            let value = await axios.get(`${apiUrl}/user/${id}`); // Use apiUrl here
            setUser(value.data);
        }
        getAllusers();
    }, [id]);
    
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
    
        async function getProfile() {
            let value = await axios.get(`${apiUrl}/user/${id}`); // Use apiUrl here
            if (value.data.gender === "Male") {
                setImage(male);
            } else {
                setImage(female);
            }
        }
        getProfile();
    }, [id]);
    


    return (
        <>
                        
                        <div id={style.profiletitle}>
                            <img src={image}></img>
                        </div>
                        <h1><b>{user.uname}</b></h1>
                        <NavLink exact to={`/StudentDashboard/EditProfile/${id}`}>
                        <p style={{textAlign:"center",marginRight:30}}><img src={edit} style={{width:15,marginRight:10,height:15}}></img> edit my profile</p> </NavLink>
                        <div id={style.tableBoxdetails}>
                  <table style={{borderCollapse:"collapse"}}>
                           <tr>
                             <th id={style.center}>Student Id</th>
                             <td id={style.center}> {user.student_id} </td>
                          </tr>

                           <tr>
                             <th id={style.center}>Contact Email</th>
                             <td id={style.center}> {user.email} </td>
                           </tr>
                           <tr>
                               <th id={style.center}>Contact Number</th>
                               <td id={style.center}> {user.number} </td>
                            </tr>
                            <tr>
                               <th id={style.center}>Gender</th>
                               <td id={style.center}> {user.gender} </td>
                            </tr>
                            <tr>
                               <th id={style.center}>Course</th>
                               <td id={style.center}> {user.course} </td>
                            </tr>
                            <tr>
                               <th id={style.center}>Branch</th>
                               <td id={style.center}> {user.branch} </td>
                            </tr>
                            <tr>
                               <th id={style.center}>Institution</th>
                               <td id={style.center}> {user.institution} </td>
                            </tr>
                           
                      </table>
                  </div>
        </>
    );
}

export default Result;