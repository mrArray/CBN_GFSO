import React, { useContext }  from 'react';
import { FormContext } from '../FormContext';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
 
const TextInput = ({ input_type, pk, name, field_value }) => {

    const  {handleChange}  = useContext(FormContext)
    return (

        <div className="col-4">
       <Form>

         <label>{name} </label>
         <Input 
         type="text" 
         className="form-control "  
         placeholder={input_type}
         onChange={event => handleChange(pk, event)} 
         value={field_value}
         validations={[required]} 
         /> 
        </Form>

        <br />
         </div>
                             
                  

    )
}

export default TextInput
