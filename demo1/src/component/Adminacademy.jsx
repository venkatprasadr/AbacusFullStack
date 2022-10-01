import React,{useState} from 'react';
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import Admincourse from "./Admincourse";
import AdminStudent from "./Adminstudent";
import AdminInstitution from "./Admininstitution" ;
import './Login.css'
import  { useNavigate } from 'react-router-dom'

const Adminacademy = () =>{
    const [viewCourse,setViewCourse] = useState(true);
    const [viewStudent,setViewStudent] = useState(false);
    const [viewInstitute,setViewInstitute] = useState(false);
    const navigate = useNavigate();
    
    return(
        <>
        <div style={{backgroundColor:'yellow'}}>
            <Navbar  >
                <Container >
                    <Navbar.Brand  href="#" style={{color:"black", fontWeight:"bold", fontSize:'22px'}}>Abacus academy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        // className="me-auto my-2 my-lg-0"
                        // style={{ maxHeight: '100px' }}
                        // navbarScroll
                    >
                        <Nav.Link id="userAcademy"  style={{color:"black",paddingLeft:'100px', fontSize:"20px"}} onClick={()=>{
                            setViewInstitute(!viewInstitute);
                            setViewStudent(false);
                            setViewCourse(false);
                        }}>Institute</Nav.Link> 
                        <Nav.Link id="userAcademy" style={{color:"black",paddingLeft:'100px', fontSize:"20px"}}  onClick={()=>{
                            setViewCourse(!viewCourse);
                            setViewStudent(false);
                            setViewInstitute(false);
                        }}>Course</Nav.Link> 
                        <Nav.Link id="userEnrolledCourse" style={{color:"black",paddingLeft:'100px', fontSize:"20px"}} onClick={()=>{
                            setViewCourse(false);
                            setViewStudent(!viewStudent);
                            setViewInstitute(false);
                        }} >Student</Nav.Link> 
                        <Nav.Link id = "logout" style={{color:"black",paddingLeft:'500px', fontSize:"20px"}} onClick={()=>{
                                navigate('/');
                                localStorage.setItem("userEmail","");
                            }}>Logout</Nav.Link> 
                    </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
            </div> 
            {
                viewCourse ?
                <>
                    <Admincourse />
                </>:
                null
            }
            {
                viewStudent?
                <AdminStudent/>
                :null
            }
            {
                viewInstitute?
                <AdminInstitution/>
                :null
            }
             
        </>
    )
}

export default Adminacademy;