



import React,{useState, useEffect} from 'react';
import { Navbar,Container,Nav } from 'react-bootstrap';
import  { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ViewAcademy = () =>{
    const [allCourses,setAllCourses] = useState([]);
    const [viewCourse,setViewCourse] = useState(false);

    const navigate = useNavigate()

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
    
   

    return (
        <>
            <Navbar style={{backgroundColor:'yellow'}}>
                    <Container fluid>
                        <Navbar.Brand href="/viewacademy" style={{ color:'black',fontSize:'25px',fontWeight:'bold' }}>Abacus academy<a href="/"></a></Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav>
                            <Nav.Link id="userEnrolledCourse" onClick={()=>{
                                
                                setViewCourse(!viewCourse);
                            }} style={{ paddingLeft: '250px',color:'black',fontSize:'20px',fontWeight:'bold' }}>Enrolled course</Nav.Link> 
                              <Nav.Link id="userAcademy" 
                             style={{ paddingLeft: '250px',color:'black',fontSize:'20px',fontWeight:'bold' }}>Academy</Nav.Link> 
                            <Nav.Link id = "logout" style={{ paddingLeft: '500px',color:'black',fontSize:'20px',fontWeight:'bold' }} onClick={()=>{
                                navigate('/');
                                localStorage.setItem("userEmail","");
                            }}>Logout</Nav.Link> 
                        </Nav>
                         </Navbar.Collapse>
                    </Container>
                </Navbar>
                <h2 style={{color:"blue"}}>Welcome  to Abacus Academy</h2>
                <h3 style={{color:"black"}}>Available Courses you can check here</h3>
             
            
 <>                                
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
          <ListGroup.Item> Course Duration in months : {val.courseDuration}</ListGroup.Item>
          <ListGroup.Item> Course Description : {val.courseDescription}</ListGroup.Item>
          
        </ListGroup>
        <Card.Body>                        
        </Card.Body>
      </Card>  
      </div> 
</center>
       )
    })
}
</div>
                                
                         
</>
           
</>
        
    )
}
export default ViewAcademy;
