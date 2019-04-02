import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.css'
import { auth } from '../../store/actions/'
import Spinner from '../../components/UI/Spinner/Spinner'
import Alert from '../../components/UI/Alert/Alert'

class Auth extends Component {
  state = {
    controls : {
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
          required: true,
          isEmail: true
        },
        valid: false,
        shouldValidate: true
      },
      password:{
        elementType: 'input',
        elementConfig: {
          placeholder: 'Password',
          id: 'password',
          type:'password'
        },
        value: '',
        label: 'Password',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        shouldValidate: true
      },
    },
    isSignUp: true,
    showAlert: true,

  }
  inputChangeHandler = (event, inputId) => {
    const { controls } = this.state
    const updatedOrderFrom = { ...controls }
    const updatedElement = { ...updatedOrderFrom[inputId]}
    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    updatedElement.valid = this.checkValidity(updatedElement.value , updatedElement.validation);
    updatedOrderFrom[inputId] = updatedElement;

    let formIsValid = true;
    for (let key in updatedOrderFrom) {
      formIsValid = updatedOrderFrom[key].valid && formIsValid
    }
    this.setState({controls: updatedOrderFrom, formIsValid});
  }
  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules && rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules && rules.isEmail) {
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test((String(value)).toLowerCase()) && isValid
    }

    if (rules && rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid
    }
    if (rules && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid;
  }
  switchAuthHandler = (event) => {
    event.preventDefault()
    this.setState((prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    }));
  }
  closeAlertHandler = () => {
    this.setState({showAlert: false})
  }
  submitHandler = (event) => {
    event.preventDefault()
    this.setState({ showAlert: true})
    this.props.auth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignUp)
  }
  render() {
    let formElementArr = [];
    for (let key in this.state.controls) {
      formElementArr.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    return (
      <div className={styles.Auth}>
        {this.props.isLoading && <Spinner />}
        { this.props.completed && (
        <Alert
          show={this.state.showAlert}
          closeAlert={this.closeAlertHandler}
        >
            { this.state.isSignUp ? 'Registration' : 'Login'} successful
        </Alert>
        )}
        { this.props.error && (
        <Alert
          type='Danger'
          show={this.state.showAlert}
          closeAlert={this.closeAlertHandler}
        >
            {this.props.error}
        </Alert>
        )}
        <form onSubmit={this.submitHandler}>

          { formElementArr.map(formEl => {
            return (
              <Input 
                elementType={formEl.config.elementType}
                elementConfig={formEl.config.elementConfig}
                key={formEl.id}
                value={formEl.config.value}
                lable={formEl.config.lable}
                valid={formEl.config.valid}
                shouldValidate={formEl.config.shouldValidate}
                touched={formEl.config.touched}
                changed={(event) => this.inputChangeHandler(event, formEl.id)}
              />
            )
          })}
          <Button btnType="Success">{this.state.isSignUp ? 'Register' : 'Login'}</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthHandler}> SWITCH To {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.authReducer.isLoading,
    authData: state.authReducer.authData,
    error: state.authReducer.error,
    completed: state.authReducer.completed,
  }
}

export default connect(mapStateToProps, { auth })(Auth)
 
