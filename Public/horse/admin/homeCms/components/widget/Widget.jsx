import React from 'react'

class Widget extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {name, onStart, onEnd} = this.props;

        return <div className="widget"
                    draggable={true}
                    onDragEnd={(e) => {
                        onEnd && onEnd(e);
                    }}
                    onDragStart={(e) => {
                        onStart && onStart(e);
                    }}
        >
            {name}
        </div>
    }

    componentDidMount() {

    }
}

export default Widget;