import React, { Component } from 'react';
import { selectionOptionList } from 'constants';
import { Select, Form } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

class SelectRadio extends Component {

  render() {
    const { datum, handleChange } = this.props;
    const placeholder_text = '请选择' + datum.text;
    const noCheck = datum.noCheck;

    return (
      <FormItem
        label={datum.text}
        className="select-radio-container"
      >
        <Select
        //   showSearch
          style={{ width: datum.width || 80 }}
          placeholder={placeholder_text}
        //   optionFilterProp="children"
          onChange={handleChange.bind(null, 'radio', datum.dataIndex)}
        //   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            datum.options.map(function(item, index) {
              return (
                <Option key={index}
                        value={item + ''}>{noCheck ? item : selectionOptionList[datum.dataIndex][item]}</Option>
              );
            })
          }
        </Select>
      </FormItem>
    );
  }
}

export default SelectRadio;