import userEvent from '@testing-library/user-event';
import React,{useRef} from 'react'
import axios from 'axios';
import  { useNavigate } from 'react-router-dom'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import './Login.css'
import swal from 'sweetalert'





const Login = ()=>{

    const email = useRef("");
    const password = useRef("");
    const role = useRef("");
    const navigate = useNavigate();

    const handleLogin = ()=>{
        const emailV = email.current.value;
        const passwordV = password.current.value;
        const roleV = role.current.value;
        if(roleV==""){
            // alert("please choose admin/user")
            swal({
                title: "Info",
                text: "Please choose admin/user!",
                icon: "info"
              })
            return;
        }
        if(emailV==""){
            // alert("please provide email")
            swal({
                title: "Info",
                text: "Please provide email",
                icon: "error"
              })
            return;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailV))) {
            
            swal({
                title: "Error",
                text: "email is not valid",
                icon: "error",
              });
            return;
        }
        if(passwordV==""){
            swal({
                title: "Info",
                text: "Please provide password",
                icon: "error"
              })
            return;
        }
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailV)) {
            const obj = {
                email:emailV,
                password:passwordV
            }
            axios.post("http://localhost:8082/user/login",obj)
            .then((resp)=>{
                if(resp.data){
                    if(roleV==="USER"){
                        localStorage.setItem("userEmail",emailV);
                        // alert("User login success");

                        swal({
                            title: "success",
                            text: "User login success",
                            icon: "success"
                          })
                        navigate('/viewacademy');
                    }else{

                        // alert("Admin login success");
                        swal({
                            title: "success",
                            text: "Admin login success",
                            icon: "success"
                          })
                        navigate('/adminacademy');
                    }
                    
                }
                else{
                    swal({
                        title: "error",
                        text: "Invalid Info",
                        icon: "error"
                      })
                }
            })
        }
        else{
            // alert("email is not valid");
            swal({
                title: "Info",
                text: "email is not valid",
                icon: "error"
              })
            return;
        }
    }

    return(
        <>
        <Navbar style={{backgroundColor:'purple',backgroundSize:'cover'}} >
                <Container >
                    <Navbar.Brand  href="#" style={{color:"yellow",fontWeight:"bold", fontSize:'22px'}}>Abacus academy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        // className="me-auto my-2 my-lg-0"
                        // style={{ maxHeight: '100px' }}
                        // navbarScroll
                    >
                    <Nav.Link id="signup"  style={{color:"yellow",paddingLeft:'100px', fontSize:"20px"}}
                    onClick={()=>{
                                navigate('/Signup')}} >Register</Nav.Link>
                        <Nav.Link id = "logout" style={{color:"Yellow",paddingLeft:'100px', fontSize:"20px"}} onClick={()=>{
                                navigate('/Login');
                                
                            }}>Login</Nav.Link> 
                    </Nav>
                    
                    
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        <center>
            <div class='d-flex flex-row justify-content-center bg-warning'>
                
                <div  class="col-3 mt-5  mb-5">
                    <h3 className = 'heading'> Login</h3>
                    <select class="form-select" id="user/admin" aria-label="Default select example" ref={role}>
                        <option value="" selected>Admin/User</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select><br/>
                    <input type="text" id="email" ref={email} class="form-control" placeholder="Enter Email Address"  /><br/>
                    <input type="password" id="password" ref={password} class="form-control" placeholder="Enter password"  /><br/>
                    
                    <button type="button" id="login_btn" class="btn btn-primary" onClick={handleLogin}>Login</button><br/>
                    New User/Admin? 
                    <a id="signup_btn" href="/signup">SignUp</a>
                </div>
            </div>
</center>
        </>
    )
}

export default Login;