import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const rawDataChanged = (state, action)=> {
   return updateObject (state, {rowData: action.rowData});
}
const rowSelection = (state, action) => {
    return updateObject (state, {rowData: action.rowSelection});
}

export default (state = {rowData: [], rowSelection: []}, action) => {
    switch (action.type) {
        case actionTypes.ROW_DATA_CHANGED: return rawDataChanged(state, action);  
        case actionTypes.ROW_SELECTION_CHANGED:return rowSelection(state, action); 
        default:return state;
    }
};