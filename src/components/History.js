import React from 'react';
import './History.css';

class History extends React.Component{
    render(){
        return (
            <div className='History'>{this.props.children}</div>
        )
    }
}

export default History;