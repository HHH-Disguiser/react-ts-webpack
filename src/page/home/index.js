import React, { Component } from 'react';
import List from './List';
import { formatDateTime, uuid, String } from '../../utils/tool';
import { Hello } from '../../componnet/Hello';
import style from './style.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/* <Hello compiler='TypeScript' framework='React'/> */}
                {Hello('TypeScript', 'React')}
            </div>
        );
    }
}

export default Home;
