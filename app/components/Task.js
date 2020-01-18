import React from 'react';

export default class Task extends React.Component {

  constructor(props) {
    super(props);

    this.state = {expanded: true};
  }

  onTextChange(ev) {
    const text = ev.target.value;
  }

  onExpandCollapse() {
    this.setState({expanded: !this.state.expanded});
  }

  renderSubtasks() {
    return this.props.subtasks && this.props.subtasks.length > 0 && (
      <React.Fragment>
        <button 
          className="task__show_collapse"
          onClick={this.onExpandCollapse.bind(this)}
        >
          { this.state.expanded ? '-' : '+' }
        </button>
        {
          this.state.expanded &&
          <div 
            className="task__subtasks"
          >
            {
              this.props.subtasks.map(sub => (
                <Task done={sub.done} title={sub.title} subtasks={sub.subtasks} depth={this.props.depth + 1} />
              ))
            }
          </div>
        }
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="task">
        <input type="checkbox" checked={this.props.done} />
        <input 
            type="text" value={this.props.title} 
            onChange={this.onTextChange}
        />
        {this.renderSubtasks()}
      </div>
    )
  }

}

Task.defaultProps = {
  depth: 0,
}