import React, { Component } from 'react';

import SelectRadio from 'components/SelectRadio/index';
import SelectTags from 'components/SelectTags/index';
import SelectCascade from 'components/SelectCascade/index';
import ExportButton from 'components/ExportButton/index';
// import { tableToExcel } from 'plugins/exportToExcel';

import { Table, Form } from 'antd';

require('./index.less');

class HomeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            tableSource: props.tableSource,
            filteredInfo: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.props.loading) {
            this.setState({
                loading: nextProps.loading,
                tableSource: nextProps.tableSource,
            });
        }
    }

    handleChange = (type, dataIndex, value) => {

        if (this.state.filteredInfo === null) {
            this.setState({
                filteredInfo: {},
            })
        }

        switch (type) {
            case 'radio':
                this.setState({
                    filteredInfo: Object.assign(this.state.filteredInfo, { [dataIndex]: [value] })
                });
                break;
            case 'cascade':
            case 'tags':
                this.setState({
                    filteredInfo: Object.assign(this.state.filteredInfo, { [dataIndex]: value })
                });
                break;
        }
    };

    render() {
        let { tableSource, loading } = this.state;
        let self = this;

        console.log('tableSource', tableSource);

        const columns = [{
            title: '封面图',
            dataIndex: 'sThumbURL',
            // width: 150,
            // filteredValue: filteredInfo.platform || null,
            render: (text, record) => {
                const name = decodeURIComponent(record.sProdName);
                return <img className='thumb' title={name} alt={name} src={decodeURIComponent(text)} />;
            }
        }, {
            title: '发布时间',
            dataIndex: 'dtInputDT',
            // width: 100,
            render: (text) => {
                return decodeURIComponent(text);
            }
        }, {
            title: '皮肤名称',
            dataIndex: 'sProdName',
            // width: 150,
            render: (text) => {
                return decodeURIComponent(text);
            }
        }, {
            title: '查看',
            dataIndex: 'sProdImgNo',
            // width: 150,
            // filteredValue: filteredInfo.category || null,
            render: (text, record) => {
                <span>
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_1)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_2)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_3)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_4)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_5)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_6)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_7)}>1920×1240</a>
                    <Divider type="vertical" />
                    <a target='_blank' href={decodeURIComponent(record.sProdImgNo_8)}>1920×1240</a>
                </span>
            }
        }];

        return (
            <article className="home-content-container">
                {/* <Form className="content-selection" layout="inline">

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

                </Form> */}
                <section className="content-main">

                    <Table
                        className="home-content-table"
                        size='middle'
                        pagination={false}
                        columns={columns}
                        rowKey={record => record.iProdId}
                        loading={loading}
                        dataSource={tableSource}
                        scroll={{ y: 'calc(100vh - 200px)' }} />
                </section>
            </article>
        )
    }
}

export default HomeContent;