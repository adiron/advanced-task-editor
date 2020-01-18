import React from 'react';
import Tasks from './components/Tasks';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sn-component windows-web">
        <Tasks />
      </div>
    );
  }
}
