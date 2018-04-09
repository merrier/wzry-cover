import React, { Component } from 'react';
import HomeContent from 'components/HomeContent';

import utils from 'plugins/utils';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tableSource: [],
            pagination: {
                size: 'large',
                pageSize: 20,
                current: 1,
                defaultCurrent: 1,
                showTotal: (total) => {
                    return `共 ${total} 条数据`;
                },
            },
            heroList: [],
        }
    }

    // 添加英雄名称和皮肤名称字段
    formatCoverList = (coverList, heroList) => {
        let heroNameList = [];

        if (heroList && heroList.length > 0) {
            heroNameList = heroList.map(item => {
                return item.cname;
            })
        }
        return coverList.map(item => {
            return {
                ...item,
                sHeroName: heroNameList.indexOf(item.sProdName.split('-')[0]) === -1 ? item.sProdName.split('-')[1] : item.sProdName.split('-')[0],
                sSkinName: heroNameList.indexOf(item.sProdName.split('-')[0]) === -1 ? item.sProdName.split('-')[0] : item.sProdName.split('-')[1],
            }
        })
    }

    // 封面图信息
    fetchTableSource = async (query) => {

        this.setState({
            loading: true,
        }, async () => {
            if ( this.state.heroList.length === 0 ) {
                // 首先获取英雄列表
                const heroList = await utils.requestFetch('/api/herolist/', false);
                console.log('heroList', heroList);
                this.setState({
                    heroList,
                })
            }
            const coverJson = await utils.requestFetch('/api/cover/', false, {...(query ? {
                page: query.current - 1,
            }:{})});

            console.log('coverJson', coverJson);

            if (coverJson && coverJson.sMsg === 'Successful') {
                this.setState({
                    tableSource: this.formatCoverList(coverJson.List, this.state.heroList),
                    pagination: {
                        ...this.state.pagination,
                        current: query && query.current ? query.current : 1,
                        total: + coverJson.iTotalLines,
                    }
                })
            }
            this.setState({
                loading: false,
            })
        });
    }


    componentWillMount() {
        this.fetchTableSource();
    }

    render() {
        let { tableSource, loading, heroNameList, pagination } = this.state;

        return (
            <div className="home-container">
                <HomeContent
                    tableSource={tableSource}
                    loading={loading}
                    heroNameList={heroNameList}
                    pagination={pagination}
                    fetchTableSource={this.fetchTableSource}
                />
            </div>
        );
    }
}

export default Home;
