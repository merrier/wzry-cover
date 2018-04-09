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
            filteredInfo: null,
            sortedInfo: null,
            selectedRowKeys: [],
            pagination: props.pagination,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading !== this.props.loading) {
            this.setState({
                loading: nextProps.loading,
                tableSource: nextProps.tableSource,
                pagination: nextProps.pagination,
            });
        }
    }

    handleTableChange = (pagination, filters, sorter) => {        
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
        if (this.props.pagination.current !== pagination.current) {
            this.props.fetchTableSource({
                current: pagination.current,
            })
        }
    };

    // handleChange = (type, dataIndex, value) => {

    //     switch (type) {
    //         case 'radio':
    //             this.setState({
    //                 filteredInfo: Object.assign(this.state.filteredInfo, { [dataIndex]: [value] })
    //             });
    //             break;
    //         case 'cascade':
    //         case 'tags':
    //             this.setState({
    //                 filteredInfo: Object.assign(this.state.filteredInfo, { [dataIndex]: value })
    //             });
    //             break;
    //     }
    // };

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    genExpandedRow = (record) => {
        return (<span>
            <a target='_blank' key={1} href={ record.sProdImgNo_2.replace('jpg/200', 'jpg/0')}>1024×768</a>
            <Divider type="vertical" />
            <a target='_blank' key={2} href={ record.sProdImgNo_3.replace('jpg/200', 'jpg/0')}>1280×720</a>
            <Divider type="vertical" />
            <a target='_blank' key={3} href={ record.sProdImgNo_4.replace('jpg/200', 'jpg/0')}>1280×1024</a>
            <Divider type="vertical" />
            <a target='_blank' key={4} href={ record.sProdImgNo_5.replace('jpg/200', 'jpg/0')}>1440×900</a>
            <Divider type="vertical" />
            <a target='_blank' key={5} href={ record.sProdImgNo_6.replace('jpg/200', 'jpg/0')}>1920×1080</a>
            <Divider type="vertical" />
            <a target='_blank' key={6} href={ record.sProdImgNo_7.replace('jpg/200', 'jpg/0')}>1920×1200</a>
            <Divider type="vertical" />
            <a target='_blank' key={7} href={ record.sProdImgNo_8.replace('jpg/200', 'jpg/0')}>1920×1440</a>
        </span>)
    }

    render() {
        let self = this;        
        let { tableSource, loading, selectedRowKeys, filteredInfo, sortedInfo } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const { heroNameList } = this.props;

        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '封面图',
            dataIndex: 'sThumbURL',
            width: 160,
            // filteredValue: filteredInfo.platform || null,
            render: (text, record) => {
                const name = record.sProdName;
                return <img className='thumb' title={name} alt={name} src={text} />;
            }
        }, {
            title: '发布时间',
            dataIndex: 'dtInputDT',
            width: 140,
            sorter: (a, b) => {
                return (new Date(a.dtInputDT.replace(/-/g, '/')).getTime() - new Date(b.dtInputDT.replace(/-/g, '/')).getTime())
            },
            sortOrder: sortedInfo.columnKey === 'dtInputDT' && sortedInfo.order,
        }, {
            title: '英雄名称',
            dataIndex: 'sHeroName',
            width: 160,
            sorter: (a, b) => {
                return a.sHeroName > b.sHeroName;
            },
            sortOrder: sortedInfo.columnKey === 'sHeroName' && sortedInfo.order,
        }, {
            title: '皮肤名称',
            dataIndex: 'sSkinName',
            width: 160,
            sorter: (a, b) => {
                return a.sSkinName > b.sSkinName;
            },
            sortOrder: sortedInfo.columnKey === 'sSkinName' && sortedInfo.order,
        }];

        // const paginationSettings = {
        //     pageSize: 20,
        //     // pageSizeOptions: ['10', '15', '20'],
        //     defaultCurrent: 1,
        //     size: 'large',
        //     showTotal: (total) => {
        //       return `共 ${total} 条数据`;
        //     },
        //     // showSizeChanger: true,
        // };

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
                        pagination={this.props.pagination}
                        rowSelection={rowSelection}
                        columns={columns}
                        rowKey={record => record.iProdId}
                        loading={loading}
                        dataSource={tableSource}
                        onChange={this.handleTableChange}
                        expandedRowRender={record => <div style={{ margin: 0 }}>{this.genExpandedRow(record)}</div>}
                        scroll={{ y: 'calc(100vh - 265px)' }}
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