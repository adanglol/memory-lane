
// import React, {useEffect} from 'react';


// function About(){
//     useEffect(() => {},[])
//     return(<>
//     <h1 className="text-center"style = {{marginTop:3 + "em"}}>About</h1>
//     </>)
// }

// export default About;


import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Assuming you're using React Bootstrap

function About() {
    return (

        <Container className="my-5 about">
            <br />
            <br />
            <h1 className="text-center mt-5 mb-5">About Memory Lane</h1>    
            {/* <br /> */}
            <Row className="justify-content-center mb-5 ">
                <Col md={8} lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>What is Memory Lane?</Card.Title>
                            <Card.Text >
                                Memory Lane is an innovative audio diary app designed to help you capture and reflect on your daily experiences. 
                                With Memory Lane, you can easily record audio entries and keep track of your thoughts and feelings in a safe and secure environment.
                            </Card.Text>
                            <Card.Title>Features:</Card.Title>
                            <ul>
                                <li>Record daily audio entry with ease (1 post a day, 5 min limit).</li>
                                <li>Review and listen to your past recordings.</li>
                                <li>Secure authentication to keep your diary private.</li>
                                <li>Accessible from any device with your login credentials.</li>
                            </ul>
                            <Card.Title>How to Use:</Card.Title>
                            <Card.Text>
                                To get started, simply create an account or log in if you already have one. From your dashboard, you can start recording 
                                new entries, review your past entries, and manage your account settings.
                            </Card.Text>
                            <Card.Text>
                                If you have any questions or need support, please contact us at <a href="mailto:adraging@gmail.com" style = {{'color' : 'black'}}>adraging@gmail.com</a>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
