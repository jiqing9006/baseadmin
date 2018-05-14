import React from 'react'
import './cmsContainer.scss'
import CMSFrame from './frame/Frame'

import modules from './config'

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentComponent: '',
            is_drag: false,
            currentName: 'pinpaiqiang',
            id: ''
        }
    }

    render() {
        let self = this;

        let {onChange, cmsData} = this.props;
        return <div className="container">
            <div className="left">
                {
                    Object.keys(modules).map((d, i) => {
                        let Block = modules[d].widget;
                        return <Block key={i}
                                      onStart={(e) => {
                                          if (d == 'mallinfo' || d == 'icon' || d == 'pinpaiqiang') {
                                              let flag = false;
                                              for (let j = 0; j < cmsData.length; j++) {
                                                  if (cmsData[j].name == d) {
                                                      flag = true;
                                                      break;
                                                  }
                                              }

                                              if (flag) {
                                                  e.preventDefault();
                                                  alert('此模块只能添加一个');
                                                  return;
                                              }
                                          }

                                          self.setState({
                                              is_drag: true,
                                              currentName: d,
                                          })
                                      }}
                                      onEnd={() => {
                                          self.setState({
                                              is_drag: false
                                          })
                                      }}
                        />
                    })
                }
            </div>
            <div className="right">
                <CMSFrame {...self.state} cmsData={cmsData} onChange={(data) => {
                    onChange(data);
                }}/>
            </div>
            {/*<div className="output">*/}
            {/*{JSON.stringify(cmsData)}*/}
            {/*</div>*/}
        </div>
    }

    componentDidMount() {

    }
}

export default Container;