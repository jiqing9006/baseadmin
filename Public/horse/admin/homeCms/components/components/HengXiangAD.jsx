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

class HengXiangADModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(JSON.stringify(this.props.item));
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
        let {list = [], icon, name, sec_name} = this.state;

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
            title: '设置 横向滚动广告位 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            <Row>
                <Col span={6}>
                    <div style={{
                        width: 120,
                        height: 120,
                        backgroundImage: `url(${icon})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        border: '1px solid #d9d9d9',
                        borderRadius: 4
                    }}></div>
                </Col>
                <Col span={18}>
                    <Form >
                        <FormItem extra="图片尺寸 45*45" label="模块ICON" hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('icon', {
                                    initialValue: icon || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '图标未上传'
                                        }
                                    ]
                                })(<FormUpload w={45} h={45}
                                               onError={(err) => {
                                                   setFields({
                                                       icon: {
                                                           value: '',
                                                           errors: [new Error(err)]
                                                       }
                                                   })
                                               }}
                                               onDone={(url) => {
                                                   self.setState({icon: url});
                                                   setFieldsValue({
                                                       'icon': url
                                                   });
                                               }}/>)
                            }

                        </FormItem>
                        <FormItem label="一级标题" hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('name', {
                                    initialValue: name || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '一级标题未填写'
                                        },
                                        {
                                            max: 8,
                                            message: '一级标题不能超过8个字'
                                        }
                                    ]
                                })(<Input size="default" onChange={(e) => {
                                    self.setState({name: e.target.value});
                                }}/>)
                            }
                        </FormItem>
                        <FormItem label="二级标题" hasFeedback {...formItemLayout}>
                            {
                                getFieldDecorator('sec_name', {
                                    initialValue: sec_name || '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '二级标题未填写'
                                        },
                                        {
                                            max: 16,
                                            message: '二级标题不能超过16个字'
                                        }
                                    ]
                                })(<Input size="default" onChange={(e) => {
                                    self.setState({sec_name: e.target.value});
                                }}/>)
                            }

                        </FormItem>
                    </Form>
                </Col>
            </Row>
            {
                list.map((d, i) => <div key={i}>
                    <Card title={`ad ${i + 1}`}
                          extra={<span>
                              <a onClick={() => {
                                  list.splice(i, 1);
                                  self.setState({list});
                              }}>删除</a>
                              <span className="ant-divider"/>
                              <a onClick={() => {
                                  if (i == 0) return;
                                  let a = list[i];
                                  list[i] = list[i - 1];
                                  list[i - 1] = a;
                                  self.setState({list: []}, function () {
                                      self.setState({list})
                                  });
                              }}>上移</a>
                              <span className="ant-divider"/>
                              <a onClick={() => {
                                  if (i == list.length - 1) return;
                                  let a = list[i];
                                  list[i] = list[i + 1];
                                  list[i + 1] = a;
                                  self.setState({list: []}, function () {
                                      self.setState({list})
                                  });
                              }}>下移</a>
                          </span>}
                          style={{
                              marginTop: 16,
                              marginBottom: 16
                          }}
                    >
                        <Row>
                            <Col span={6}>
                                <div className="img" style={{
                                    width: 120,
                                    height: 120,
                                    backgroundImage: `url(${d.image})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: 4
                                }}></div>
                            </Col>
                            <Col span={18}>
                                <Form >
                                    <FormItem extra="图片尺寸 220*200" label="图片" hasFeedback {...formItemLayout}>

                                        {
                                            getFieldDecorator(`image_${i}`, {
                                                initialValue: d.image || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '跳转链接未填写'
                                                    }
                                                ]
                                            })(<FormUpload w={220} h={200}
                                                           onError={(err) => {
                                                               setFields({
                                                                   icon: {
                                                                       value: '',
                                                                       errors: [new Error(err)]
                                                                   }
                                                               })
                                                           }}
                                                           onDone={(url) => {
                                                               list[i].image = url;
                                                               self.setState({list});
                                                               let fv = {};
                                                               fv[`image_${i}`] = url;
                                                               setFieldsValue(fv);
                                                           }}/>)
                                        }


                                    </FormItem>
                                    <FormItem label="有效期" hasFeedback {...formItemLayout}>
                                        {getFieldDecorator(`range_data_${i}`, {
                                            initialValue: [moment.unix(d.start_time), moment.unix(d.end_time)],
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
                                                             list[i].start_time = start.unix();
                                                             list[i].end_time = end.unix();
                                                             self.setState({list});
                                                         }}
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`link_${i}`, {
                                                initialValue: d.link || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '跳转链接未填写'
                                                    }
                                                ]
                                            })(<Input size="default" onChange={(e) => {
                                                list[i].link = e.target.value;
                                                self.setState({list});
                                            }}/>)
                                        }
                                    </FormItem>
                                    <FormItem label="跳转链接 app" hasFeedback {...formItemLayout}>
                                        {
                                            getFieldDecorator(`wx_link_${i}`, {
                                                initialValue: d.wx_link || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '跳转链接未填写'
                                                    }
                                                ]
                                            })(<Input size="default" onChange={(e) => {
                                                list[i].wx_link = e.target.value;
                                                self.setState({list});
                                            }}/>)
                                        }
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>

                    </Card>
                </div>)
            }
            {
                list.length < 16 ? <Button type="dashed" style={{width: '60%', margin: '0 auto', display: 'block'}}
                                           onClick={() => {
                                               list.push({
                                                   image: '',
                                                   link: '',
                                                   wx_link: '',
                                                   start_time: start_time(moment()),
                                                   end_time: end_time(moment()),
                                                   is_range: 1
                                               });
                                               self.setState({
                                                   list
                                               })
                                           }}
                >
                    <Icon type="plus"/> 添加广告
                </Button> : ''
            }

        </Modal>
    }
}

const HengXiangADFrom = Form.create()(HengXiangADModal);

class HengXiangAD extends React.Component {
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
            <CmsBaseComponent {...this.props} name={data.name ? `横向滚动广告位(${data.name})` : "横向滚动广告位"} onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <HengXiangADFrom {...FormProps}/> : ''}
        </div>
    }
}

export default HengXiangAD;