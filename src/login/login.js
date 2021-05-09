


import React,{useState} from 'react';

import BackgroundImg from '../commons/images/future-medicine.jpg';

import CaregiverAPI from '../caregiver/api/caregiver-api'
import PatientAPI from '../patient/api/patient-api'


import {Button, Container, Jumbotron,Row,Col,Card} from 'reactstrap';
import Form from "react-bootstrap/Form";

import "./Login.css";

import { Auth } from "aws-amplify";

import { useHistory,BrowserRouter,Route,Switch } from "react-router-dom";



const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();


  function validateForm() {
      return username.length > 0 && password.length > 0;
    }

   function handleSubmit(event) {
      event.preventDefault();
    }
    function login(){}

    async function handleSubmit(event) {
      event.preventDefault();

      try {
        await Auth.signIn(username, password);
        alert("Logged in");
      } catch (e) {
        alert(e.message);
      }
    }

        return( <div className="Login">
                     <Form onSubmit={handleSubmit}>
                       <Form.Group size="lg" controlId="username">
                         <Form.Label>Username</Form.Label>
                         <Form.Control
                           autoFocus
                           type="username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                         />
                       </Form.Group>
                       <Form.Group size="lg" controlId="password">
                         <Form.Label>Password</Form.Label>
                         <Form.Control
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                         />
                       </Form.Group>
                       <Button block size="lg" type="submit" disabled={!validateForm()} onClick={()=>handleSubmit}>
                         Login
                       </Button>
                     </Form>
                   </div>
        )





}