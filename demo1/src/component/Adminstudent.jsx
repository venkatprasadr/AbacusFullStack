import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col,Tr,Th } from 'react-bootstrap';
import axios from 'axios'; 
import swal from 'sweetalert'
import './Login.css'
import * as Icon from 'react-bootstrap-icons'


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
        {
                showEditPopUp?
                <>
                    <center>
                    <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="studentName" ref={studentName} class="col-3 form-control " placeholder=" Student Name"/><br/>
                        <input type="text" id="studentAddress" ref={studentAddress} class="col-3 form-control " placeholder="Student Address" /><br/>
                        <input type="text" id="studentMobile" ref={studentMobile} class="col-3 form-control " placeholder="Student Mobile" /><br/>
                        <input type="text" id="studentAge" ref={studentAge} class="col-3 form-control " placeholder="Student Age" /><br/>
                        <button type="button" id="login_btn" class="btn btn-secondary" onClick={handleEdit}>Update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-secondary" onClick={()=>{setShowEditPopUp(false)}}>close</button><br/>
                    </div>
                    </center>
                </>
                :null
            }
            {
                showAddPopUp?
                <>
                   <center>
                   <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="studentName" ref={studentName} class="col-3 form-control " placeholder=" Student Name"/><br/>
                        <input type="text" id="studentAddress" ref={studentAddress} class="col-3 form-control " placeholder="Student Address" /><br/>
                        <input type="text" id="studentMobile" ref={studentMobile} class="col-3 form-control " placeholder="Student Mobile" /><br/>
                        <input type="text" id="studentAge" ref={studentAge} class="col-3 form-control " placeholder="Student Age" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                   </center>
                </>
                :null
            }

            <div class = "container col-3 mt-5 ">
                <button type=" button" id="addStudent" class="btn btn-primary" onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add Student</button><br/><br/>
            </div>
            
            <Table style = {{backgroundColor:"lightblue"}}>
                <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>Student Name</th>
                        <th>Student Address</th>
                        <th>Student Mobile</th>
                        <th>Student Age</th>
                        <th>Action</th>
                    </tr>
                </thead><br/>
                <tbody>
                    {
                        allStudents && allStudents.map((val)=>{
                            return(
                                <tr>
                                    <td style={{padding: '10px',border: 'solid 1px gray',}}> {val.studentId}</td>
                                    <td style={{padding: '10px',border: 'solid 1px gray',}}> {val.studentName}</td>
                                    <td style={{padding: '10px',border: 'solid 1px gray',}}> {val.address}</td>
                                    <td style={{padding: '10px',border: 'solid 1px gray',}}> {val.mobile}</td>
                                    <td style={{padding: '10px',border: 'solid 1px gray',}}> {val.age}</td>
                                    <td style={{padding: '10px',border: 'solid 1px gray',}}>
                                    <button type="button" id="login_btn" class="btn btn-info" onClick={()=>{setEditData(val);setShowEditPopUp(true)}}>Edit</button>&nbsp;&nbsp;
                                        <button type="button" id="login_btn" class="btn btn-warning" onClick={()=>{handleDelete(val)}}>Delete</button>
                                       
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        
        </>
    )
}

export default AdminStudent;


