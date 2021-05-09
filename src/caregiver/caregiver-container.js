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
import CaregiverForm from "./components/caregiver-form";
import CaregiverForm1 from "./components/caregiver-form-delete";
import CaregiverForm2 from "./components/caregiver-form-update";
import * as API_USERS from "./api/caregiver-api"
import CaregiverTable from "./components/caregiver-table";


class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm1 = this.toggleForm1.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.reload = this.reload.bind(this);
        this.reload1 = this.reload1.bind(this);
        this.reload2 = this.reload2.bind(this);
        this.state = {
            deleteModal:false,
            updateModal:false,
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCaregivers();
    }

    fetchCaregivers() {
        return API_USERS.getCaregivers((result, status, err) => {

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
        this.setState({selected: !this.state.selected});
    }
    toggleForm1() {
            this.setState({deleteModal: !this.state.deleteModal});
        }
    toggleForm2() {
            this.setState({updateModal: !this.state.updateModal});
        }


    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchCaregivers();
    }

    reload1() {
            this.setState({
                isLoaded: false
            });
            this.toggleForm1();
            this.fetchCaregivers();
        }

   reload2() {
           this.setState({
               isLoaded: false
           });
           this.toggleForm2();
           this.fetchCaregivers();
       }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Caregiver Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Caregiver </Button>
                        </Col>
                         <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm1}>Delete Caregiver </Button>
                        </Col>
                         <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm2}>Update Caregiver </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <CaregiverTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

               <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                                     className={this.props.className} size="lg">
                                  <ModalHeader toggle={this.toggleForm}> Add Caregiver: </ModalHeader>
                                  <ModalBody>
                                      <CaregiverForm reloadHandler={this.reload}/>
                                  </ModalBody>
                              </Modal>

                              <Modal isOpen={this.state.deleteModal} toggle={this.toggleForm1}
                                                     className={this.props.className} size="lg">
                                                  <ModalHeader toggle={this.toggleForm1}> Delete Caregiver: </ModalHeader>
                                                  <ModalBody>
                                                      <CaregiverForm1 reloadHandler={this.reload1}/>
                                                  </ModalBody>
                                              </Modal>

                                <Modal isOpen={this.state.updateModal} toggle={this.toggleForm2}
                                                                      className={this.props.className} size="lg">
                                                                   <ModalHeader toggle={this.toggleForm2}> Update Caregiver: </ModalHeader>
                                                                   <ModalBody>
                                                                       <CaregiverForm2 reloadHandler={this.reload2}/>
                                                                   </ModalBody>
                                                               </Modal>

            </div>
        )

    }
}


export default CaregiverContainer;
