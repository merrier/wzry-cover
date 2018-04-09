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
            selectionList: [{
                type: 'radio',
                text: '排序方式',
                dataIndex: 'iOrder',
                width: 120,
                options: [0, 1, 11],
            }, {
                type: 'radio',
                text: '人物性别',
                dataIndex: 'iGender',
                width: 90,
                options: [999, 1, 2],
            }, {
                type: 'radio',
                text: '角色性别',
                dataIndex: 'iRoleSex',
                width: 90,
                options: [999, 1, 2],
            }]
        }
    }

    componentWillMount() {
        this.fetchTableSource();
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
    fetchTableSource = async (query = {}) => {

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
            const coverJson = await utils.requestFetch('/api/cover/', false, {...query});

            console.log('coverJson', coverJson);

            if (coverJson && coverJson.sMsg === 'Successful') {
                this.setState({
                    tableSource: this.formatCoverList(coverJson.List, this.state.heroList),
                    pagination: {
                        ...this.state.pagination,
                        current: query && query.page ? query.page + 1 : 1,
                        total: + coverJson.iTotalLines,
                    }
                })
            }
            this.setState({
                loading: false,
            })
        });
    }

    // 搜索英雄/皮肤名称
    onSearch = (value) => {
        // 获取全部数据
        if(value === ''){
            this.fetchTableSource();
        } else {
            this.fetchTableSource({
                SearchValue: value,
            })
        }
    }

    render() {
        return (
            <div className="home-container">
                <HomeContent
                    {...this.state}
                    fetchTableSource={this.fetchTableSource}
                    onSearch={this.onSearch}
                />
            </div>
        );
    }
}

export default Home;
