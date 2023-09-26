import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { Component } from 'react';
import CreateContact from './Forms/CreateContact';
import { Filter } from './Forms/Filter';
import { ContactList } from './List';

const MAIN_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

class App extends Component {
  state = MAIN_STATE;

  createContactList = contact => {
    const isAlreadyExist = this.state.contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isAlreadyExist)
      return Notify.failure('Already exist in your phonebook!');

    const newContact = {
      id: contact.name,
      ...contact,
    };
    this.setState(prev => ({
      contacts: [newContact, ...prev.contacts],
    }));
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  changeFilterValue = filter => {
    this.setState({ filter });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      this.setState({ contacts: JSON.parse(localData) });
    }
  }

  render() {
    const filteredContacts = this.filterContacts();
    return (
      <>
        <h1 className="mt-3 ms-3">Phonebook</h1>
        <CreateContact createContactList={this.createContactList} />

        <h2 className="ms-3">Contacts</h2>
        <Filter
          changeFilterValue={this.changeFilterValue}
          value={this.state.filter}
        />
        <ContactList
          contacts={this.state.contacts}
          filteredContacts={filteredContacts}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}

export default App;
