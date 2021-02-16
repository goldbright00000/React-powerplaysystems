import { useState } from 'react';
import Eye from '../../icons/Eye';
import './Input.scss';

const Input = props => {
    const id = props.id || props.name;
    const propsType = props.type || 'text';
    const [type, setType] = useState(propsType);
    const [value, setValue] = useState('');
    const onChange = e => {
        const { value } = e.target;
        setValue(value);
        
        if(props.onChange)
            props.onChange(e);
    }
    const showPasswordHandler = () => setType(type === 'password' ? 'text' : 'password');
    return (
        <div className={`__text-field-style-2 ${props.className}`}>
            <label htmlFor={id}>{props.title} {
                propsType === 'password' && <Eye className={`__eye-icon ${type === 'text' ? 'active' : ''}`} onClick={showPasswordHandler} />
            }</label>
            <input type={type} value={value} onChange={onChange} />
        </div>
    )
}

export default Input;