import React from 'react'
import './App.css';
import Tabs from './Tabs';
import Tab from './Tab';
import FetchAndChart from './FetchAndChart';

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      selected : '1 Week'
    }
  }
  setSelected = (tab) =>{
    this.setState({selected: tab})
  }
  render() {
    return (
      <div className="App mt-4">
        <Tabs tabs= {['1 Minute','5 Minutes', '1 Hour', '1 Week']} selected = {this.state.selected} setSelected={this.setSelected}>
          <Tab isSelected={ this.state.selected === '1 Minute'}>
            <FetchAndChart timeStamps = '1 Minutes'></FetchAndChart>
          </Tab>
          <Tab isSelected={ this.state.selected === '5 Minutes'}>
            <FetchAndChart timeStamps = '5 Minutes'></FetchAndChart>
          </Tab>
          <Tab isSelected={ this.state.selected === '1 Hour'}>
            <FetchAndChart timeStamps = '1 Hours'></FetchAndChart>
          </Tab>
          <Tab isSelected={ this.state.selected === '1 Week'}>
            <FetchAndChart timeStamps = '24 Hours'></FetchAndChart>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;
