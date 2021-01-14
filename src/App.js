import './App.css';
import { v4 as uuidv4 } from 'uuid';
import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState(() => {
        return {
          contacts: parsedContacts,
        };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (name === '' || number === '') {
      alert("Name or number can't be empty string");
      return;
    }

    if (this.state.contacts.find(item => item.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prev => {
      return { contacts: [...prev.contacts, contact] };
    });
  };

  deleteContact = contactId => {
    this.setState(prev => {
      return {
        contacts: prev.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h1>Contacts</h1>
        {visibleContacts.length > 0 && (
          <Filter
            value={this.state.filter}
            onChangeFilter={this.changeFilter}
          />
        )}
        {visibleContacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>Contact list empty for now</p>
        )}
      </div>
    );
  }
}
