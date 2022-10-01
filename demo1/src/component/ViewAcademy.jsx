
import React,{useState, useRef, useEffect} from 'react';
import { Navbar,Container,Nav,Dropdown,Modal,Button,Form,Table,Row,Col } from 'react-bootstrap';
import  { useNavigate } from 'react-router-dom'


const ViewAcademy = () =>{
    const navigate = useNavigate();
   
    
    
    
   

    return (
        <>
            <Navbar style={{backgroundColor:'yellow'}}>
                    <Container fluid>
                        <Navbar.Brand href="#">Abacus academy<a href="/"></a></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                                
                            <Nav.Link id="userAcademy" 
                             style={{ paddingLeft: '250px' }}>Academy</Nav.Link> 
                  
                            <Nav.Link id="userEnrolledCourse" 
                             style={{ paddingLeft: '250px' }}>Enrolled course</Nav.Link> 
                            <Nav.Link id = "logout" style={{ paddingLeft: '500px' }} onClick={()=>{
                                navigate('/');
                                localStorage.setItem("userEmail","");
                            }}>Logout</Nav.Link> 
                        </Nav>
                         </Navbar.Collapse>
                    </Container>
                </Navbar>
            
        </>
    )
}
export default ViewAcademy;
