import React from 'react';
import classnames from 'classnames';

class PlayerNameField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.name.length === 0) {
      this.props.handleInvalidName(this.props.val);
      return;
    }
    this.props.handleValidName(this.props.val);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    })
  }

  render() {
    const fieldClasses = classnames({
      'playerNameField--field': true,
      'playerNameField--field-is-filled': this.state.name.length > 0,
    });
    const promptClasses = classnames({
      'playerNameField--prompt': true,
      'playerNameField--prompt-is-filled': this.state.name.length > 0,
    });

    return (
      <div className={fieldClasses}>
        <div className={promptClasses}>Player {this.props.val + 1}</div>
        <input className="playerNameField--input" type="text" value={this.state.name} onChange={this.handleChange} />
      </div>
    )
  }
}

export default PlayerNameField;
