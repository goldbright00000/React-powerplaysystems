import './CheckBox.scss';

const CheckBox = props => {
    const id = props.id || props.name;
    return (
        <div className={`${props.title ? '__flex __flex-start __checkbox-field' : '__inline-block __checkbox-field'}`}>
            <input type='checkbox' id={id} {...props} className='__checkbox' />
            {props.title && <label htmlFor={id}>{props.title}</label>}
        </div>
    )
}

export default CheckBox;