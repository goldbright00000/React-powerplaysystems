import './Select.scss';

const Select = props => {
    const id = props.id || props.name;
    return (
        <div className={`__Select-field-style-2 ${props.className}`}>
            <label htmlFor={id}>{props.title}</label>
            <div className='__chevron __absolute __-bottom'></div>
            <select>
                {props.children}
            </select>
        </div>
    )
}

export default Select;