import React, { useState } from 'react';
import './style.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Login from './login.svg'
import { useContext } from 'react';
import { Store } from './store';

const Starter = () => {
  const [form, setForm] = useState(false);
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [show, setShow] = useState(true);
  const [timer, setTimer] = useState(30);
  const [name, setName] = useState('')
  const history = useHistory()
  const [{ user }, dispatch] = useContext(Store);   // <<<<== main syntax to get the name of user


  //  All the functions are start from here

  const handler = (e) => {
    if (!isNaN(e.target.value)) {
      setNumber(e.target.value)
    }
  }

  const namehandler = (e) => {
    setName(e.target.value)
  }

  const change = () => {
    dispatch({
      type: 'Register',
      name: name
    })

  }

  const getotp = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const handleotp = (e, index) => {

    if (isNaN(e.value)) {
      return false
    }
    setOtp([...otp.map((elem, id) => (index === id) ? e.value : elem)])

    if (e.nextSibling) {
      e.nextSibling.focus()
    }
  }

  if (!show) {
    const time = setTimeout(() => {
      setTimer(timer - 1)
    }, 1000);
    if (timer < 0) {
      clearTimeout(time)
    }
  }
  // on click the button of submit
  const submit = (e) => {
    history.push({
      pathname: "/userdetails",
    })
    setOtp([...otp.map(v => '')])
  }


  const getstarted = () => {
    setForm(!form)
  }

  const closeBtn = () => {
    setForm(!form);
    setOtp([...otp.map(v => '')])
  }

  const BackBtn = () => {
    setShow(true);
    setOtp([...otp.map(v => '')])
  }


  //========<<<<<<<<<< All the inline style is here >>>>>>>>>> ============ //

  const input_style_1 = {
    color: '#7a7a7a'
  }

  const input_style_2 = {
    color: 'black'
  }

  const get_otp_style_1 = {
    backgroundColor: '#443eff'
  }

  const get_otp_style_2 = {
    backgroundColor: '#e4e4e4',
    color: '#c4c4c4',
    cursor: 'not-allowed',
    fontWeight: 'bold'
  }

  const submit_btn_style_1 = {
    backgroundColor: '#443eff'
  }

  const submit_btn_style_2 = {
    backgroundColor: '#e4e4e4',
    color: '#c4c4c4',
    cursor: 'not-allowed',
    fontWeight: 'bold'
  }

  useEffect(() => {
    setTimer(30);

  }, [show]);


  useEffect(() => {
    setNumber('')
    setShow(true)
    setTimer(30)

  }, [form]);

  return <>
    <div className="login">
      <button className="start_btn" onClick={getstarted}>get started</button>

      {/* get user name demo part is here   make sure ignore and delete this after understanding */}

      {/* <input type="text" style={{ padding: '0rem' }} onChange={namehandler} value={name} name="name" />
      <button style={{ backgroundColor: 'blue', color: 'white', fontSize: '1.4rem', padding: '.5rem 1.3rem', border: '.1rem solid blue', margin: '0 2rem' }} onClick={change}>submit</button>
      <h1 style={{ color: 'black', fontSize: '2rem', marginTop: '5rem' }}> {`your name is ${user} `} </h1> */}

      {/* demo part ends */}

      {
        form &&
        <div className="form_container">
          <span className='close_btn' onClick={closeBtn}> &#10005; </span>

          {!show &&
            <span className="back" onClick={BackBtn}  >  &larr;</span>}
          <h1 className='heading'>Take the first step, to fulfill your study abroad dreams</h1>
          <img className='login_img' src={Login} alt="" />

          <form className="otp_form" action="" >

            <div className={number.length === 10 ? 'input_layer input_layer_option' : 'input_layer'}>
              <span className={show ? 'sign' : 'sign sign_style'} >+91</span>
              <input
                name="mobile"
                type="text"
                onChange={handler}
                disabled={!show && true}
                style={!show ? input_style_1 : input_style_2}
                maxLength={'10'}
                value={number}
                placeholder='mobile number' />
            </div>

            {
              show &&
              <button
                className="otp_btn"
                onClick={getotp}
                disabled={number.length === 10 ? false : true}
                style={number.length === 10 ? get_otp_style_1 : get_otp_style_2} >get OTP
              </button>

            }

          </form>

          {
            !show &&

            <form action="" className="type_form">
              {
                !show &&

                <p className='resend' >{timer < 0 ? <a href='?'>resend OTP</a> : `00 : ${timer}`}</p>
              }
              <div className="otp_container">

                {
                  otp.map((elem, id) => {
                    return (
                      <input className='otp_box'
                        disabled={show && true}
                        value={elem}
                        onFocus={e => e.target.select()}
                        key={id}
                        onChange={e => handleotp(e.target, id)}
                        maxLength={'1'}
                        type="text" />
                    )
                  })
                }

              </div>
              <button
                className='verify_btn'
                onClick={submit}
                disabled={(otp.join('').length === 6 && timer > 0) ? false : true}
                style={(otp.join('').length === 6 && timer > 0) ? submit_btn_style_1 : submit_btn_style_2}>  submit
              </button>
            </form>
          }

        </div>
      }

    </div>
  </>;
};

export default Starter;
