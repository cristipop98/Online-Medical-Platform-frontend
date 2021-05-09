import React from 'react';
import validate from "./validators/caregiver-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/caregiver-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

import axios from 'axios';


class CaregiverFormDelete extends React.Component{

 constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                            id: {
                                value: '',
                                placeholder: 'Enter caregiver ID',
                                valid: false,
                                touched: false,
                                validationRules: {
                                    minLength: 1,
                                    isRequired: true
                                }
                            },



}

};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}
        toggleForm() {
         this.setState({collapseForm: !this.state.collapseForm});
    }

     handleChange = event => {

            const name = event.target.name;
            const value = event.target.value;

            const updatedControls = this.state.formControls;

            const updatedFormElement = updatedControls[name];

            updatedFormElement.value = value;
            updatedFormElement.touched = true;
            updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
            updatedControls[name] = updatedFormElement;

            let formIsValid = true;
            for (let updatedFormElementName in updatedControls) {
                formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
            }

            this.setState({
                formControls: updatedControls,
                formIsValid: formIsValid
            });

        };

        delCaregiver(id) {
                return API_USERS.deleteCaregiver(id, (result, status, error) => {
                    if (result !== null && (status === 200 || status === 201)) {
                        console.log("Successfully deleted caregiver with id: " + result);
                        this.reloadHandler();

                    } else {
                        this.setState(({
                                                    errorStatus: status,
                                                    error: error
                                                }));
                    }
                });
            }
       handleSubmit() {

              //this.state.formControls.id.value;
             //console.log(id);
              //API_USERS.deletePatient(id);
              this.delCaregiver( this.state.formControls.id.value);
          }


       render() {
              return (
                  <div>

                       <FormGroup id='id'>
                                                <Label for='idField'> ID: </Label>
                                                <Input name='id' id='idField' placeholder={this.state.formControls.id.placeholder}
                                                       onChange={this.handleChange}
                                                       defaultValue={this.state.formControls.id.value}
                                                       touched={this.state.formControls.id.touched? 1 : 0}
                                                       valid={this.state.formControls.id.valid}
                                                       required
                                                />
                                                {this.state.formControls.id.touched && !this.state.formControls.id.valid &&
                                                <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                                            </FormGroup>

                          <Row>
                              <Col sm={{size: '4', offset: 8}}>
                                  <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                              </Col>
                          </Row>

                      {
                          this.state.errorStatus > 0 &&
                          <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                      }
                  </div>
              ) ;
          }
}

export default CaregiverFormDelete;