import React, { Component } from 'react';
import { resolutionList } from 'constants';
import saveAs from 'file-saver';
import utils from 'plugins/utils';

import SelectRadio from 'components/SelectRadio/index';
import SelectTags from 'components/SelectTags/index';
import SelectCascade from 'components/SelectCascade/index';

import { downloadImage, getImageBlob } from 'plugins/utils';

import { Table, Form, Divider, Button, Input, Modal, Radio, Select, Icon, message } from 'antd';

const FormItem = Form.Item;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

require('./index.less');

class HomeContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading,
            tableSource: props.tableSource,
            filteredInfo: {},
            sortedInfo: {},
            selectedRowKeys: [],
            selectedRows: [],
            pagination: props.pagination,
            modalVisible: false,
            resolutionIndex: props.resolutionIndex,
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

    // 分页点击
    handleTableChange = (pagination, filters, sorter) => {        
        if (this.props.pagination.current !== pagination.current) {
            this.props.fetchTableSource({
                page: pagination.current - 1,
            })
        }
    };

    // 筛选框
    handleFilterChange = (type, dataIndex, value) => {
        this.setState({
            filteredInfo: Object.assign(this.state.filteredInfo, { [dataIndex]: value }),
        }, () => {
            this.props.fetchTableSource(this.state.filteredInfo);
        });
    };


    // 表格中多余内容
    genExpandedRow = (record) => {
        if (!record) {
            return null;
        } else {
            const domList = [];
            for(let i = 0; i < resolutionList.length; i++) {
                const resolution = resolutionList[i];

                const item = ( i !== resolutionList.length - 1
                    ? <span key={i}>
                        <a target='_blank' key={i} href={ record[`sProdImgNo_${i + 2}`].replace('jpg/200', 'jpg/0')}>{`${resolution.width}×${resolution.height}`}</a>
                        <Divider type="vertical" />
                    </span>
                    : <a target='_blank' key={i} href={ record[`sProdImgNo_${i + 2}`].replace('jpg/200', 'jpg/0')}>{`${resolution.width}×${resolution.height}`}</a>
                )

                domList.push(item);
            }
            return domList;
        }
    }

    // 选择某一列
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows,
        });
    }

    // 渲染下载封面模态框中的选择框
    renderModalSelect = () => {

        const domList = [];
        const { resolutionIndex } = this.props;
        const sWidth = window.screen.width;
        const sHeight = window.screen.height;

        for(let i = 0; i < resolutionList.length; i++) {
            const resolution = resolutionList[i];

            const item = (
                <Option key={i} value={i}>{`${resolution.width}×${resolution.height}`}</Option>
            )
            domList.push(item);
        }

        return (
            <div className='modal-download'>
                <Form layout='inline'>
                    <FormItem label='请选择分辨率'>
                        <Select 
                            defaultValue={resolutionIndex === null ? 0 : resolutionIndex}
                            style={{width: 120}}
                            onChange={this.handleModalSelectChange}>{domList}
                        </Select>
                    </FormItem>
                </Form>
                <p>
                    <Icon type="info-circle" style={{marginRight: 8}}/>
                    <span>您当前设备的分辨率为<span className='color-red'>{`${sWidth}×${sHeight}`}</span></span>
                </p>
            </div>
        )
    }

    // 下载封面模态框中的选择框
    handleModalSelectChange = (value) => {
        this.setState({
            resolutionIndex: value,
        })
    }

    // 展示下载封面模态框
    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    }

    // 从selectedRows中提取出需要下载的图片地址列表
    formatImgList = (rows, index = 0) => {
        const resolution = resolutionList[index];
        const imgList = rows.map(item => {
            return {
                name: `${item.sHeroName}-${item.sSkinName}`,
                uri: item[`sProdImgNo_${index + 2}`].replace('jpg/200', 'jpg/0'),
            }
        });
        return {
            resolution,
            imgList,
        }
    }

    // 下载封面模态框中的确认按钮
    handleModalOk = async () => {

        const { resolution, imgList } = this.formatImgList(this.state.selectedRows, this.state.resolutionIndex);

        // saveAs(imgList[0].uri, "image.jpg");
        // const result = encodeRemoteImage(imgList[0]);
        // console.log('result------', result);
        message.info('开发中，敬请期待...');


        // const imgJson = await utils.requestFetch('/api/image/', true, {
        //     uri: imgList[0].uri,
        // });

        // if (imgJson) {
        //     console.log(imgJson);
        // }

        // downloadImage(imgList[0].uri);


        // getImageBlob(imgList[0].uri, function(res) {
        //     console.log('res======', res);
        // });
    }

    // 下载封面模态框中的取消按钮
    handleModalCancel = (e) => {
        this.setState({
          modalVisible: false,
        });
    }

    render() {
        let self = this;        
        let { tableSource, loading, selectedRowKeys, filteredInfo, sortedInfo } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const { heroNameList, selectionList } = this.props;

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
            
        }, {
            title: '英雄名称',
            dataIndex: 'sHeroName',
            width: 160,
            
        }, {
            title: '皮肤名称',
            dataIndex: 'sSkinName',
            width: 160,
        }];

        console.log('state', this.state);

        return (
            <article className="home-content-container">
                
                <div className='home-header' style={{ marginBottom: 16 }}>

                    <div className='download-box'>
                        <Button
                            type="primary"
                            onClick={this.showModal}
                            disabled={!hasSelected}
                            // loading={loading}
                        >
                            下载
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `已选择 ${selectedRowKeys.length} 张` : ''}
                        </span>
                    </div>

                    <Form className="content-selection" layout="inline">

                        {selectionList.map(function (item, index) {
                            switch (item.type) {
                                case 'radio':
                                    return <SelectRadio datum={item} key={index} handleChange={self.handleFilterChange}/>;
                                    break;
                                case 'tags':
                                    return <SelectTags datum={item} key={index} handleChange={self.handleFilterChange}/>;
                                    break;
                                case 'cascade':
                                    return <SelectCascade datum={item} key={index} handleChange={self.handleFilterChange}/>;
                            }
                        })}

                    </Form>

                    <Search className="search"
                        placeholder='输入英雄/皮肤名称'
                        style={{width: 200}}
                        enterButton
                        onSearch={ value => this.props.onSearch(value)}
                    />
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
                        scroll={{ y: 'calc(100vh - 270px)' }}
                        locale={{
                            emptyText: '暂无数据',
                        }}
                    />

                </section>

                <Modal
                    title="下载封面"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modalVisible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    {this.renderModalSelect()}
                </Modal>
            </article>
        )
    }
}

export default HomeContent;