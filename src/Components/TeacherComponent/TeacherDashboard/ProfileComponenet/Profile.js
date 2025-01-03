

   import axios from "axios";
   import React, {useState , useEffect} from "react"; 

   import {NavLink , useParams} from "react-router-dom"; 
   import style from "../TeacherDashboard.module.css";
    import male from "../../../../images/male.png"
    import female from "../../../../images/female.png"
    import edit from "../../../../images/editicon.png"

function Result() {
    const {id} = useParams();
    const [image,setImage]=useState();
    const [user , setUser] = useState({
        uname:"",
        teacher_id:"",
        email:"",
        number:"",
        gender:"",
        department:"",
        institution:""
    });

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";

    useEffect(() => {
        async function getAllusers() {
            let value = await axios.get(`${apiUrl}/user/${id}`); // Use apiUrl here
            setUser(value.data);
        }
        getAllusers();
    }, [id]);
    
    useEffect(() => {
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
                        <h1 style={{textAlign:"center",margin:"auto"}}><b>{user.uname}</b></h1>
                        <NavLink exact to={`/TeacherDashboard/EditProfile/${id}`}>
                        <p style={{textAlign:"center",marginRight:30}}><img src={edit} style={{width:15,marginRight:10,height:15}}></img> edit my profile</p> </NavLink>
                        <div id={style.tableBoxdetails}>
                  <table style={{borderCollapse:"collapse"}}>
                           <tr>
                             <th id={style.center}>Teacher Id</th>
                             <td id={style.center}> {user.teacher_id} </td>
                          </tr>
                          <tr>
                               <th id={style.center}>Designation</th>
                               <td id={style.center}> {user.designation} </td>
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
                               <th id={style.center}>Department</th>
                               <td id={style.center}> {user.department} </td>
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