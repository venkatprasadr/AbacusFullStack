

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert' 
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { VscTrash,VscNewFile,VscEdit } from "react-icons/vsc";

const AdminInstitution = () =>{
   
    const instituteName = useRef();
    const instituteAddress = useRef();
    const mobile = useRef();
    const email = useRef();

    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allInstitution,setAllInstitution] = useState([]);
     const [showEdit,setShowEdit] = useState(false);
    const [editData,setEditData] = useState();
   

    const getAllInstitute = () =>{
        axios.get("http://localhost:8081/admin/viewInstitute")
        .then((resp)=>{
            setAllInstitution(resp.data);
        })
        .catch((err)=>{
      
            swal({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
              });
        })
    }
    useEffect(()=>{
        getAllInstitute();
    },[])

    const handleAdd = ()=>{
        const instituteNameV = instituteName.current.value;
        const instituteAddressV = instituteAddress.current.value;
        const mobileV = mobile.current.value;
        const emailV = email.current.value;
        const obj = {
            instituteName : instituteNameV,
            instituteAddress : instituteAddressV,
            mobile:mobileV,
            email:emailV
        }
        axios.post("http://localhost:8081/admin/addInstitute",obj)
        .then((res)=>{
            if(res.data=="Institute added"){
                getAllInstitute();
              
                swal({
                    title: "success",
                    text: "Institute Added",
                    icon: "success",
                  });
            }
        })
        .catch((err)=>{
         
            swal({
                title: "Error",
                text: "Something went wrong",
                icon: "error",
              });
        })
       
        setShowAddPopUp(!showAddPopUp) 
    }
    const handleEdit = ()=>{
        console.log(editData);
        setShowEdit(false);
        const obj = {
            instituteName : instituteName.current.value? instituteName.current.value: editData.instituteName  ,
            instituteAddress : instituteAddress.current.value? instituteAddress.current.value: editData.instituteAddress  ,
            mobile : mobile.current.value? mobile.current.value: editData.mobile  ,
            email : email.current.value? email.current.value: editData.email  
          }

          axios.put("http://localhost:8081/admin/editInstitute/"+editData.instituteId,obj)
          .then((resp)=>{
            if(resp.data=="Institute edited"){
               
                swal({
                    title: "Success",
                    text: "institute Edited",
                    icon: "success",
                  });
                getAllInstitute();
           
                     }    
          })
       
    }

    const handleDelete = (data)=>{
            axios.delete("http://localhost:8081/admin/deleteInstitute?instituteId="+data.instituteId)
            .then((resp)=>{
                if(resp.data=="Institute deleted"){
                    getAllInstitute();
                
                    swal({
                        title: "success",
                        text: "Institute deleted",
                        icon: "success"
                      })
                }
                else{
                    
                    swal({
                        title: "success",
                        text: "institute deleted",
                        icon: "success"
                      })
                }
            })
            .catch((err)=>{
                
                swal({
                    title: "error",
                    text: "failed",
                    icon: "error"
                  })
            })

      
    }

    return(
        <>
         <div class = "container  mt-5 ">
            <h2 style={{color:'blue',fontWeight:'bold',fontStyle:'italic'}}>Welcome Admin You can Add Institute Here</h2>
                <button type="button" id="login_btn" class="btn btn-primary " onClick={()=>{setShowAddPopUp(!showAddPopUp)}} > <VscNewFile className='icons'/>Add Institute</button><br/><br/>
            </div>

            {
                showAddPopUp?
                <>
                   

                   <center>
            <div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-photo/atlanta-march-24-tech-tower-260nw-1348284224.jpg" />
        <Card.Body>
          <Card.Title> Add Institute here</Card.Title>
          <Card.Text>
            Admin you can add Institute here
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><input type="text" id="instituteName" ref={instituteName} class="col-3 form-control " placeholder=" Institute Name"/></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="instituteAddress" ref={instituteAddress} class="col-3 form-control " placeholder="Institute Addresss" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="mobile" ref={mobile} class="col-3 form-control " placeholder="Institute Mobile" /></ListGroup.Item>
          <ListGroup.Item><input type="text" id="email" ref={email} class="col-3 form-control " placeholder="Institute email" /></ListGroup.Item>
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

            {
                showEdit?
                <>
                    <center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-photo/atlanta-march-24-tech-tower-260nw-1348284224.jpg" />
        <Card.Body>
          <Card.Title> Edit Institute here</Card.Title>
          <Card.Text>
            Admin you can add Institute here
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item><input type="text" id="instituteName" ref={instituteName} class="col-3 form-control " placeholder=" Institute Name"/></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="instituteAddress" ref={instituteAddress} class="col-3 form-control " placeholder="Institute Addresss" /></ListGroup.Item>
          <ListGroup.Item> <input type="text" id="mobile" ref={mobile} class="col-3 form-control " placeholder="Institute Mobile" /></ListGroup.Item>
          <ListGroup.Item><input type="text" id="email" ref={email} class="col-3 form-control " placeholder="Institute email" /></ListGroup.Item>
        </ListGroup>
        <Card.Body >
        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleEdit}>update</button>&nbsp;&nbsp;&nbsp;
        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEdit(false)}}>close</button><br/>
        </Card.Body>
      </Card>  
      </div> 
                </center>
                </>
                :null
            }   


           

            
                    
                <div class="d-flex flex-row ml-5 mr-5">
            {
                allInstitution && allInstitution.map((value)=>{
       return(
<center>
<div class="m-3 ">
        <Card style={{ width: '18rem',backgroundColor:'grey' }}>
        <Card.Img variant="top" src="https://image.shutterstock.com/image-photo/atlanta-march-24-tech-tower-260nw-1348284224.jpg" />
        <Card.Body>
          <Card.Title>Course Details</Card.Title>
          <Card.Text>
            Below u can see the details of the course
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item> Institute Id : {value.instituteId}</ListGroup.Item>
          <ListGroup.Item>Institute Name : {value.instituteName}</ListGroup.Item>
          <ListGroup.Item> Institute Address : {value.instituteAddress}</ListGroup.Item>
          <ListGroup.Item> Institute Mobile no. : {value.mobile}</ListGroup.Item>
          <ListGroup.Item> Institute email : {value.email}</ListGroup.Item>
          
        </ListGroup>
        <Card.Body>
  
         <VscEdit className="icons"s onClick={()=>{setShowEdit(true);setEditData(value)}}/>&nbsp;&nbsp;
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

export default  AdminInstitution;