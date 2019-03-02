import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from '../presentational/Input';
import image from '../../../images/avatar.png';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      showResult: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  submitForm(event)  {
    event.preventDefault();
    console.log(this.state);
    this.setState({showResult: true});    
  }
  render() {
    const { seo_title, showResult } = this.state;
    let result = '';
    if (showResult) {
      result = <p>{seo_title}</p>;
    }
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
        {result}
        <button type="button" onClick={this.submitForm}>Submit</button>
        <img src={image} alt="imported" />
      </form>
    );
  }
  
}
const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
export default FormContainer;