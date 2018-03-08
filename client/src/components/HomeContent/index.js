import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as homeActions from '../../actions/home';

import SelectRadio from 'components/SelectRadio/index';
import SelectTags from 'components/SelectTags/index';
import SelectCascade from 'components/SelectCascade/index';
import ExportButton from 'components/ExportButton/index';
import {tableToExcel} from 'plugins/exportToExcel';

import {Table, Form} from 'antd';

require('./index.less');

class HomeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: {},
        };
    }

    handleChange = (type, dataIndex, value) => {

        if(this.state.filteredInfo === null){
            this.setState({
                filteredInfo: {},
            })
        }

        switch (type) {
            case 'radio':
                this.setState({
                    filteredInfo: Object.assign(this.state.filteredInfo, {[dataIndex]: [value]})
                });
                break;
            case 'cascade':
            case 'tags':
                this.setState({
                    filteredInfo: Object.assign(this.state.filteredInfo, {[dataIndex]: value})
                });
                break;
        }
    };

    exportButtonClick = (domClassName) => {
        let tableDom = document.getElementsByClassName(domClassName)[0];
        tableToExcel(tableDom, '平台作者数据汇总');
    };

    render() {
        let {data,tableSource} = this.props;
        let self = this;
        let {filteredInfo} = this.state;
        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '序号',
            dataIndex: 'order',
            width: 100,
        }, {
            title: '作者名',
            dataIndex: 'name',
            width: 150,
            render: (text, record) => {
                return <a href={record.url}>{text}</a>;
            }
        }, {
            title: '平台',
            dataIndex: 'platform',
            width: 150,
            filteredValue: filteredInfo.platform || null,
            onFilter: (value, record) => {
                if (value === '不限') {
                    return true;
                } else {
                    return record.platform.includes(value);
                }
            },
        }, {
            title: '分类',
            dataIndex: 'category',
            width: 150,
            filteredValue: filteredInfo.category || null,
            onFilter: (value, record) => {
                if (value === '不限') {
                    return true;
                } else {
                    return record.category.includes(value);
                }
            },
        }, {
            title: '原创评级',
            dataIndex: 'grade',
            width: 120,
            filteredValue: filteredInfo.grade || null,
            onFilter: (value, record) => {
                if (value === '不限') {
                    return true;
                } else {
                    return record.grade.includes(value);
                }
            },
        }, {
            title: '关联状态',
            dataIndex: 'status',
            width: 120,
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => {
                if (value === '不限') {
                    return true;
                } else {
                    return record.status.includes(value);
                }
            },
        }, {
            title: '负责人',
            dataIndex: 'director',
            filteredValue: filteredInfo.director || null,
            onFilter: (value, record) => {
                if (value === '不限') {
                    return true;
                } else {
                    return record.director.includes(value);
                }
            },
        }];

        return (
            <article className="home-content-container">
                <Form className="content-selection" layout="inline">

                    {data.map(function (item, index) {
                        switch (item.type) {
                            case 'radio':
                                return <SelectRadio datum={item} key={index} handleChange={self.handleChange}/>;
                                break;
                            case 'tags':
                                return <SelectTags datum={item} key={index} handleChange={self.handleChange}/>;
                                break;
                            case 'cascade':
                                return <SelectCascade datum={item} key={index} handleChange={self.handleChange}/>
                        }
                    })}

                    <ExportButton domClassName="home-content-table" export={this.exportButtonClick}/>

                </Form>
                <section className="content-main">

                    <Table className="home-content-table" size='middle' pagination={false} columns={columns}
                           dataSource={tableSource}
                           scroll={{y: 'calc(100vh - 200px)'}}/>
                </section>
            </article>
        )
    }
}

export default connect(
    state => ({
        home: state.home
    }),
    homeActions
)(HomeContent);