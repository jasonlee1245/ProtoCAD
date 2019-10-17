import * as React from 'react';
import Logo from '../logo.jsx';
import Tabs from './Tabs';

export default props => {
    // input value
    return <div id={'library'}>
        <div id="appName">
          <Logo />
          <h3>ProtoCAD</h3>
        </div>
        <Tabs />
    </div>
};
