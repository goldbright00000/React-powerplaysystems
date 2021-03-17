import React from 'react';
import Select from 'react-select';

const DropDownMenu = (props) => {
    const {defaultValue = '', value = '', onChange = () => {}, options = [], styles = {}} = props || {};
    
    return (
        <Select
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            options={options}
            styles={styles}
      />
    );
};

export default DropDownMenu