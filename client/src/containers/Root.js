import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from 'containers/App';

import NotFound from 'components/NotFound';
import Home from 'containers/Home';

export default class Root extends Component {

    render () {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        {/* 子频道 */}
                        <Route exact path="/" component={Home} />

                        <Route path="/*" component={NotFound} />
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}
