import React from "react";
import Table from "../../commons/tables/table";

const columns = [
    {
        Header: 'StartDate',
        accessor: 'startDate',
    },
    {
        Header: 'EndDate',
        accessor: 'endDate',
    },
    {
                Header: 'Medication',
                accessor: 'medication_id',
            },
    {
                    Header: 'Patient',
                    accessor: 'patient_id',
                },

 ];

    const filters = [
        {
            accessor: 'name',
        }
    ];


class MedicationPlanTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MedicationPlanTable;
