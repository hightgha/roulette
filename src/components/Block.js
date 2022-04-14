import React from 'react';
import './Block.css';

class Block extends React.Component{
    render(){
        return (
            <div onClick={this.props.onClick} className={`Block ${this.props.size} ${this.props.color}`}>{this.props.number}</div>
        )
    }
}
export default Block;