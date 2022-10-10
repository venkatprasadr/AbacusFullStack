import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'; 
import './Login.css'
import swal from 'sweetalert'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { VscTrash,VscNewFile,VscEdit } from "react-icons/vsc";


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
          <div class = "container  mt-5 ">
            <h2 style={{color:'blue',fontWeight:'bold',fontStyle:'italic'}}>Welcome Admin You can Add Student Here</h2>
                <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} > <VscNewFile className='icons'/>  Add Course</button><br/><br/>
            </div>

        <div >
            {
                showEditPopUP?
                <>
                    <center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://scholarship-positions.com/wp-content/uploads/2020/02/Free-Online-Course-2.jpg" />
        <Card.Body>
          <Card.Title>Edit Course Here</Card.Title>
          <Card.Text>
            Admin you can edit the course here
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/></ListGroup.Item>
          <ListGroup.Item><input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /></ListGroup.Item>
         
          
        </ListGroup>
        <Card.Body >
        <button type="button" id="login_btn" class="btn btn-primary" onClick={()=>{handleEdit()}}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEditPopUP(false)}}>close</button><br/> 
        </Card.Body>
      </Card>  
      </div> 
                    </center>
                </>
                :null
            }

            {
                showAddPopUp?
                <>
                <center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://scholarship-positions.com/wp-content/uploads/2020/02/Free-Online-Course-2.jpg" />
        <Card.Body>
          <Card.Title> Add Course here</Card.Title>
          <Card.Text>
            Admin you can add course here
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><input type="text" id="courseName" ref={courseName} class="col-3 form-control " placeholder=" Course Name"/></ListGroup.Item>
          <ListGroup.Item><input type="text" id="courseDuration" ref={courseDuration} class="col-3 form-control " placeholder="Course Duration" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="courseDescription" ref={courseDescription} class="col-3 form-control " placeholder="Course Description" /></ListGroup.Item>
        </ListGroup>
        <Card.Body >
        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>
        </Card.Body>
      </Card>  
      </div> 
                </center>
                </>
                :null
            }
           
          
            
     <div class="d-flex flex-row ml-5 mr-5">           
{
    allCourses && allCourses.map((val)=>{
       return(
<center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://scholarship-positions.com/wp-content/uploads/2020/02/Free-Online-Course-2.jpg" />
        <Card.Body>
          <Card.Title>Course Details</Card.Title>
          <Card.Text>
            Below u can see the details of the course
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item> CourseId : {val.courseId}</ListGroup.Item>
          <ListGroup.Item> Course Name : {val.courseName}</ListGroup.Item>
          <ListGroup.Item> Course Duration in months: {val.courseDuration}</ListGroup.Item>
          <ListGroup.Item> Course Description : {val.courseDescription}</ListGroup.Item>
          
        </ListGroup>
        <Card.Body >
         <VscEdit className="icons"s onClick={()=>{setShowEditPopUP(true);setEditData(val)}}/>&nbsp;&nbsp;
        <VscTrash className="icons1" onClick={()=>{handleDelete(val)}}/>
        </Card.Body>
      </Card>  
      </div> 
</center>
       )
    })
}
</div>

       
            </div>
        </>
    )
}

export default Admincourse;






