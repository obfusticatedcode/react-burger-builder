import React from 'react';
import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p>Please enter a valid {props.valueType}</p>;
  }

  switch (props.elementType) {
    case('input'):
      inputElement = <input
        {...props.elementConfig}
        className={inputClasses.join(' ')}
        onChange={props.changed}
        value={props.value}/>;
      break;
    case('textarea'):
      inputElement = <textarea
        {...props.elementConfig}
        className={inputClasses.join(' ')}
        onChange={props.changed}
        value={props.value}/>;
      break;
    case('select'):
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
          {props
            .elementConfig
            .options
            .map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
        </select>
      );
      break;
    default:
      inputElement = <input
        {...props.elementConfig}
        className={inputClasses.join(' ')}
        onChange={props.changed}
        value={props.value}/>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default input;