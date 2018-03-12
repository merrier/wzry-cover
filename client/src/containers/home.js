import React, { Component } from 'react';
import HomeContent from 'components/HomeContent';

import utils from 'plugins/utils';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tableSource: [],
        }
    }

    fetchTableSource = async () => {
        const json = await utils.requestFetch('/api/cover/', false)

        if (json && json.sMsg === 'Successful') {
            this.setState({
                tableSource: json.List,
            })
        }
        this.setState({
            loading: false,
        })
    }

    componentWillMount() {
        this.fetchTableSource();
    }

    render() {
        let { tableSource, loading } = this.state;

        return (
            <div className="home-container">
                <HomeContent tableSource={tableSource} loading={loading} />
            </div>
        );
    }
}

export default Home;
