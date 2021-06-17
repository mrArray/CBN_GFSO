import React from 'react'
import TextInput from './FormElements/TextInput'
import TextArea from './FormElements/TextArea'
import SelectOption from './FormElements/SelectOption'

const FormElement = ({ field: { input_type, pk, name, value,  } }) => {
  
    switch (input_type) {
        case 'text_input_':
            return (<TextInput
                pk={pk}
                name={name}
                input_type={input_type}
                value={value}

            />)
        case 'number':
            return (<TextInput
                pk={pk}
                name={name}
                input_type={input_type}
                value={value}
            />)
        case 'text_area_':
            return (<SelectOption
                pk={pk}
                name={name}
                input_type={input_type}
                value={value}
            />)

        default:
            return null;
    }


}

export default FormElement
