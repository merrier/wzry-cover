import React, {Component} from 'react';
import { Icon } from 'antd';
import Image from 'components/Image'

require('./index.less');

class HomeHeader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <header className="home-header-container">
                <div className="home-header-container-content">
                    <a href="/">
                        <Image className="logo" src={require('static/img/logo.png')} alt="logo"/>
                    </a>
                    <div className="user-info">
                        <Icon type="github"/>
                        <a target='_blank' href='https://github.com/merrier/wzry-cover'>Fork Me</a>
                        <Icon type="alipay-circle"/>
                        <a target='_blank' href='http://merrier.wang/?page_id=460'>赏杯咖啡</a>
                    </div>
                </div>
            </header>
        );
    }
}

export default HomeHeader;