import React, { Component } from 'react'

export class Preview extends Component<
  React.ImgHTMLAttributes<HTMLImageElement>
> {
  state = {
    realSrc: this.props.src,
  }

  render() {
    return <img {...this.props} src={this.state.realSrc} />
  }
}
