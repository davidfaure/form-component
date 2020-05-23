import React, { Component } from 'react';
import './Form.css';


// Regex to validate email is a@a.c
const validEmailRegex = 
RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

//regex to validate phone is +33 or 0033 or 06... 
const validPhoneRegex = 
RegExp(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/);

class Form extends Component {

    //initialise global state to handle every input, and error message to display.
    state =  {
        name : '',
            email : '',
            phone : '',
            subject: '',
            message : '',
            errors : {
                name : '',
                email : '',
                phone : '',
                message : '',
            }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        alert("Thank you for contacting me")
    }

    // handleChange function to update state value of each input and update error state if any
    handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        let errors = this.state.errors;

        switch(name){
            case 'name':
                errors.name=
                value.length < 2  // if name entry is not at least 2 characters long then update error state of name with an error message
                ? 'Full name is not valid'
                : '';
            break;
            case 'email':
                errors.email =   
                validEmailRegex.test(value) // if email isn't correct as regex said update error state of email with an error message
                ? ''
                :'Email is not valid';
            break;
            case 'phone':
                errors.phone =  // if phone isn't correct as regex said update error state of phone with an error message
                validPhoneRegex.test(value)
                ? ''
                :'Phone must be at least 10 numbers';
            break;
            case 'message':
                errors.message = 
                value.length < 10 // if message entry is not at least 10 characters long then update error state of message with an error message
                ? 'Message must be at least 10 characters long'
                : '';
            break;
            default:
            break;
        }

        this.setState({errors, [name]: value}); // update state with every values from user entries and error if any.
    }


    render(){
        const { errors, name, email, phone, message, subject } = this.state; // easier to use state variable.
        return(
            <div className="FormWrapper">
                <h2>Get in touch</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="name">
                        <label htmlFor="name" className={errors.name.length === 22 && "LabelBad"}> 
                        {/* if the name error's state contains an error message display css style with red border */}
                            Full Name *
                        </label>
                        <input 
                            value={name}
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className={errors.name.length === 22 && "InputLengthBad"}
                            onChange={this.handleChange}
                        />
                        {errors.name.length > 0 && <span className="error">{errors.name}</span>}
                        {/* display the error message held in the state if it exists */}
                    </div>
                    <div className="email">
                        <label 
                        htmlFor="email"
                        className={errors.email.length === 18 && "LabelBad"}>
                        Email *
                        </label>
                        {/* if the email error's state contains an error message display css style with red border */}

                        <input
                        value={email}
                        type='email' 
                        name='email'
                        placeholder="Your email" 
                        className={errors.email.length === 18 && "InputLengthBad" }
                        onChange={this.handleChange} noValidate />

                        {errors.email.length > 0 && 
                        <span className="error">{errors.email}</span>}
                        {/* display the error message held in the state if it exists */}                        
                    </div>

                    <div className="phone">
                        <label 
                        htmlFor="phone"
                        className={errors.phone.length === 33 && "LabelBad"}>
                        Phone
                        </label>
                        {/* if the phone error's state contains an error message display css style with red border */}

                        <input
                        value={phone}
                        type='phone' 
                        name='phone' 
                        placeholder="Phone Number : 06 XX XX XX XX / +33 6 XX XX XX XX"
                        className={errors.phone.length === 33 && "InputLengthBad" }
                        onChange={this.handleChange} noValidate />

                        {errors.phone.length > 0 && 
                        <span className="error">{errors.phone}</span>}
                        {/* display the error message held in the state if it exists */}                        
                    </div>

                    <div className="subject">
                        <label htmlFor="subject">Subject</label>
                        <input value={subject} type='text' name='subject' placeholder="Subject"onChange={this.handleChange} noValidate />
                    </div>

                    <div className="message">
                        <label 
                        htmlFor="message"
                        className={errors.message.length === 43 && "LabelBad"}>
                      Message *
                        </label>
                        {/* if the message error's state contains an error message display css style with red border */}

                        <textarea
                        value={message}
                        type='text' 
                        name='message' 
                        placeholder="Your message"
                        className={errors.message.length === 43 && "TextareaLengthBad"}
                        onChange={this.handleChange} 
                        noValidate />

                        {errors.message.length === 43 && 
                        <span className="error">{errors.message}</span>}
                        {/* display the error message held in the state if it exists */}                        
                    </div>
    
    
                    <div className="info">
                        <small>* required</small>
                    </div>
    
    
                    <div className="submit">
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default Form;
