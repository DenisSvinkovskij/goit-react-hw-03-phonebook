import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

function ContactList({
  contacts = [{ name: 'John', number: '555 - 452 - 521', id: 'dfv5' }],
  onDeleteContact,
}) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => {
        return (
          <li key={id} className={s.listItem}>
            <span>{name}</span>: <span>{number}</span>
            <button
              type="button"
              className={s.button}
              onClick={() => onDeleteContact(id)}
            >
              Delete contact
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
