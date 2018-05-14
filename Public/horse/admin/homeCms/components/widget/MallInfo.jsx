import React from 'react'
import Widget from './Widget'


class MallInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {onStart, onEnd} = this.props;
        return <Widget name="商品特色" onStart={onStart} onEnd={onEnd}/>
    }

    componentDidMount() {

    }
}

export default MallInfo;