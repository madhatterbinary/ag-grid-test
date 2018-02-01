import * as actionTypes from './actionTypes';
// import axios from '../../axios-orders';

export function updateRowData(rowData) {
    return {
        type: actionTypes.ROW_DATA_CHANGED,
        rowData
    }
}

export function updateRowSelection(rowSelection) {
    return {
        type: actionTypes.ROW_SELECTION_CHANGED,
        rowSelection
    }
}