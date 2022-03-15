import React from 'react';

import {Menu} from 'semantic-ui-react';

export default () => {
    return (
      <Menu>
        <Menu.Item>
          FIR Portal
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            FIR List
          </Menu.Item>
          <Menu.Item>
            +
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
};
