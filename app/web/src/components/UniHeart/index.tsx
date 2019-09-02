import React, {PureComponent} from 'react'
import {Layer, Rect, Stage} from 'react-konva'

class Heart extends React.PureComponent {
  render() {
    return (
      <Rect x={0} y={0} width={200} height={200} fill={'red'} shadowBlur={10} />
    )
  }
}

export default class UniHeart extends PureComponent {
  render() {
    return (
      <>
        <Stage width={200} height={200}>
          <Layer>
            <Heart />
          </Layer>
        </Stage>
        <svg>
          <g transform="rotate(-90 100 100)" viewBox="0 0 100 100">
            <circle
              className="ProgressBarCircular-bar-background"
              r={50}
              cx={25}
              cy={25}
            />
          </g>
        </svg>
      </>
    )
  }
}
