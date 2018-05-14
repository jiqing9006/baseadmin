import React from 'react'
import CmsBaseComponent from './CmsBaseComponent'
import {Modal, Input, Upload, Button, Icon, Form, Card, Row, Col, DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker;
import FormUpload from '../FormUpload'
import moment from 'moment'
import {start_time, end_time} from '../util'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

class SiGeADModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.props.item));

        let {
            s1 = {image: '', link: '', wx_link: '', is_range: 1, start_time: start_time(moment()), end_time: end_time(moment())},
            s2 = {image: '', link: '', wx_link: '', is_range: 1, start_time: start_time(moment()), end_time: end_time(moment())},
            s3 = {image: '', link: '', wx_link: '', is_range: 1, start_time: start_time(moment()), end_time: end_time(moment())},
            s4 = {image: '', link: '', wx_link: '', is_range: 1, start_time: start_time(moment()), end_time: end_time(moment())}
        } = this.state;
        this.state = {
            s1, s2, s3, s4
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
        let {s1, s2, s3, s4} = this.state;

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
            title: '设置 四格广告位 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Card title='左区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s1.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem extra="图片尺寸 290*350" label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s1_image', {
                                        initialValue: s1.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<FormUpload w={290} h={350}
                                                   onError={(err) => {
                                                       setFields({
                                                           s1_image: {
                                                               value: '',
                                                               errors: [new Error(err)]
                                                           }
                                                       })
                                                   }}
                                                   onDone={(url) => {
                                                       s1.image = url;
                                                       self.setState({s1});
                                                       setFieldsValue({
                                                           's1_image': url
                                                       })
                                                   }}/>)
                                }
                            </FormItem>
                            <FormItem label="有效期" hasFeedback {...formItemLayout}>
                                {getFieldDecorator(`s1_range_data`, {
                                    initialValue: [moment.unix(s1.start_time), moment.unix(s1.end_time)],
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
                                                     s1.start_time = start.unix();
                                                     s1.end_time = end.unix();
                                                     self.setState({s1});
                                                 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s1_link', {
                                        initialValue: s1.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s1.link = e.target.value;
                                        self.setState({s1});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s1_wx_link', {
                                        initialValue: s1.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s1.wx_link = e.target.value;
                                        self.setState({s1});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Card title='右上区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s2.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem extra="图片尺寸 460*175" label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s2_image', {
                                        initialValue: s2.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<FormUpload w={460} h={175}
                                                   onError={(err) => {
                                                       setFields({
                                                           s2_image: {
                                                               value: '',
                                                               errors: [new Error(err)]
                                                           }
                                                       })
                                                   }}
                                                   onDone={(url) => {
                                                       s2.image = url;
                                                       self.setState({s2});
                                                       setFieldsValue({
                                                           's2_image': url
                                                       })
                                                   }}/>)
                                }
                            </FormItem>
                            <FormItem label="有效期" hasFeedback {...formItemLayout}>
                                {getFieldDecorator(`s2_range_data`, {
                                    initialValue: [moment.unix(s2.start_time), moment.unix(s2.end_time)],
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
                                                     s2.start_time = start.unix();
                                                     s2.end_time = end.unix();
                                                     self.setState({s2});
                                                 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s2_link', {
                                        initialValue: s2.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s2.link = e.target.value;
                                        self.setState({s2});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s2_wx_link', {
                                        initialValue: s2.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s2.wx_link = e.target.value;
                                        self.setState({s2});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Card title='右下左区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s3.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem extra="图片尺寸 230*175" label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s3_image', {
                                        initialValue: s3.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<FormUpload w={230} h={175}
                                                   onError={(err) => {
                                                       setFields({
                                                           s3_image: {
                                                               value: '',
                                                               errors: [new Error(err)]
                                                           }
                                                       })
                                                   }}
                                                   onDone={(url) => {
                                                       s3.image = url;
                                                       self.setState({s3});
                                                       setFieldsValue({
                                                           's3_image': url
                                                       })
                                                   }}/>)
                                }
                            </FormItem>

                            <FormItem label="有效期" hasFeedback {...formItemLayout}>
                                {getFieldDecorator(`s3_range_data`, {
                                    initialValue: [moment.unix(s3.start_time), moment.unix(s3.end_time)],
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
                                                     s3.start_time = start.unix();
                                                     s3.end_time = end.unix();
                                                     self.setState({s3});
                                                 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s3_link', {
                                        initialValue: s3.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s3.link = e.target.value;
                                        self.setState({s3});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s3_wx_link', {
                                        initialValue: s3.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s3.wx_link = e.target.value;
                                        self.setState({s3});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Card title='右下右区'
                  style={{
                      marginTop: 16,
                      marginBottom: 16
                  }}>
                <Row>
                    <Col span={6}>
                        <div className="img" style={{
                            width: 120,
                            height: 120,
                            backgroundImage: `url(${s4.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4
                        }}></div>
                    </Col>
                    <Col span={18}>
                        <Form >
                            <FormItem extra="图片尺寸 230*175" label="图片" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s4_image', {
                                        initialValue: s4.image || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '图标未上传'
                                            }
                                        ]
                                    })(<FormUpload w={230} h={175}
                                                   onError={(err) => {
                                                       setFields({
                                                           s4_image: {
                                                               value: '',
                                                               errors: [new Error(err)]
                                                           }
                                                       })
                                                   }}
                                                   onDone={(url) => {
                                                       s4.image = url;
                                                       self.setState({s4});
                                                       setFieldsValue({
                                                           's4_image': url
                                                       })
                                                   }}/>)
                                }
                            </FormItem>
                            <FormItem label="有效期" hasFeedback {...formItemLayout}>
                                {getFieldDecorator(`s4_range_data`, {
                                    initialValue: [moment.unix(s4.start_time), moment.unix(s4.end_time)],
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
                                                     s4.start_time = start.unix();
                                                     s4.end_time = end.unix();
                                                     self.setState({s4});
                                                 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s4_link', {
                                        initialValue: s4.link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s4.link = e.target.value;
                                        self.setState({s4});
                                    }}/>)
                                }
                            </FormItem>
                            <FormItem label="跳转链接 web" hasFeedback {...formItemLayout}>
                                {
                                    getFieldDecorator('s4_wx_link', {
                                        initialValue: s4.wx_link || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '跳转链接未填写'
                                            }
                                        ]
                                    })(<Input size="default" onChange={(e) => {
                                        s4.wx_link = e.target.value;
                                        self.setState({s4});
                                    }}/>)
                                }
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Modal>
    }
}

const SiGeADForm = Form.create()(SiGeADModal);

class SiGeAD extends React.Component {
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
            <CmsBaseComponent {...this.props} name="四格广告位" onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <SiGeADForm {...FormProps}/> : ''}
        </div>
    }
}

export default SiGeAD;