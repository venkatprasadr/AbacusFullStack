import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'; 
import swal from 'sweetalert'
import './Login.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { VscTrash,VscNewFile,VscEdit } from "react-icons/vsc";



const AdminStudent = () =>{
   
    const studentName = useRef();
    const studentAddress = useRef();
    const studentMobile = useRef();
    const studentAge = useRef();
    
    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allStudents,setAllStudents] = useState([]);
    const [showEditPopUp,setShowEditPopUp]= useState(false);
    const [editData,setEditData] = useState();
   

    const getAllStudents = () =>{
        axios.get("http://localhost:8081/admin/viewStudent")
        .then((resp)=>{
            setAllStudents(resp.data);
        })
        .catch((err)=>{
            alert("couldn't get response");
        })
      
    }
    useEffect(()=>{
        getAllStudents();
    },[])
    
    const handleAdd = ()=>{
        const studentNameV = studentName.current.value;
        const studentAddressV = studentAddress.current.value;
        const studentMobileV = studentMobile.current.value;
        const studentAgeV = studentAge.current.value;
        const obj = {
            studentName : studentNameV,
            address : studentAddressV,
            mobile:studentMobileV,
            age:studentAgeV
        }
        axios.post("http://localhost:8081/admin/addStudent",obj)
        .then((res)=>{
            if(res.data=="Student added"){
             
                swal({
                    title: "success",
                    text: "Student Added",
                    icon: "success"
                  })
            }
        })
        .catch((err)=>{
            
            swal({
                title: "error",
                text: "couldn't add student",
                icon: "error"
              })
        })
      
        setShowAddPopUp(!showAddPopUp) 
    }

   
    const handleEdit = ()=>{
   
        setShowEditPopUp(false);
        const obj = {
            studentName : studentName.current.values ? studentName.current.values : editData.studentName, 
            address : studentAddress.current.values ? studentAddress.current.values : editData.address, 
            mobile : studentMobile.current.values ?studentMobile.current.values : editData.mobile, 
            age : studentAge.current.values ? studentAge.current.values : editData.age
          }
        axios.put("http://localhost:8081/admin/editStudent/"+editData.studentId,obj)
        .then((resp)=>{
            if(resp.data=="Student edited"){
                
                getAllStudents();
                swal({
                    title: "success",
                    text: "updated",
                    icon: "success"
                  })
            }
        })
        .catch((err)=>{
            
            swal({
                title: "error",
                text: "error",
                icon: "error"
              })
        })

    }

    const handleDelete = (data)=>{ 
            axios.delete("http://localhost:8081/admin/deleteStudent?studentId="+data.studentId)
            .then((resp)=>{
                if(resp.data=="Student deleted"){
                  
                    swal({
                        title: "success",
                        text: "student deleted",
                        icon: "success"
                      })
                }
                else{
             
                    swal({
                        title: "error",
                        text: "student not deleted",
                        icon: "error"
                      })
                }
            })
            .catch((err)=>{
               
                swal({
                    title: "error",
                    text: "couldn't delete student",
                    icon: "error"
                  })
            })
      
    }
    
    return (
        <>

<div class = "container  mt-5 ">
                <h2 style={{color:'blue',fontWeight:'bold',fontStyle:'italic'}}>Welcome Admin You can Add Student Here</h2>
                <button type=" button" id="addStudent" class="btn btn-primary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}}> <VscNewFile className='icons'/> Add Student</button><br/><br/>
            </div>
        {
                showEditPopUp?
                <>
                    <center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNL_8pjNhr6baJnzC5XuMBl3HWBB3zOKWMvkcttCpfhtekH_u2luJxjz8RHBx-eKCUcjc&usqp=CAU" />
        <Card.Body>
          <Card.Title>Edit Course Here</Card.Title>
          <Card.Text>
            Admin you can edit the course here
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><input type="text" id="studentName" ref={studentName} class="col-3 form-control " placeholder=" Student Name"/></ListGroup.Item>
          <ListGroup.Item><input type="text" id="studentAddress" ref={studentAddress} class="col-3 form-control " placeholder="Student Address" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="studentMobile" ref={studentMobile} class="col-3 form-control " placeholder="Student Mobile" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="studentAge" ref={studentAge} class="col-3 form-control " placeholder="Student Age" /></ListGroup.Item>
          
        </ListGroup>
        <Card.Body >
        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleEdit}>Update</button>&nbsp;&nbsp;&nbsp;
        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEditPopUp(false)}}>close</button><br/>
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
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNL_8pjNhr6baJnzC5XuMBl3HWBB3zOKWMvkcttCpfhtekH_u2luJxjz8RHBx-eKCUcjc&usqp=CAU" />
        <Card.Body>
          <Card.Title>Edit Course Here</Card.Title>
          <Card.Text>
            Admin you can edit the course here
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><input type="text" id="studentName" ref={studentName} class="col-3 form-control " placeholder=" Student Name"/></ListGroup.Item>
          <ListGroup.Item><input type="text" id="studentAddress" ref={studentAddress} class="col-3 form-control " placeholder="Student Address" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="studentMobile" ref={studentMobile} class="col-3 form-control " placeholder="Student Mobile" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="studentAge" ref={studentAge} class="col-3 form-control " placeholder="Student Age" /></ListGroup.Item>
          
        </ListGroup>
        <Card.Body >
        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button>
        </Card.Body>
      </Card>  
      </div> 
                    </center>
                </>
                :null
            }

           
            

            <div class="d-flex flex-row ml-5 mr-5">           
{
    allStudents && allStudents.map((value)=>{
       return(
<center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNL_8pjNhr6baJnzC5XuMBl3HWBB3zOKWMvkcttCpfhtekH_u2luJxjz8RHBx-eKCUcjc&usqp=CAU" />
        <Card.Body>
          <Card.Title>Student Details</Card.Title>
          <Card.Text>
            Below u can see the details of the Student
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Student Id : {value.studentId}</ListGroup.Item>
          <ListGroup.Item> Student Name :{value.studentName}</ListGroup.Item>
          <ListGroup.Item> Student Mobile no. : {value.mobile}</ListGroup.Item>
          <ListGroup.Item> Student Address : {value.address}</ListGroup.Item>
          <ListGroup.Item> Student age : {value.age}</ListGroup.Item>
          
        </ListGroup>
        <Card.Body>
        <VscEdit className="icons"s onClick={()=>{setEditData(value);setShowEditPopUp(true)}}/>&nbsp;&nbsp;
        <VscTrash className="icons1" onClick={()=>{handleDelete(value)}}/>                    
        </Card.Body>
      </Card>  
      </div> 
</center>
       )
    })
}
</div>
        
        </>
    )
}

export default AdminStudent;


