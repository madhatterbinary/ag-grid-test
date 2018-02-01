import React, {Component} from "react";
import {AgGridReact} from "ag-grid-react";
import {connect} from "react-redux";
import "ag-grid-enterprise";

import {updateRowSelection} from "../../store/actions/gridDataActions";

class GridComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'Symbol', field: 'symbol', width: 300},
                {headerName: 'Price', field: 'price', width: 300},
                {headerName: 'Group', field: 'group', width: 300}
            ]
        };

        this.onGridReady = this.onGridReady.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.setGroupingEnabled = this.setGroupingEnabled.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();

        this.setGroupingEnabled(false);
    }

    onSelectionChanged() {
        let selectedRowNodes = this.gridApi.getSelectedNodes();
        let selectedIds = selectedRowNodes.map((rowNode) => rowNode.id);

        this.props.dispatch(updateRowSelection(selectedIds));
    }

    setGroupingEnabled(enabled) {
        if (enabled) {
            this.columnApi.addRowGroupColumn('group');
            this.columnApi.setColumnVisible('group', false);
            this.columnApi.setColumnVisible('symbol', false);
        } else {
            this.columnApi.removeRowGroupColumn('group');
            this.columnApi.setColumnVisible('group', true);
            this.columnApi.setColumnVisible('symbol', true);
        }
    }

    render() {
        
        if(this.props.rowData.length === 0) {return <div/>}
        console.log('in GridComponent the render ',this.props.rowData);
        return (
            <div style={{height: 400, width: 900, marginTop: 15}} className="ag-theme-fresh">
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}
                    deltaRowDataMode
                    enableStatusBar
                    animateRows
                    enableColResize
                    rowSelection="multiple"
                    enableRangeSelection
                    autoColumnGroupDef={{
                        headerName: 'Symbol',
                        cellRenderer:'agGroupCellRenderer',
                        field: 'symbol'
                    }}
                    groupDefaultExpanded="1"
                    enableSorting
                    getRowNodeId={(data) => data.symbol}

                    // events
                    onGridReady={this.onGridReady}
                    onSelectionChanged={this.onSelectionChanged}>
                </AgGridReact>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        rowData: state.rowData
    }
}

export default connect(mapStateToProps,null,null,{withRef: true}
)(GridComponent);