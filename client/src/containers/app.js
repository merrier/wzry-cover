import React, {Component} from 'react';
import HeaderCon from 'components/Header';
import {Layout} from 'antd';

const {Header, Content} = Layout;

class App extends Component {

    render() {

        return (
            <Layout>
                <Header>
                    <HeaderCon />
                </Header>
                <Layout>
                    <Layout>
                        <Content>{this.props.children}</Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;