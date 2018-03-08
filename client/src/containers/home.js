import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as homeActions from '../actions/home';
import HomeContent from 'components/HomeContent';

class Home extends Component {

    componentWillMount () {
        this.props.loadHomeSelectionList().then(res => {
            if (res.error) {
                console.error('error appears');
            }
        });
    }

    componentDidMount () {
        this.props.loadHomeTableSource().then(res => {
            if (res.error) {
                console.error('error appears');
            }
        });
    }

    render() {
        let { home } = this.props;

        return (
            <div className="home-container">
                <HomeContent data={home.selection} tableSource={home.table}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        home: state.home
    }),
    homeActions
)(Home);
