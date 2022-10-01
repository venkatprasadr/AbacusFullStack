

import React, { useEffect, useRef, useState } from 'react'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col,Tr,Th } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert' 

const AdminInstitution = () =>{
   
    const instituteName = useRef();
    const instituteDescription = useRef();
    const instituteAddress = useRef();
    const mobile = useRef();
    const email = useRef();

    const [showAddPopUp,setShowAddPopUp] = useState(false);
    const [allInstitution,setAllInstitution] = useState([]);
     const [showEdit,setShowEdit] = useState(false);
    const [editData,setEditData] = useState();
   

    const getAllInstitute = () =>{
        axios.get("http://localhost:8082/admin/viewInstitute")
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
        const instituteDescriptionV = instituteDescription.current.value;
        const instituteAddressV = instituteAddress.current.value;
        const mobileV = mobile.current.value;
        const emailV = email.current.value;
        const obj = {
            instituteName : instituteNameV,
            instituteDescription : instituteDescriptionV,
            instituteAddress : instituteAddressV,
            mobile:mobileV,
            email:emailV
        }
        axios.post("http://localhost:8082/admin/addInstitute",obj)
        .then((res)=>{
            if(res.data=="Institute added"){
                getAllInstitute();
              
                swal({
                    title: "Error",
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
            instituteDescription : instituteDescription.current.value? instituteDescription.current.value: editData.instituteDescription  ,
            instituteAddress : instituteAddress.current.value? instituteAddress.current.value: editData.instituteAddress  ,
            mobile : mobile.current.value? mobile.current.value: editData.mobile  ,
            email : email.current.value? email.current.value: editData.email  
          }

          axios.put("http://localhost:8082/admin/editInstitute/"+editData.instituteId,obj)
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
            axios.delete("http://localhost:8082/admin/deleteInstitute?instituteId="+data.instituteId)
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

            {
                showAddPopUp?
                <>
                   <center>
                   <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="instituteName" ref={instituteName} class="col-3 form-control " placeholder=" Institute Name"/><br/>
                        <input type="text" id="instituteDescription" ref={instituteDescription} class="col-3 form-control " placeholder="Institute Description" /><br/>
                        <input type="text" id="instituteAddress" ref={instituteAddress} class="col-3 form-control " placeholder="Institute Addresss" /><br/>
                        <input type="text" id="mobile" ref={mobile} class="col-3 form-control " placeholder="Institute Mobile" /><br/>
                        <input type="text" id="email" ref={email} class="col-3 form-control " placeholder="Institute email" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleAdd}>Add</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowAddPopUp(false)}}>close</button><br/>

                    </div>
                   </center>
                </>
                :null
            }

            {
                showEdit?
                <>
                    <div className="bg-container" style={{width:'250px'}}>
                        <input type="text" id="instituteName" ref={instituteName} class="col-3 form-control " placeholder=" Institute Name"/><br/>
                        <input type="text" id="instituteDescription" ref={instituteDescription} class="col-3 form-control " placeholder="Institute Description" /><br/>
                        <input type="text" id="instituteAddress" ref={instituteAddress} class="col-3 form-control " placeholder="Institute Addresss" /><br/>
                        <input type="text" id="mobile" ref={mobile} class="col-3 form-control " placeholder="Institute Mobile" /><br/>
                        <input type="text" id="email" ref={email} class="col-3 form-control " placeholder="Institute email" /><br/>
                        <button type="button" id="login_btn" class="btn btn-primary" onClick={handleEdit}>update</button>&nbsp;&nbsp;&nbsp;
                        <button type="button" id="close_btn" class="btn btn-warning" onClick={()=>{setShowEdit(false)}}>close</button><br/>

                    </div>
                </>
                :null
            }   


            <div class = "container col-3 mt-5 ">
              
                <button type="button" id="login_btn" class="btn btn-primary " onClick={()=>{setShowAddPopUp(!showAddPopUp)}} >Add Institute</button><br/><br/>
            </div>

            <Table style = {{backgroundColor:"lightblue"}}>
                <thead>
                    <tr>
                        <th>Institute Id</th>
                        <th>Institute Name</th>
                        <th>Institute Description</th>
                        <th>Institute Address</th>
                        <th>Institute mobile</th>
                        <th>Institute email</th>
                        <th>Action</th>
                    </tr>
                </thead><br/>
                <tbody>
                    {
                        allInstitution && allInstitution.map((val)=>{
                            return(<tr>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.instituteId}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.instituteName}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.instituteDescription}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.instituteAddress}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.mobile}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>{val.email}</td>
                                <td style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}>
                             <button type="button" id="login_btn" class="btn btn-info" onClick={()=>{setShowEdit(true);setEditData(val)}}>Edit</button>&nbsp;&nbsp;
                                    <button type="button" id="login_btn" class="btn btn-danger" onClick={()=>{handleDelete(val)}}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
                    
        </>
    )
}

export default  AdminInstitution;