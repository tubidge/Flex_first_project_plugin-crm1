import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'Crm1Plugin';

export default class Crm1Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task
        ? `https://bing.com/?q=${task.attributes.name}`
        : 'https://bing.com';
    }


    // flex.CRMContainer.defaultProps.uriCallback = (task) => {
    //   // if (task.attributes.name != 0) {
    //   var attName = task.attributes.name;
    //   var areaCode = attName.substring(0, 3);
    //   return task
    //     ? `https://bing.com/?q=area+code+${areaCode}`
    //     : 'https://bing.com';
    //   // }
    // }
  }


  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
