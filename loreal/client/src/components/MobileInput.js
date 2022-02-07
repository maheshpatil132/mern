import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import firebase from '../firebase'
const MobileInput = (props) => {
  //initial state
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState(new Array(6).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setmodal] = useState(false);
  const submitBtn = useRef('');
  const history = useHistory();
 
  //after submit mobile number
  const login = () => {
    console.log('No errors, login successfully');
  }

  //validate mobile number
  const validate = (values) => {
    let errors = {};
    if (!values.mobile) {
      errors.mobile = 'mobile is required';
    } else if (/^[6-9]\d{9}$/.test(values.mobile)) {
      errors = {}
    } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      errors.mobile = 'mobile is invalid';
    }
    return errors;
  }

  //after mobile number submitting called
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      login();
    }
  }, [errors]);

  //set re-captcha from firebase
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          // this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  //handle submit button
  const handleSubmit = (e) => {
    console.log('handleSubmit', values)
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    setUpRecaptcha();
    let phoneNumber = '+91' + values.mobile;
    console.log("hero");
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        console.log("hero");
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  //handle otp submit button
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = values.otp;
    let optConfirm = window.confirmationResult;

    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        history.push({
          pathname: "/userdetails",
          state: { message: values.mobile },
        })
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  //handle input on change value
  const handleChange = (e) => {
    e.persist();
    setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    if (values.mobile.length == 9) {
      submitBtn.current.removeAttribute("disabled");
    }
    else {
      submitBtn.current.setAttribute("disabled", "disabled");
    }
  };

  const togglemodal = () => {
    setmodal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const cssstyle = {
    color: 'blue'
  };



  return (
    <>
      <div>
        <button className="btn1" onClick={togglemodal}>Get Started</button>
      </div>

      {modal && (
        <div className="overlay">
          <div className="model-content">
            <div className="main-container">
              <label className="btn-modal" onClick={togglemodal}>&times;</label>
              <h4>Take the first step, to fulfill your study abroad dreams</h4>

              <div className="wrap">

                <form onSubmit={handleSubmit}>
                  <div id="recaptcha-container"></div>
                  <div className="form-group">

                    <input type="text"
                      name="mobile"
                      className="form-control"
                      value={values.text}
                      placeholder="Enter mobile number"
                      onChange={handleChange}
                      autocomplete
                    />
                  </div>
                  { !isSubmitting &&
                  <Button ref={submitBtn} disabled className="btn1" variant="primary" type="submit"
                  >Get OTP</Button>}
                  {errors.mobile && (
                    <p className="help is-danger">{errors.mobile}</p>
                  )}
                </form>


                {/* {!isSubmitting && */}
                  <div className="kt">
                    <Form className="form" onSubmit={onSubmitOtp}>
                      <Form.Group>
                         <Form.Control
                          id="otp"
                          type="number"
                          name="otp"
                          placeholder="OTP"
                          onChange={handleChange}
                        /> 
                       
                            
                              {/* <input className='input_field' type="text" name="" id="" /> */}
                            
                         
                        
                  
                      </Form.Group>
                      <Button className="btn1" variant="primary" type="submit" >submit</Button>
                    </Form>
                  </div>
                


              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


export default MobileInput;