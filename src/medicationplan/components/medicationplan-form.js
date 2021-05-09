import React from 'react';
import validate from "./validators/medicationplan-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/medicationplan-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';


class MedicationPlanForm extends React.Component{

 constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                            startDate: {
                                value: '',
                                placeholder: 'StartDate...',
                                valid: false,
                                touched: false,
                                validationRules: {
                                    minLength: 3,
                                    isRequired: true
                                }
                            },

                             endDate: {
                                                            value: '',
                                                            placeholder: 'EndDate...',
                                                            valid: false,
                                                            touched: false,
                                                            validationRules: {
                                                                minLength: 3,
                                                                isRequired: true
                                                            }
                                                        },

                              medication_id: {
                                 value: '',
                                 placeholder: 'MedicationID...',
                                 valid: false,
                                 touched: false,
                                 validationRules: {
                                  minLength: 3,
                                  isRequired: true
                                               }
                                       },

                              patient_id: {
                                                              value: '',
                                                              placeholder: 'PatientID...',
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

       registerMedicationPlan(medicationPlan) {
                       return API_USERS.postMedicationPlan(medicationPlan, (result, status, error) => {
                           if (result !== null && (status === 200 || status === 201)) {
                               console.log("Successfully inserted medicationPlan with id: " + result);
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
              let medicationPlan = {
                  startDate: this.state.formControls.startDate.value,
                  endDate: this.state.formControls.endDate.value,
                  medication_id: this.state.formControls.medication_id.value,
                  patient_id: this.state.formControls.patient_id.value,
              };

              console.log(medicationPlan);
              this.registerMedicationPlan(medicationPlan);
          }

           render() {
                        return (
                            <div>

                                <FormGroup id='startDate'>
                                    <Label for='startDateField'> StartDate: </Label>
                                    <Input name='startDate' id='startDateField' placeholder={this.state.formControls.startDate.placeholder}
                                           onChange={this.handleChange}
                                           defaultValue={this.state.formControls.startDate.value}
                                           touched={this.state.formControls.startDate.touched? 1 : 0}
                                           valid={this.state.formControls.startDate.valid}
                                           required
                                    />
                                    {this.state.formControls.startDate.touched && !this.state.formControls.startDate.valid &&
                                    <div className={"error-message row"}> * startDate must have at least 3 characters </div>}
                                </FormGroup>

                                 <FormGroup id='endDate'>
                                                          <Label for='endDateField'> EndDate: </Label>
                                                          <Input name='endDate' id='endDateField' placeholder={this.state.formControls.endDate.placeholder}
                                                                 onChange={this.handleChange}
                                                                 defaultValue={this.state.formControls.endDate.value}
                                                                 touched={this.state.formControls.endDate.touched? 1 : 0}
                                                                 valid={this.state.formControls.endDate.valid}
                                                                 required
                                                          />
                                                          {this.state.formControls.endDate.touched && !this.state.formControls.endDate.valid &&
                                                          <div className={"error-message row"}> * endDate must have at least 3 characters </div>}
                                                      </FormGroup>

                                <FormGroup id='medication_id'>
                                                                                <Label for='medication_idField'> MedicationID: </Label>
                                                                                <Input name='medication_id' id='medication_idField' placeholder={this.state.formControls.medication_id.placeholder}
                                                                                       onChange={this.handleChange}
                                                                                       defaultValue={this.state.formControls.medication_id.value}
                                                                                       touched={this.state.formControls.medication_id.touched? 1 : 0}
                                                                                       valid={this.state.formControls.medication_id.valid}
                                                                                       required
                                                                                />
                                                                                {this.state.formControls.medication_id.touched && !this.state.formControls.medication_id.valid &&
                                                                                <div className={"error-message row"}> * medicationID must have at least 3 characters </div>}
                                                                            </FormGroup>

                                  <FormGroup id='patient_id'>
                                                                                                                <Label for='patient_idField'> PatientID: </Label>
                                                                                                                <Input name='patient_id' id='patient_idField' placeholder={this.state.formControls.patient_id.placeholder}
                                                                                                                       onChange={this.handleChange}
                                                                                                                       defaultValue={this.state.formControls.patient_id.value}
                                                                                                                       touched={this.state.formControls.patient_id.touched? 1 : 0}
                                                                                                                       valid={this.state.formControls.patient_id.valid}
                                                                                                                       required
                                                                                                                />
                                                                                                                {this.state.formControls.patient_id.touched && !this.state.formControls.patient_id.valid &&
                                                                                                                <div className={"error-message row"}> * patientID must have at least 3 characters </div>}
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

          export default MedicationPlanForm;

