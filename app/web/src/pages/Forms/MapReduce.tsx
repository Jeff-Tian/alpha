import {Col, Input, Row} from 'antd'
import {connect} from 'dva'
import React, {PureComponent} from 'react'

@connect(({mapReduce}) => ({state: mapReduce}))
export default class MapReduce extends PureComponent {
  render() {
    // tslint:disable-next-line:no-console
    console.log('props = ', this.props)
    return (
      <div>
        <Row gutter={8}>
          <Col span={8}>
            <p>Map</p>
            <Input.TextArea
              placeholder="Autosize height based on content lines"
              autosize
              // value={this.props.map.join('\n')}
            />
          </Col>
          <Col span={8}>
            <p>Reducer</p>
            <Input.TextArea
              placeholder="Autosize height based on content lines"
              autosize
            />
          </Col>
          <Col span={8}>
            <p>Output</p>
            <Input.TextArea
              placeholder="Autosize height based on content lines"
              autosize
            />
          </Col>
        </Row>
      </div>
    )
  }
}
