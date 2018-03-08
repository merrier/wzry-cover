import React, {Component} from 'react';
import classNames from 'classnames';
import {Select, Form} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

require('./index.less');

class SelectTags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
        }
    }

    handleBlur = () => {
        this.setState({
            isFocused: false,
        })
    };

    handleFocus = () => {
        this.setState({
            isFocused: true,
        })
    };

    handleSelect = (value, option) => {
        if(value === '不限'){
            // console.log('不限');
        }
    };

    render() {
        let {datum, handleChange} = this.props;
        let placeholder_text = '请选择' + datum.text;

        let selectClass = classNames({
            'select-tags-container': true,
            'select-tags-container-focus': this.state.isFocused,
        });

        return (
            <FormItem
                label={datum.text}
                className={selectClass}
            >
                <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    style={{width: 100}}
                    placeholder={placeholder_text}
                    optionFilterProp="children"
                    onChange={handleChange.bind(this, datum.type, datum.dataIndex)}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onSelect={this.handleSelect}
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

export default SelectTags;