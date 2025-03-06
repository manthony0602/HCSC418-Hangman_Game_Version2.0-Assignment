import React from 'react';

class SingleLetterSearchbar extends React.Component {
  state = { inputValue: '' };

  handleInputChange = (event) => {
    const value = event.target.value.toUpperCase(); // Convert to uppercase
    this.setState({ inputValue: value });
  };

  handleSearchClick = () => {
    if (
      this.state.inputValue.length === 1 &&
      /^[A-Z]$/.test(this.state.inputValue)
    ) {
      this.props.onSearch(this.state.inputValue);
    } else {
      alert('Please enter a single letter (A-Z).');
    }
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          maxLength={1}
        />
        <button onClick={this.handleSearchClick}>Guess</button>
      </div>
    );
  }
}

export default SingleLetterSearchbar;
