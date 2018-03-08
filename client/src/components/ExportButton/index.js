import React, {Component} from 'react';
import {Button, Icon, Tooltip} from 'antd';
const ButtonGroup = Button.Group;

require('./index.less');

class ExportButton extends Component {

    render() {
        return (

            <div className="btn-export">

                <Tooltip overlay='' placement='top' title='导出到Excel' arrowPointAtCenter>
                    <Button type="primary" onClick={this.props.export.bind(null , this.props.domClassName)}>
                        导出<Icon type="export"/>
                    </Button>
                </Tooltip>
            </div>

        )
    }
}

export default ExportButton;