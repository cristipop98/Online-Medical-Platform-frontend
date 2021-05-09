import React from 'react';
import validate from "./validators/medication-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/medication-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class MedicationFormUpdate extends React.Component{

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

                             sideEffects: {
                                                            value: '',
                                                            placeholder: 'sideEffects...',
                                                            valid: false,
                                                            touched: false,
                                                            validationRules: {
                                                                minLength: 3,
                                                                isRequired: true
                                                            }
                                                        },

                              dosage: {
                                 value: '',
                                 placeholder: 'Dosage...',
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

        updateeMedication(medication) {
                return API_USERS.updateMedication(medication, (result, status, error) => {
                    if (result !== null && (status === 200 || status === 201)) {
                        console.log("Successfully updated medication with id: " + result);
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
              let medication = {
                  id: this.state.formControls.id.value,
                  name: this.state.formControls.name.value,
                  sideEffects: this.state.formControls.sideEffects.value,
                  dosage: this.state.formControls.dosage.value,

              };

              console.log(medication);
              this.updateeMedication(medication);
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

                      <FormGroup id='sideEffects'>
                                                <Label for='sideEffectsField'> SideEffects: </Label>
                                                <Input name='sideEffects' id='sideEffectsField' placeholder={this.state.formControls.sideEffects.placeholder}
                                                       onChange={this.handleChange}
                                                       defaultValue={this.state.formControls.sideEffects.value}
                                                       touched={this.state.formControls.sideEffects.touched? 1 : 0}
                                                       valid={this.state.formControls.sideEffects.valid}
                                                       required
                                                />
                                                {this.state.formControls.sideEffects.touched && !this.state.formControls.sideEffects.valid &&
                                                <div className={"error-message row"}> * SideEffects must have at least 3 characters </div>}
                                            </FormGroup>

                    <FormGroup id='dosage'>
                                                                    <Label for='dosageField'> Dosage: </Label>
                                                                    <Input name='dosage' id='dosageField' placeholder={this.state.formControls.dosage.placeholder}
                                                                           onChange={this.handleChange}
                                                                           defaultValue={this.state.formControls.dosage.value}
                                                                           touched={this.state.formControls.dosage.touched? 1 : 0}
                                                                           valid={this.state.formControls.dosage.valid}
                                                                           required
                                                                    />
                                                                    {this.state.formControls.dosage.touched && !this.state.formControls.dosage.valid &&
                                                                    <div className={"error-message row"}> * Dosage must have at least 3 characters </div>}
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

export default MedicationFormUpdate;