import React from 'react'
import {Upload, Button, Icon} from 'antd'
const Q = require('q');

class FormUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    onChange(e) {
        return '';
    }

    render() {
        let {onDone, onError, w = 0, h = 0} = this.props;
        return (
            <Upload multiple={false}
                    showUploadList={false}
                    action='/admin.php/Upload/index'
                    beforeUpload={(file) => {
                        let defer = Q.defer();

                        let reader = new FileReader();

                        reader.onload = function (e) {
                            let data = e.target.result;
                            //加载图片获取图片真实宽度和高度
                            let image = new Image();
                            image.onload = function () {
                                let width = image.width;
                                let height = image.height;
                                if (w != 0 && width != w) {
                                    onError('图片尺寸错误');
                                    defer.reject();
                                } else if (h != 0 && height != h) {
                                    onError('图片尺寸错误');
                                    defer.reject();
                                } else {
                                    defer.resolve();
                                }

                            };
                            image.src = data;
                        };
                        reader.readAsDataURL(file);
                        return defer.promise;
                    }}
                    name="upfile"
                    onChange={({file}) => {
                        console.log(file.status);
                        if (file.status == 'done') {
                            let {response} = file;
                            if (response.state == 'SUCCESS') {
                                onDone(response.url);
                            } else {
                                onError(response.state);
                            }
                        } else if (file.status == 'error') {
                            onError('上传失败');
                        }
                    }}
            >
                <Button size="default"><Icon type="upload"/> 上传图片</Button>
            </Upload>
        )
    }
}

export default FormUpload;