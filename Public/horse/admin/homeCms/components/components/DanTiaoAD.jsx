import React from 'react'
import CmsBaseComponent from './CmsBaseComponent'
import {Modal, Input, Upload, Button, Icon, Form, Card, Row, Col, DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker;
import FormUpload from '../FormUpload'
const FormItem = Form.Item;
import moment from 'moment'
import {start_time, end_time} from '../util'
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

class DanTiaoADModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.props.item));
        if (!this.state.start_time) {
            this.state.start_time = start_time(moment())
        }
        if (!this.state.end_time) {
            this.state.end_time = end_time(moment())
        }
        if (!this.state.is_range) {
            this.state.is_range = 1
        }
    }

    render() {
        let self = this;
        let {
            visible, onCancel, onOk, confirmLoading, form: {
                getFieldDecorator,
                validateFields,
                setFieldsValue,
                setFields
            }
        } = this.props;
        let {
            image = '', link = '', wx_link = '', start_time, end_time
        } = this.state;

        function handleOk() {
            validateFields((errors) => {
                if (errors) {
                    return
                }
                onOk(self.state);
            })
        }

        const modelProps = {
            visible,
            title: '设置 单条广告位 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Form >
                <FormItem extra="图片尺寸 750*150" label="图片" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('image', {
                            initialValue: image || '',
                            rules: [
                                {
                                    required: true,
                                    message: '图标未上传'
                                }
                            ]
                        })(<FormUpload w={750} h={150}
                                       onError={(err) => {
                                           setFields({
                                               image: {
                                                   value: '',
                                                   errors: [new Error(err)]
                                               }
                                           })
                                       }}
                                       onDone={(url) => {
                                           self.setState({image: url});
                                           setFieldsValue({image: url});
                                       }}/>)
                    }
                </FormItem>
                <FormItem label="有效期" hasFeedback {...formItemLayout}>
                    {getFieldDecorator(`range_data`, {
                        initialValue: [moment.unix(start_time), moment.unix(end_time)],
                        rules: [
                            {
                                required: true,
                                message: '有效期未选择'
                            }
                        ]
                    })(
                        <RangePicker allowClear={false} showTime={{
                            format: 'HH'
                        }} format="YYYY-MM-DD HH时"
                                     onChange={(dates) => {
                                         let [start, end] = dates;
                                         self.setState({
                                             start_time: start.unix(),
                                             end_time: end.unix()
                                         });
                                     }}
                        />
                    )}
                </FormItem>
                <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('link', {
                            initialValue: link || '',
                            rules: [
                                {
                                    required: true,
                                    message: '跳转链接未设置'
                                }
                            ]
                        })(<Input onChange={(e) => {
                            self.setState({link: e.target.value});
                        }}/>)
                    }
                </FormItem>
                <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('wx_link', {
                            initialValue: wx_link || '',
                            rules: [
                                {
                                    required: true,
                                    message: '跳转链接未设置'
                                }
                            ]
                        })(<Input onChange={(e) => {
                            self.setState({wx_link: e.target.value});
                        }}/>)
                    }
                </FormItem>
                <FormItem label="图片" {...formItemLayout}>
                    <div className="img" style={{
                        width: 350,
                        height: 75,
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid #d9d9d9',
                        borderRadius: 4
                    }}></div>
                </FormItem>

            </Form>
        </Modal>
    }
}

const DanTiaoADForm = Form.create()(DanTiaoADModal);

class DanTiaoAD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        let self = this;
        let {visible} = this.state;
        let {onSetData, data = {}} = this.props;
        let FormProps = {
            visible,
            onCancel(){
                self.setState({
                    visible: false
                });
            },
            onOk(data){
                onSetData(data);
                self.setState({
                    visible: false
                });
            },
            item: {...data}
        };

        return <div>
            <CmsBaseComponent {...this.props} name="单条广告位" onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <DanTiaoADForm {...FormProps}/> : ''}
        </div>
    }
}

export default DanTiaoAD;