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
  const [name , setName] = useState('')

  // main syntax to use and get the username anyware
 const [{user},dispatch] = useContext(Store);
 
  const history = useHistory()
  const handler = (e) => {
    if (!isNaN(e.target.value)) {
      setNumber(e.target.value)
    }
  }

  const namehandler = (e)=>{
    setName(e.target.value)
  }

 const change=()=>{
   dispatch({
     type:'Register',
     name:name
   })
  
 }


  const getotp = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  const handleotp=(e,index)=>{
    if( isNaN(e.value)){
      return false
    }
     setOtp([...otp.map((elem,id)=>(index===id) ? e.value : elem)])
     if(e.nextSibling){
       e.nextSibling.focus()
     }
  }

  if (!show) {
    const time=  setTimeout(() => {
      setTimer(timer - 1)
    }, 1000);
    if(timer < 0){
      clearTimeout(time)
    }
  }
  // on click the button of submit
  const submit=(e)=>{
    history.push({
      pathname: "/userdetails",
    })
    setOtp([...otp.map(v=>'')])
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
      <button onClick={()=>setForm(!form)} className="start_btn">
        get started
      </button>
      <input type="text" style={ { padding:'0rem' } } onChange={namehandler} value={name} name="name"  />
      <button style={{backgroundColor:'blue', color:'white',fontSize:'1.4rem',padding:'.5rem 1.3rem' , border:'.1rem solid blue',margin:'0 2rem'}} onClick={change}>submit</button>
       <h1 style={{color:'black',fontSize:'2rem',marginTop:'5rem'}}> {`your name is ${user} `} </h1>
      {
        form &&
        <div className="form_container">
          <span className='close_btn' onClick={()=>{setForm(!form); setOtp([...otp.map(v=>'')])}}> &#10005;</span>
{   !show &&
          <span onClick={()=>{ setShow(true); setOtp([...otp.map(v=>'')]) }} className="back" >  &larr;</span>}

          <h1 className='heading'>Take the first step, to fulfill your study abroad dreams</h1>
          <img className='login_img' src={Login} alt="" />
          <form action="" className="otp_form">
            <div className="input_layer" style={number.length===10?{ border:'.01rem solid green' , boxShadow:'0 0 0 .rem green'}:{border:'none'}}>
              <span className='sign' style={!show ? {color : '#7a7a7a'}:{color:'black'}}>+91</span>
            <input disabled={!show && true} style={!show ? {color : '#7a7a7a'}:{color:'black'}} maxLength={'10'} value={number} onChange={handler} type="text" placeholder='mobile number' />
            </div>
            {/* <p className='error'>please type a number only</p> */}

            {show &&
              <button disabled={number.length === 10 ? false : true} style={number.length===10? {backgroundColor : '#443eff'} : { backgroundColor:'#e4e4e4',color:'#c4c4c4', cursor:'not-allowed', fontWeight:'bold'}} onClick={getotp} className="otp_btn">get OTP</button>}

          </form>

          {
            !show &&

            <form action="" className="type_form">
            {!show &&
              <p className='resend' >{timer < 0 ? <a href='?'>resend OTP</a> : `00 : ${timer}`}</p>
            }
            <div className="otp_container">

              {

                otp.map((elem, id) => {
                  return (
                    <input disabled={show && true} value={elem} onFocus={e=>e.target.select()} key={id} onChange={e=>handleotp(e.target , id)} maxLength={'1'} className='otp_box' type="text" />
                  )
                })
              }

            </div>
            <button  style={(otp.join('').length===6 && timer>0) ? {backgroundColor : '#443eff'}  : { backgroundColor:'#e4e4e4',color:'#c4c4c4', cursor:'not-allowed', fontWeight:'bold'}} disabled={(otp.join('').length===6 && timer>0)? false : true} onClick={submit} className='verify_btn'>submit</button>
          </form>
          }
          
        </div>
      }

    </div>
  </>;
};

export default Starter;
