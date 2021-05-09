import React from 'react';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import PatientForm from "./components/patient-form";
import PatientForm1 from "./components/patient-form-delete";
import PatientForm2 from "./components/patient-form-update";
import * as API_USERS from "./api/patient-api"
import PatientTable from "./components/patient-table";

import axios from 'axios';

class PatientContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm1=this.toggleForm1.bind(this);
        this.toggleForm2=this.toggleForm2.bind(this);
         this.toggleForm3=this.toggleForm3.bind(this);
        this.reload = this.reload.bind(this);
        this.reload1 = this.reload1.bind(this);
        this.reload2 = this.reload2.bind(this);
        this.reload3 = this.reload3.bind(this);
        this.state = {
            deleteModal:false,
            updateModal:false,
            test:false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
       // axios.get('http://localhost:8080/patient')
       // .then(res=>{
         //   const tableData=res.data;
           // this.setState({tableData})
        //});
        this.fetchPatients();
    }

    fetchPatients() {
        return API_USERS.getPatients((result, status, err) => {

            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected})
    }
    toggleForm1() {
            this.setState({deleteModal: !this.state.deleteModal})
        }
    toggleForm2() {
                this.setState({updateModal: !this.state.updateModal})
            }
    toggleForm3() {
                    this.setState({test: !this.state.test})
                }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchPatients();
    }
    reload1(){
   this.setState({
              isLoaded: false
          });
          this.toggleForm1();
          this.fetchPatients();
    }
    reload2(){
       this.setState({
                  isLoaded: false
              });
              this.toggleForm2();
              this.fetchPatients();
        }
     reload3(){
           this.setState({
                      isLoaded: false
                  });
                  this.toggleForm3();
                  this.fetchPatients();
            }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Patient Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Patient </Button>
                        </Col>
                         <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm1}>Delete Patient </Button>
                         </Col>
                          <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm2}>Update Patient </Button>
                         </Col>

                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                                                   {this.state.isLoaded && <PatientTable tableData = {this.state.tableData}/>}
                                                   {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                                                   errorStatus={this.state.errorStatus}
                                                                                   error={this.state.error}
                                                                               />   }
                                               </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Patient: </ModalHeader>
                    <ModalBody>
                        <PatientForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.deleteModal} toggle={this.toggleForm1}
                                       className={this.props.className} size="lg">
                                    <ModalHeader toggle={this.toggleForm1}> Delete Patient: </ModalHeader>
                                    <ModalBody>
                                        <PatientForm1 reloadHandler={this.reload1}/>
                                    </ModalBody>
                                </Modal>

                  <Modal isOpen={this.state.updateModal} toggle={this.toggleForm2}
                                                        className={this.props.className} size="lg">
                                                     <ModalHeader toggle={this.toggleForm2}> Update Patient: </ModalHeader>
                                                     <ModalBody>
                                                         <PatientForm2 reloadHandler={this.reload2}/>
                                                     </ModalBody>
                                                 </Modal>


            </div>
        )

    }
}


export default PatientContainer;
