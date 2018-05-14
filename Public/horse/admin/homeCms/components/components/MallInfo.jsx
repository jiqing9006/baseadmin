import React from 'react'
import CmsBaseComponent from './CmsBaseComponent'
import {Modal, Input, Upload, Button, Icon, Form, Card, Row, Col} from 'antd'
import FormUpload from '../FormUpload'
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
            list = [
                {image: '', word: ''},
                {image: '', word: ''},
                {image: '', word: ''},
            ]
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
            title: '设置 商品特色 数据',
            onCancel,
            width: 800,
            onOk: handleOk,
            confirmLoading,
            maskClosable: false
        };
        return <Modal {...modelProps}>
            {
                list.map((d, i) => <Card title={`第${i + 1}个`}
                                         key={i}
                                         style={{
                                             marginTop: 16,
                                             marginBottom: 16
                                         }}>
                    <Row>
                        <Col span={4}>
                            <div className="img" style={{
                                width: 70,
                                height: 70,
                                backgroundImage: `url(${d.image})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                border: '1px solid #d9d9d9',
                                borderRadius: 4
                            }}></div>
                        </Col>
                        <Col span={20}>
                            <Form >
                                <FormItem extra="图片尺寸 40*40" label="图片" hasFeedback {...formItemLayout}>
                                    {
                                        getFieldDecorator(`image_${i}`, {
                                            initialValue: d.image || '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '图标未上传'
                                                }
                                            ]
                                        })(<FormUpload w={40} h={40}
                                                       onError={(err) => {
                                                           setFields({
                                                               s1_image: {
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
                                                           setFieldsValue(fv)
                                                       }}/>)
                                    }
                                </FormItem>
                                <FormItem label="特色名称" hasFeedback {...formItemLayout}>
                                    {
                                        getFieldDecorator(`name_${i}`, {
                                            initialValue: d.name || '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '特色名称未填写'
                                                },
                                                {
                                                    max: 4,
                                                    message: '特色名称不能超过4个字'
                                                }
                                            ]
                                        })(<Input size="default" onChange={(e) => {
                                            list[i].name = e.target.value;
                                            self.setState({list});
                                        }}/>)
                                    }
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>)
            }
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
            <CmsBaseComponent {...this.props} name="商品特色" onEdit={() => {
                self.setState({
                    visible: true
                });
            }}/>
            {visible ? <SiGeADForm {...FormProps}/> : ''}
        </div>
    }
}

export default SiGeAD;