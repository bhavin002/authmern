import React, { useState } from 'react'
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Resetpassword = () => {
    const [email,setEmail] = useState('');
    const [msg,setmsg] = useState('');
    const inpEvent = (event) =>{
        setEmail(event.target.value)
    }
    const SendMail = (e) =>{
        e.preventDefault();
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!email){
            toast.error("Enter The Email");
        }else if(!regEx.test(email)){
            toast.error("Please Enter The Valid Email");
        }else{
            console.log(email);
            setEmail('');
            setmsg('Password Reset Link Sent SuccessFully In Your Email')
        }
    }
  return (
    <>
        <section>
                <div className="form_data">
                    <div className="form_hading">
                        <h1>Enter Your Email</h1>
                        <p style={{'color':'green','fontWeight':'bolder','justifyContent':'center','display':'flex'}}>{msg}</p>
                    </div>
                    <form autoComplete='off'>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={email} placeholder='Enter Your Email Address' onChange={inpEvent} />
                        </div>
                        <button className='btn' onClick={SendMail}>Send</button>
                    </form>
                    <ToastContainer/>
                </div>
            </section>
    </>
  )
}

export default Resetpassword;