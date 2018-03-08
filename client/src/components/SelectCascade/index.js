import React, {Component} from 'react';

import {Select, Form, Cascader} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class SelectCascade extends Component {

    render() {
        let {datum,handleChange} = this.props;
        let placeholder_text = '请选择' + datum.text;

        return (
            <FormItem
                label={datum.text}
                className='select-cascade-container'
            >
                <Cascader
                    options={datum.options}
                    placeholder={placeholder_text}
                    showSearch
                    onChange={handleChange.bind(null,datum.type,datum.dataIndex)}
                />
            </FormItem>
        )
    }
}

export default SelectCascade;