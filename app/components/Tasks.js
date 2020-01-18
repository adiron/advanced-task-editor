import React from 'react';
import BridgeManager from '../lib/BridgeManager';
import Task from './Task';

export default class Tasks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    BridgeManager.get().addUpdateObserver(() => {
      this.setState({ todos: BridgeManager.get().getTodos() });
    })
  }

  render() {
    return (
      <div>
        {/* {JSON.stringify(this.state.todos)} */}
        {this.state.todos && this.state.todos.map(
          (task) => <Task done={task.done} title={task.title} subtasks={task.subtasks} />
        )}
      </div>
    )
  }

}
