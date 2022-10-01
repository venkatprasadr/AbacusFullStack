import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import axios from 'axios'; 
import './Login.css'
import swal from 'sweetalert'


const Admincourse = () =>{
    
    const courseName = useRef();
    const courseDuration = useRef();
    const courseDescription = useRef();
    
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allCourses,setAllCourses] = useState([]);
    const [showEditPopUP,setShowEditPopUP] = useState(false);
    const[editData,setEditData] = useState([]);
    

    const getAllCourses = () =>{
        axios.get("http://localhost:8081/admin/viewCourse")
        .then((resp)=>{
            setAllCourses(resp.data);
        })
        .catch((err)=>{
            alert("couldn't get course");
        })
      
    }
    useEffect(()=>{
        getAllCourses();
    },[])
    // const handleSearch = ()=>{
    //     axios.get("http://localhost:8081/admin/getCourse?courseId"+searchInput.current.value)
    //     .then((resp)=>{
    //             if(resp.data){
    //                 setAllCourses([resp.data]);
    //             }
    //             else{
                    
    //                 alert("courses not found");
    //             }
    //     })
    // }
    const handleAdd = ()=>{
        console.log("here")
        const courseNameV = courseName.current.value;
        const courseDurationV = parseInt(courseDuration.current.value);
        const courseDescriptionV = courseDescription.current.value;
        const obj = {
            courseName : courseNameV,
            courseDuration : courseDurationV,
            courseDescription : courseDescriptionV
        }
        axios.post("http://localhost:8081/admin/addCourse",obj)
        .then((res)=>{
            if(res.data=="Course added"){
                getAllCourses();
                swal({
                    title: "success",
                    text: "Course Added",
                    icon: "success"
                  })
            }
        })
        .catch((err)=>{

            swal({
                title: "Error",
                text: "couldn't add course",
                icon: "error",
              });
        })
      
        setShowAddPopUp(!showAddPopUp) 
    }

    const handleEdit = ()=>{
        setShowEditPopUP(false)
        const obj = {
            courseName : courseName.current.value? courseName.current.value : editData.courseName,
            courseDescription : courseDescription.current.value ? courseDescription.current.value : editData.courseDescription,
            courseDuration : courseDuration.current.value ? courseDuration.current.value : editData.courseDuration
          }
          axios.put("http://localhost:8081/admin/editCourse/"+editData.courseId,obj)
          .then((resp)=>{
            if(resp.data=="Course edited"){
               
                swal({
                    title: "success",
                    text: "course edited",
                    icon: "success"
                  })
                getAllCourses();
            }
            else{
                alert("failed");
                swal({
                    title: "error",
                    text: "failed",
                    icon: "error"
                  })
            }
          })
     
    }

    const handleDelete = (data)=>{ 
            axios.delete("http://localhost:8081/admin/deleteCourse?courseId="+data.courseId)
            .then((resp)=>{
                if(resp.data=="Course deleted"){
                    getAllCourses();
                
                    swal({
                        title: "success",
                        text: "course deleted",
                        icon: "success"
                      })
                }
                else{
                
                    swal({
                        title: "success",
                        text: "course not deleted",
                        icon: "success"
                      })
                }
            })
            .catch((err)=>{
                swal({
                    title: "Error",
                    text: "couldn't delete course",
                    icon: "error",
                  });
            })
    }
    
    return (
        < >
        <div >
            {
                showEditPopUP?
                <>
                    <center>
                    <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{handleEdit()}}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEditPopUP(false)}}>close</button><br/>

                    </div>
                    </center>
                </>
                :null
            }

            {
                showAddPopUp?
                <>
                   <center>
                   <div class="bg-container" style={{width:'250px'}}>
                        <input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/><br/>
                        <input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /><br/>
                        <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                   </center>
                </>
                :null
            }
           
            <div class = "container col-5 mt-5 ">
                <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add Course</button><br/><br/>
            </div>
            

            <Table style = {{backgroundColor:"lightBlue"}} >
                <thead>
                    <tr>
                        <th>Course Id</th>
                        <th>Course Name</th>
                        <th>Course Duration in Months</th>
                        <th>Course Description</th>
                        <th>Action</th>
                    </tr>
                </thead><br/>
                <tbody>
                    {
                         allCourses && allCourses.map((val)=>{
                            return(<tr>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseId}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseName}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseDuration}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.courseDescription}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>
                                    <button type="button" id="login_btn" class="btn btn-info" onClick={()=>{setShowEditPopUP(true);setEditData(val)}}>Edit</button>&nbsp;&nbsp;
                                    
                                    <button type="button" id="login_btn" class="btn btn-danger" onClick={()=>{handleDelete(val)}}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default Admincourse;