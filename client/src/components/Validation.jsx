
const validation = (inpval) =>{
    let errors = {}
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!inpval.fname){
        errors.fname = "Name Is Reqired"
    }
    else if(!regEx.test(inpval.email)){
        errors.email = "Enter The Valid Email"
    }
    else if(inpval.password.length < 6){
        errors.password = "password must be 6 digit"
    }
    else if(inpval.cpassword !== inpval.password){
        errors.cpassword = "password does not matched"
    }else{
        alert("Your Form Is Submitted SuccessFully");
    }

    return errors;
} 

export default validation;