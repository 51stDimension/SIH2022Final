import React from 'react';

import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
    return (
      <Menu style={{marginTop:'10px'}}>
          <Link route="/">
            <a className="item">FIR Portal</a>
          </Link>
          <Link route="/checkstats">
            <a className="item">Check Crime Stats</a>
          </Link>
        <Menu.Menu position='right'>
          <Link route="/">
            <a className="item">All FIRs</a>
          </Link>
          <Link route="/firs/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
    );
};
