import React, { Component } from 'react';

import SelectRadio from 'components/SelectRadio/index';
import SelectTags from 'components/SelectTags/index';
import SelectCascade from 'components/SelectCascade/index';
import ExportButton from 'components/ExportButton/index';

import { Table, Form, Divider, Button } from 'antd';

require('./index.less');

class HomeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            tableSource: props.tableSource,
            filteredInfo: {},
            selectedRowKeys: [], // Check here to configure the default column
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

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    genExpandedRow = (record) => {
        return (<span>
            <a target='_blank' key={1} href={decodeURIComponent(record.sProdImgNo_2).replace('jpg/200', 'jpg/0')}>1024×768</a>
            <Divider type="vertical" />
            <a target='_blank' key={2} href={decodeURIComponent(record.sProdImgNo_3).replace('jpg/200', 'jpg/0')}>1280×720</a>
            <Divider type="vertical" />
            <a target='_blank' key={3} href={decodeURIComponent(record.sProdImgNo_4).replace('jpg/200', 'jpg/0')}>1280×1024</a>
            <Divider type="vertical" />
            <a target='_blank' key={4} href={decodeURIComponent(record.sProdImgNo_5).replace('jpg/200', 'jpg/0')}>1440×900</a>
            <Divider type="vertical" />
            <a target='_blank' key={5} href={decodeURIComponent(record.sProdImgNo_6).replace('jpg/200', 'jpg/0')}>1920×1080</a>
            <Divider type="vertical" />
            <a target='_blank' key={6} href={decodeURIComponent(record.sProdImgNo_7).replace('jpg/200', 'jpg/0')}>1920×1200</a>
            <Divider type="vertical" />
            <a target='_blank' key={7} href={decodeURIComponent(record.sProdImgNo_8).replace('jpg/200', 'jpg/0')}>1920×1440</a>
        </span>)
    }

    render() {
        let { tableSource, loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        let self = this;

        console.log('tableSource', tableSource);

        const columns = [{
            title: '封面图',
            dataIndex: 'sThumbURL',
            width: 160,
            // filteredValue: filteredInfo.platform || null,
            render: (text, record) => {
                const name = decodeURIComponent(record.sProdName);
                return <img className='thumb' title={name} alt={name} src={decodeURIComponent(text)} />;
            }
        }, {
            title: '发布时间',
            dataIndex: 'dtInputDT',
            width: 140,
            render: (text) => {
                return decodeURIComponent(text);
            }
        }, {
            title: '英雄名称',
            dataIndex: 'sHeroName',
            width: 160,
            render: (text, record) => {
                return decodeURIComponent(record.sProdName).split('-')[0];
            }
        }, {
            title: '皮肤名称',
            dataIndex: 'sSkinName',
            width: 160,
            render: (text, record) => {
                return decodeURIComponent(record.sProdName).split('-')[1];
            }
        },
            // {
            //     title: '查看',
            //     dataIndex: 'sProdImgNo',
            //     // width: 450,
            //     // filteredValue: filteredInfo.category || null,
            //     render: (text, record) => {
            //         return(<span>
            //             <a target='_blank' key={1} href={decodeURIComponent(record.sProdImgNo_1)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={2} href={decodeURIComponent(record.sProdImgNo_2)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={3} href={decodeURIComponent(record.sProdImgNo_3)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={4} href={decodeURIComponent(record.sProdImgNo_4)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={5} href={decodeURIComponent(record.sProdImgNo_5)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={6} href={decodeURIComponent(record.sProdImgNo_6)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={7} href={decodeURIComponent(record.sProdImgNo_7)}>1920×1240</a>
            //             <Divider type="vertical" />
            //             <a target='_blank' key={8} href={decodeURIComponent(record.sProdImgNo_8)}>1920×1240</a>
            //         </span>)
            //     }
            // }
        ];

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

                <div style={{ marginBottom: 16 }}>
                    <Button
                        type="primary"
                        onClick={this.start}
                        disabled={!hasSelected}
                        loading={loading}
                    >
                        下载
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>

                <section className="content-main">

                    <Table
                        className="home-content-table"
                        size='middle'
                        pagination={false}
                        rowSelection={rowSelection}
                        columns={columns}
                        rowKey={record => record.iProdId}
                        loading={loading}
                        dataSource={tableSource}
                        expandedRowRender={record => <div style={{ margin: 0 }}>{this.genExpandedRow(record)}</div>}
                        scroll={{ y: 'calc(100vh - 200px)' }}
                        locale={{
                            emptyText: '暂无数据',
                        }}
                    />

                </section>
            </article>
        )
    }
}

export default HomeContent;