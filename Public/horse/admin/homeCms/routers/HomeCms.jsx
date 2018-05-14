import React from 'react'
import {connect} from 'dva'
import CmsContainer from '../components/Container'
import {Button, Row, Col} from 'antd'


class HomeCms extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {homeCms, dispatch} = this.props;
        let {cms} = homeCms;
        return <div style={{
            padding: 24
        }}>
            <Row style={{
                marginBottom: 24,
            }}>
                <Col>
                    <Button type='primary' style={{
                        marginRight: 8
                    }} onClick={() => {
                        dispatch({type: 'homeCms/setData'});
                    }}>保存</Button>
                    <Button onClick={() => {
                        dispatch({type: 'homeCms/payload', payload: {cms: []}});
                    }}>清空</Button>
                </Col>
            </Row>
            <CmsContainer cmsData={cms} onChange={(data) => {
                dispatch({type: 'homeCms/payload', payload: {cms: data}});
            }}/>
        </div>
    }

    componentDidMount() {
        let {dispatch} = this.props;
        dispatch({type: 'homeCms/init'});
    }
}

export default connect(({homeCms}) => ({homeCms}))(HomeCms)