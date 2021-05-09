import React from 'react';
import validate from "./validators/patient-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/patient-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class PatientFormUpdate extends React.Component{

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
                                placeholder: 'Enter patient ID',
                                valid: false,
                                touched: false,
                                validationRules: {
                                minLength: 16,
                                isRequired: true
                                 }
                              },
                            name: {
                                value: '',
                                placeholder: 'What is your name?...',
                                valid: false,
                                touched: false,
                                validationRules: {
                                    minLength: 3,
                                    isRequired: true
                                }
                            },

                             birthDate: {
                                                            value: '',
                                                            placeholder: 'birthDate...',
                                                            valid: false,
                                                            touched: false,
                                                            validationRules: {
                                                                minLength: 3,
                                                                isRequired: true
                                                            }
                                                        },

                              gender: {
                                 value: '',
                                 placeholder: 'Gender...',
                                 valid: false,
                                 touched: false,
                                 validationRules: {
                                  minLength: 3,
                                  isRequired: true
                                               }
                                       },
                               address: {
                                                  value: '',
                                                  placeholder: 'Cluj, Zorilor, Str. Lalelelor 21...',
                                                  valid: false,
                                                  touched: false,
                                              },
                                medicalRecord: {
                                                               value: '',
                                                               placeholder: 'MedicalRecord...',
                                                               valid: false,
                                                               touched: false,
                                                               validationRules: {
                                                                   minLength: 3,
                                                                   isRequired: true
                                                               }
                                                           },


}

};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
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

        updateePatient(patient) {
                return API_USERS.updatePatient(patient, (result, status, error) => {
                    if (result !== null && (status === 200 || status === 201)) {
                        console.log("Successfully inserted patient with id: " + result);
                        this.reloadHandler();
                    } else {
                        this.setState(({
                            errorStatus: status,
                            error: error
                        }));
                    }
                });
            }

       handleSubmit2() {
              let patient = {
                  id: this.state.formControls.id.value,
                  name: this.state.formControls.name.value,
                  birthDate: this.state.formControls.birthDate.value,
                  gender: this.state.formControls.gender.value,
                  address: this.state.formControls.address.value,
                  medicalRecord: this.state.formControls.medicalRecord.value,
              };

              console.log(patient);
              this.updateePatient(patient);
          }

       render() {
              return (
                  <div>


                    <FormGroup id='id'>
                                              <Label for='idField'> Id: </Label>
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

                      <FormGroup id='name'>
                          <Label for='nameField'> Name: </Label>
                          <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                                 onChange={this.handleChange}
                                 defaultValue={this.state.formControls.name.value}
                                 touched={this.state.formControls.name.touched? 1 : 0}
                                 valid={this.state.formControls.name.valid}
                                 required
                          />
                          {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                          <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                      </FormGroup>

                       <FormGroup id='birthDate'>
                                                <Label for='birthDateField'> BirthDate: </Label>
                                                <Input name='birthDate' id='birthDateField' placeholder={this.state.formControls.birthDate.placeholder}
                                                       onChange={this.handleChange}
                                                       defaultValue={this.state.formControls.birthDate.value}
                                                       touched={this.state.formControls.birthDate.touched? 1 : 0}
                                                       valid={this.state.formControls.birthDate.valid}
                                                       required
                                                />
                                                {this.state.formControls.birthDate.touched && !this.state.formControls.birthDate.valid &&
                                                <div className={"error-message row"}> * birthDate must have at least 3 characters </div>}
                                            </FormGroup>

                      <FormGroup id='gender'>
                                                                      <Label for='genderField'> Gender: </Label>
                                                                      <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                                                                             onChange={this.handleChange}
                                                                             defaultValue={this.state.formControls.gender.value}
                                                                             touched={this.state.formControls.gender.touched? 1 : 0}
                                                                             valid={this.state.formControls.gender.valid}
                                                                             required
                                                                      />
                                                                      {this.state.formControls.gender.touched && !this.state.formControls.gender.valid &&
                                                                      <div className={"error-message row"}> * Gender must have at least 3 characters </div>}
                                                                  </FormGroup>

                      <FormGroup id='address'>
                          <Label for='addressField'> Address: </Label>
                          <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                                 onChange={this.handleChange}
                                 defaultValue={this.state.formControls.address.value}
                                 touched={this.state.formControls.address.touched? 1 : 0}
                                 valid={this.state.formControls.address.valid}
                                 required
                          />
                      </FormGroup>

                       <FormGroup id='medicalRecord'>
                                                <Label for='medicalRecordField'> MedicalRecord: </Label>
                                                <Input name='medicalRecord' id='medicalRecordField' placeholder={this.state.formControls.medicalRecord.placeholder}
                                                       onChange={this.handleChange}
                                                       defaultValue={this.state.formControls.medicalRecord.value}
                                                       touched={this.state.formControls.medicalRecord.touched? 1 : 0}
                                                       valid={this.state.formControls.medicalRecord.valid}
                                                       required
                                                />
                                            </FormGroup>








                          <Row>
                              <Col sm={{size: '4', offset: 8}}>
                                  <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit2}>  Submit </Button>
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

export default PatientFormUpdate;