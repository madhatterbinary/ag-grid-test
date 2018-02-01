import React, { Component } from 'react';
import "ag-grid-root/dist/styles/ag-grid.css";
import "ag-grid-root/dist/styles/theme-fresh.css";
import GridComponent from './components/grid/GridComponent';
import HeaderComponent from './components/header/HeaderComponent';
import "ag-grid-enterprise";

class App extends Component {
  constructor(props) {
    super(props);

    this.setGroupingEnabled = this.setGroupingEnabled.bind(this);
  }
  setGroupingEnabled(enabled) {
    
    this.grid.setGroupingEnabled(enabled);
  }
  render () {
    console.log('this.grid setGroupingEnabled ',this.grid);
    return (
      <div>
           <HeaderComponent setGroupingEnabled={this.setGroupingEnabled} />
           <GridComponent ref={ grid => { this.grid = grid ? grid.getWrappedInstance() : null }} />
      </div>
    );
  }
}

export default  App;
