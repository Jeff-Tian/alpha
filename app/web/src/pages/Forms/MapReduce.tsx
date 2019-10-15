import {Col, Input, Row} from 'antd'
import {connect} from 'dva'
import React, {PureComponent} from 'react'

interface IMapReduceProps {
  map: []
  reducer: string
  output: []
}

@connect(({mapReduce: {map, reducer, output}}) => ({
  map,
  reducer,
  output,
}))
export default class MapReduce extends PureComponent<IMapReduceProps> {
  render() {
    const {map, reducer, output} = this.props

    return (
      <div>
        <Row gutter={8}>
          <Col span={8}>
            <p>Map</p>
            <Input.TextArea
              placeholder="Autosize height based on content lines"
              autosize
              value={map.join('\n')}
            />
          </Col>
          <Col span={8}>
            <p>Reducer</p>
            <Input.TextArea
              placeholder="Autosize height based on content lines"
              autosize
              value={reducer}
            />
          </Col>
          <Col span={8}>
            <p>Output</p>
            <Input.TextArea
              placeholder="Autosize height based on content lines"
              autosize
              value={output}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
