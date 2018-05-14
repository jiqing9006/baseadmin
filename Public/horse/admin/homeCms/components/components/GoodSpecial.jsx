import React from 'react'
import CmsBaseComponent from './CmsBaseComponent'
import {Modal, Input, Upload, Button, Icon, Form, Card, Row, Col, DatePicker} from 'antd'
const RangePicker = DatePicker.RangePicker;
import FormUpload from '../FormUpload'
const FormItem = Form.Item;
import moment from 'moment'
import {start_time, end_time} from '../util'
import HomeCms from '../../service/homeCms'

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

class GoodSpecialModal extends React.Component {
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
                getFieldValue,
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
            title: '设置 商品专题 数据',
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
                    <Form>
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
                    <Card title={`图文 ${i + 1}`}
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
                                    width: 170,
                                    height: 170,
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
                                    <FormItem extra="图片尺寸 750*400" label="图片" hasFeedback {...formItemLayout}>

                                        {
                                            getFieldDecorator(`image_${i}`, {
                                                initialValue: d.image || '',
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '图片未上传'
                                                    }
                                                ]
                                            })(<FormUpload w={750} h={400}
                                                           onError={(err) => {
                                                               let fields = {};
                                                               fields[`image_${i}`] = {
                                                                   value: '',
                                                                   errors: [new Error(err)]
                                                               };
                                                               setFields(fields);
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
                                </Form>
                                <Form layout="inline">
                                    <FormItem label="商品id" labelCol={{span: 12}} wrapperCol={{span: 12}} style={{width: '50%'}}>
                                        {
                                            getFieldDecorator(`good_id_${i}`)(<Input size="default"/>)
                                        }
                                    </FormItem>
                                    <FormItem>
                                        <Button size="default" onClick={() => {
                                            let good_id = getFieldValue(`good_id_${i}`);
                                            console.log(good_id);
                                            HomeCms.getHomeGood({id: good_id}).then(d => {
                                                let {data} = d;
                                                let {id} = data;
                                                if (id) {
                                                    list[i].goods.push(data);
                                                    self.setState({list});
                                                } else {
                                                    alert('无此商品');
                                                }
                                            }).catch(() => {
                                                alert('网络错误');
                                            });
                                        }}>添加商品</Button>
                                    </FormItem>
                                </Form>
                                {
                                    d.goods.map((d, j) => {
                                        return <div key={j}>
                                            <Row>
                                                <Col span={3}>
                                                    <div className="img" style={{
                                                        width: 50,
                                                        height: 50,
                                                        backgroundImage: `url(${d.img_list})`,
                                                        backgroundSize: 'contain',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat',
                                                        border: '1px solid #d9d9d9',
                                                        borderRadius: 4
                                                    }}></div>
                                                </Col>
                                                <Col span={15}>
                                                    <div>{d.id}</div>
                                                    <div>{d.name}</div>
                                                    <div>￥{d.price}</div>
                                                </Col>
                                                <Col span={6}>
                                                    <Button onClick={() => {
                                                        list[i].goods.splice(j, 1);
                                                        self.setState({list});
                                                    }}>删除</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    })
                                }
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
                                                   goods: [],
                                                   start_time: start_time(moment()),
                                                   end_time: end_time(moment()),
                                                   is_range: 1
                                               });
                                               self.setState({
                                                   list
                                               })
                                           }}
                >
                    <Icon type="plus"/> 添加图文
                </Button> : ''
            }
        </Modal>
    }
}

const GoodSpecialForm = Form.create()(GoodSpecialModal);

class GoodSpecial extends React.Component {
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
            <CmsBaseComponent {...this.props} name={data.name ? `商品专题(${data.name})` : "商品专题"} onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <GoodSpecialForm {...FormProps}/> : ''}
        </div>
    }
}

export default GoodSpecial;