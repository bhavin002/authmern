import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Mix.css';
import validator from 'validator'

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setcPassShow] = useState(false);
    const initaialValue = {
        fname: '',
        email: '',
        password: '',
        cpassword: ''
    }
    const [inpval, setInpval] = useState(initaialValue);
    const inpEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInpval((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const singUp = async (e) => {
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        e.preventDefault();
        const {fname,email,password,cpassword} = inpval
        if(fname === ""){
            alert("Please Enter Your Name");
        }else if(email === ""){
            alert("Please Enter Your Email")
        }else if(!regEx.test(email)){
            alert("Please Enter The Valid Email")
        }else if(password === ""){
            alert("Please Enter The Password")
        }else if(!validator.isStrongPassword(password, {
            minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })){
            alert("Please Enter The Strong Password like this Abc@1234");
          }else if(cpassword === ""){
            alert("Please Enter The Confirm Password")
          }else if(cpassword !== password){
            alert("Password And Confirm Password does not matched")
          }else{
            
            const data = await fetch('/register',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fname,email,password,cpassword
                })
            });
            const res = await data.json();
            console.log(res);
          }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_hading">
                        <h1><center>Sing Up</center></h1>
                        <p style={{ textAlign: 'center', margin: '10px 10px 0px 10px' }}>we are you glad that you will be using Project Cloud to manage your tasks!</p>
                    </div>
                    <form autoComplete='off'>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name="fname" id="fname" value={inpval.fname} onChange={inpEvent} placeholder='Enter Your Name ' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={inpval.email} onChange={inpEvent} placeholder='Enter Your Email Address' />

                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={inpEvent} name="password" id="password" placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={inpEvent} name="cpassword" id="cpassword" placeholder='Confirm Password' />
                                <div className="showpass" onClick={() => setcPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={singUp}>Sing Up</button>
                        <p>Already have an Account? <NavLink to={"/"}>Log In</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register;