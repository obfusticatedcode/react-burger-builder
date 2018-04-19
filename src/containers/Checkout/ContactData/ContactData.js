import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
          touched: false
        },
        valueType: 'Name',
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
          touched: false
        },
        valueType: 'Street',
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          touched: false,
          minLength: 5,
          valueType: '',
          maxLength: 5
        },
        valueType: 'ZIP code',
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
          touched: false
        },
        valueType: 'Country',
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          touched: false
        },
        valueType: 'email address',
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            }, {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: 'cheapest',
        validation: {
          required: false,
          touched: false
        },
        valueType: 'delivery method', 
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this
          .props
          .history
          .push(`/`);
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderFrom = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updatedOrderFrom[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.validation.touched = true;
    updatedOrderFrom[inputIdentifier] = updatedFormElement;

    let formIsValid = true; 
    for (let inputIdentifier in updatedOrderFrom) {
      formIsValid = updatedOrderFrom[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderFrom, formIsValid: formIsValid});
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({id: key, config: this.state.orderForm[key]});
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (<Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          valueType={formElement.config.valueType}
          touched={formElement.config.validation.touched}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>))}
        <Button 
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;