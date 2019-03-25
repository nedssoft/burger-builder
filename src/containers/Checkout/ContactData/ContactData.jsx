import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Name',
          id: 'name',
          type:'text'
        },
        value: '',
        label: 'Name',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true
      },
      email:{
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your E-mail',
          id: 'email',
          type:'email'
        },
        value: '',
        label: 'Email',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true
      },
      street: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your Street',
          id: 'street',
          type:'text'
        },
        value: '',
        label: 'Street',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your postal Code',
          id: 'postalCode',
          type:'text'
        },
        value: '',
        label: 'postal Code',
        validation: {
          required: true
        },
        valid: false,
        shouldValidate: true
      },
      deleiverMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '', displayValue: 'Select...'},
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ],
          id: 'delivery'
        },
        value: '',
        label: 'Delivery Method',
        validation: {},
        valid: true
      },
    },
    ingredients: null,
    isLoading: false,
    formIsValid: false
  }

  inputChangeHandler = (event, inputId) => {
    const { orderForm } = this.state
    const updatedOrderFrom = { ...orderForm }
    const updatedElement = { ...updatedOrderFrom[inputId]}
    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    updatedElement.valid = this.checkValidity(updatedElement.value , updatedElement.validation);
    updatedOrderFrom[inputId] = updatedElement;

    let formIsValid = true;
    for (let key in updatedOrderFrom) {
      formIsValid = updatedOrderFrom[key].valid && formIsValid
    }
    this.setState({orderForm: updatedOrderFrom, formIsValid});
  }
  checkValidity = (value, rules) => {
    let isVlaid = true;
    if (!rules) {
      return true;
    }
    if (rules && rules.required) {
      isVlaid = value.trim() !== '' && isVlaid;
    }
    return isVlaid;
  }
  orderHandler = (event) => {
    event.preventDefault()
    const { orderForm, formIsValid } = this.state;
    if(!formIsValid) {
      alert('errors!!!')
      return false
    }
    this.setState({isLoading: true})
    const { ingredients, price, history } = this.props;
    const customer = this.extractFormData(orderForm)
     const order = {
      ingredients,
      price,
      customer
    }
    axios.post('/orders.json', order)
    .then(res => {
      if (res.data.name) {
        this.setState({isLoading: false});
        alert('order created successfully');
        history.push('/')
      }
    })
    .catch(err => {
      this.setState({ isLoading: false});

    });
  }
  extractFormData = (data) => {
    let formData = {}
    for (let key in data) {
      formData[key] = data[key].value;
    }
    return formData;
  }
  render() {
    const { isLoading, orderForm, formIsValid } = this.state
    let formElementArr = [];
    for (let key in orderForm) {
      formElementArr.push({
        id: key,
        config: orderForm[key]
      });
    }
    return  (
      <div className={styles.ContactData}>
        { isLoading ? <Spinner /> : ''}
        <h4>Enter your conatct Data</h4>
        <form onSubmit={this.orderHandler}>
          { formElementArr.map(element => {
            return (
              <Input 
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                label={element.config.label}
                key={element.id}
                valid={element.config.valid}
                shouldValidate={element.config.shouldValidate}
                touched={element.config.touched}
                changed={(event) => this.inputChangeHandler(event, element.id)}
              />
            )
          })}
          <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
        </form>
      </div>
)
  }
}

export default ContactData
