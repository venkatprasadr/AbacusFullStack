import userEvent from '@testing-library/user-event';
import React,{useRef} from 'react'
import axios from 'axios';
import  { useNavigate } from 'react-router-dom'
import './Login.css'
import swal from 'sweetalert'
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';

const Signup = ()=>{

    const email = useRef("");
    const password = useRef("");
    const cnfPassword = useRef("");
    const userName = useRef("");
    const mobileNum = useRef("");
    const role = useRef("");
    const navigate = useNavigate();

    const handlesignUp = ()=>{
        
        const emailV = email.current.value;
        const passwordV = password.current.value;
        const roleV = role.current.value;
        const cnfPasswordV = cnfPassword.current.value;
        const mobileNumV = mobileNum.current.value;
        const userNameV = userName.current.value;

        if(roleV=="" || emailV=="" || passwordV=="" || cnfPasswordV=="" ||  mobileNumV=="" || userNameV==""){
         
            swal({
                title: "Info!",
                text: "please fill all the required fields!",
                icon: "info",
              });
            return;
        }
        if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailV))) {
            // alert("email is not valid");
            swal({
                title: "Error",
                text: "email is not valid",
                icon: "error",
              });
            return;
        }
        if(cnfPasswordV!=passwordV){
            // alert("password didn't match");
            swal({
                title: "Error",
                text: "password didn't match",
                icon: "error",
              });
            return;
        }
        const obj = {
            email: emailV,
            password: passwordV,
            userName: userNameV,
            mobileNumber: mobileNumV,
            userRole: roleV
        }
        console.log(obj)
        if(roleV == "USER"){
            axios.post("http://localhost:8081/user/signup",obj)
            .then((resp)=>{
                if(resp.data == "User added"){
                    // alert("user registered");
                    swal({
                        title: "success",
                        text: "user registered",
                        icon: "success"
                      })
                    navigate('/login');
                }
                else{
                    alert("user registration failed:: "+resp.data);
                }
            })
            .catch((err)=>{
                // alert("Something went wrong");
                swal({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error",
                  });
            })
        }
        else{
            axios.post("http://localhost:8081/admin/signup",obj)
            .then((resp)=>{
                if(resp.data == "Admin added"){
                    // alert("admin registered");
                    swal({
                        title: "success",
                        text: "admin registered",
                        icon: "success"
                      })
                    navigate('/login');
                }
                else{
                    alert("admin registration failed:: "+resp.data);
                }
            })
            .catch((err)=>{
                // alert("Something went wrong");
                swal({
                    title: "Error",
                    text: "Something went wrong",
                    icon: "error",
                  });
            })
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
        <center >
            <div  class='d-flex flex-row justify-content-center bg-warning'>
                
                <div  class="col-3 mt-5  mb-5">
                    <h3 className = 'heading'> Register</h3>
                    <select class="form-select" id="user/admin" aria-label="Default select example" ref={role}>
                        <option value="" selected>Admin/User</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select><br/>
                    <input type="text" id="email" ref={email} class="form-control" placeholder="Enter Email Address" /><br/>
                    <input type="text" id="username" ref={userName} class="form-control" placeholder="Enter Username"  /><br/>
                    <input type="text" id="mobileNumber" ref={mobileNum} class="form-control" placeholder="Enter mobileNumber" /><br/>
                    <input type="password" id="password" ref={password} class="form-control" placeholder="Enter password"  /><br/>
                    <input type="password" id="confirmPassword" ref={cnfPassword} class="form-control" placeholder="Enter confirm Password"  /><br/>
                    <button type="button" id="submitButton" class="btn btn-primary" onClick={handlesignUp}>Submit</button><br/>
                    Already a User?
                    <a id="signinLink" href="/login">Login</a>
                </div>
               <div className='main-heading'>
               <h1>Welcome to Abacus Academy</h1>
               <p>Welcome to Abacus Academy. It is Central India's first company in child education givimmg best advance skill development program.</p>
               <p>"Start Learning Abacus, Get Better at Math, and Improve Brain Power"
                Being Good at Math is Skill, not a Natural-Born Talent</p>
               </div>
            </div>
        </center>
       
        </>
    )
}

export default Signup;