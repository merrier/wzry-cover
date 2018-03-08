// <img onerror onload>
import React, { Component, PropTypes } from 'react';
import FirstInView from 'components/FirstInView/index';

class Image extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        inView: false,
    };

    hanleError(src) {
        if(!Math.floor(Math.random() * 100)) {
            gaeventTest('image', 'error', src);
        }
    }

    hanleLoad() {

    }

    handleFirstInView() {
        this.setState({inView: true});
    }

    render() {
        return (
            <FirstInView onFirstInView={() => {this.handleFirstInView()}}>
            { this.state.inView ?
                <img
                    {...this.props}
                    onError={() => this.hanleError(this.props.src)} 
                    onLoad={() => this.hanleLoad()} />
                :
                <img />
            }
            </FirstInView>
        )
    }
}

module.exports = Image;
