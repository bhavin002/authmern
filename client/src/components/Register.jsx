import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import validation from './Validation';
import './Mix.css';

const Register = () => {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setcPassShow] = useState(false);
    const [errors, setErrors] = useState({})
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
    const AddUser = (e) => {
        e.preventDefault();
        setErrors(validation(inpval));
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
                            {errors.fname && <p style={{ color: 'red', fontSize: '13px' }}>{errors.fname}</p>}
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={inpval.email} onChange={inpEvent} placeholder='Enter Your Email Address' />
                            {errors.email && <p style={{ color: 'red', fontSize: '13px' }}>{errors.email}</p>}

                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={inpEvent} name="password" id="password" placeholder='Enter Your Password Address' />
                                {errors.password && <p style={{ color: 'red', fontSize: '13px' }}>{errors.password}</p>}
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={inpEvent} name="cpassword" id="cpassword" placeholder='Confirm Password' />
                                {errors.cpassword && <p style={{ color: 'red', fontSize: '13px' }}>{errors.cpassword}</p>}

                                <div className="showpass" onClick={() => setcPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={AddUser}>Sing Up</button>
                        <p>Already have an Account? <NavLink to={"/"}>Log In</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register;