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
import MedicationForm from "./components/medication-form";
import MedicationForm1 from "./components/medication-form-delete";
import MedicationForm2 from "./components/medication-form-update";
import * as API_USERS from "./api/medication-api"
import MedicationTable from "./components/medication-table";


class MedicationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleForm1 = this.toggleForm1.bind(this);
        this.toggleForm2 = this.toggleForm2.bind(this);
        this.reload = this.reload.bind(this);
        this.reload1 = this.reload1.bind(this);
        this.reload2= this.reload2.bind(this);
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
        this.fetchMedications();
    }

    fetchMedications() {
        return API_USERS.getMedications((result, status, err) => {

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
        this.fetchMedications();
    }
    reload1() {
            this.setState({
                isLoaded: false
            });
            this.toggleForm1();
            this.fetchMedications();
        }
        reload2() {
                this.setState({
                    isLoaded: false
                });
                this.toggleForm2();
                this.fetchMedications();
            }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Medication Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Medication </Button>
                        </Col>
                         <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm1}>Delete Medication </Button>
                        </Col>
                         <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm2}>Update Medication </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                                            errorStatus={this.state.errorStatus}
                                                            error={this.state.error}
                                                        />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

                 <Modal isOpen={this.state.deleteModal} toggle={this.toggleForm1}
                                       className={this.props.className} size="lg">
                                    <ModalHeader toggle={this.toggleForm1}> Delete Medication: </ModalHeader>
                                    <ModalBody>
                                        <MedicationForm1 reloadHandler={this.reload1}/>
                                    </ModalBody>
                                </Modal>

                                 <Modal isOpen={this.state.updateModal} toggle={this.toggleForm2}
                                                       className={this.props.className} size="lg">
                                                    <ModalHeader toggle={this.toggleForm2}> Update Medication: </ModalHeader>
                                                    <ModalBody>
                                                        <MedicationForm2 reloadHandler={this.reload2}/>
                                                    </ModalBody>
                                                </Modal>

            </div>
        )

    }
}


export default MedicationContainer;