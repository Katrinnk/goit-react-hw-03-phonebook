import { Component } from 'react';

class CreateContact extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createContactList({ ...this.state });
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className="mb-3" onSubmit={this.handleSubmit}>
        <div className="mb-3 ms-3 me-3 mt-3">
          <label htmlFor="nameInput" className="form-label">
            Contact Name
          </label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            className="form-control"
            id="nameInput"
            value={this.state.name}
          />
        </div>
        <div className="mb-3 ms-3 me-3">
          <label htmlFor="exampleInputTodoDescription" className="form-label">
            Contact Number
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            className="form-control"
            id="exampleInputTodoDescription"
            value={this.state.number}
          />
        </div>
        <button type="submit" className="btn btn-primary ms-3">
          Add contact
        </button>
      </form>
    );
  }
}

export default CreateContact;
