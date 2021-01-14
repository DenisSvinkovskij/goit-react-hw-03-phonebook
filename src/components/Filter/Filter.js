import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ value = '', onChangeFilter }) {
  return (
    <div>
      <h3>Find contact by name</h3>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={e => onChangeFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
