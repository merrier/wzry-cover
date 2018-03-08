import React, {Component} from 'react';
import {Select, Form} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class SelectRadio extends Component {

    render() {
        let {datum,handleChange} = this.props;
        let placeholder_text = '请选择' + datum.text;

        return (
            <FormItem
                label={datum.text}
                className="select-radio-container"
            >
                <Select
                    showSearch
                    style={{width: 80}}
                    placeholder={placeholder_text}
                    optionFilterProp="children"
                    onChange={handleChange.bind(null,datum.type,datum.dataIndex)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        datum.options.map(function (item, index) {
                            return (
                                <Option key={ index } value={item}>{item}</Option>
                            )
                        })
                    }
                </Select>
            </FormItem>
        )
    }
}

export default SelectRadio;