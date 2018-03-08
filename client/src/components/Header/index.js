import React, {Component} from 'react';
import { Menu, Dropdown, Input, Icon } from 'antd';
import Image from 'components/Image/index'

require('./index.less');

const Search = Input.Search;

const menu = (
    <Menu>

        <Menu.Item>
            <a onClick=''>退出</a>
        </Menu.Item>

    </Menu>
);

class HomeHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: 'merrier',
        }
    }

    searchAuthor = (value) => {
        console.log(value);
    };

    render() {
        return (
            <header className="home-header-container">
                <div className="home-header-container-content">
                    <a href="http://insight.bytedance.net">
                        <Image className="logo" src={require('static/img/logo.png')} alt="logo"/>
                    </a>

                    <Search className="search"
                            placeholder='输入您想查询的作者名或mid'
                            style={{width: 200}}
                            onSearch={this.searchAuthor}
                    />

                    <div className="user-info">

                        <Dropdown overlay={menu}>
                            <div className="ant-dropdown-link" href="#">
                                <Icon type="user"/>
                                { this.state.user
                                    ? <span>{this.state.user}</span>
                                    : <span>请登录</span>
                                }
                            </div>
                        </Dropdown>
                        <Icon type="question-circle-o"/>
                        <span>帮助</span>
                    </div>
                </div>
            </header>
        );
    }
}

export default HomeHeader;