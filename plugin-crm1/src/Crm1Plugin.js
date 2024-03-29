import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'Crm1Plugin';

// function to perform CRM search
async function searchAndScreenPop(searchString, Flex, Manager) {

  // proxy URL
  const CRM_API_KEY = process.env.apiKey;
  const CRM_API_CONTACTS_BASE_URL = 'https://chiefstattoobookingtech58042.api-us1.com/api/3/contacts/';
  const CRM_UI_CONTACTS_VIEW_BASE_URL = 'https://chiefstattoobookingtech58042.activehosted.com/app/contacts';

  let searchUrl = 'https://chiefstattoobookingtech58042.api-us1.com/api/3/contacts/1094';
  // fetch information by passing searchString

  // push the Contact view based on return value
}

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

    const RUNTIME_DOMAIN = manager.serviceConfiguration.runtime_domain;
    console.log(RUNTIME_DOMAIN, flex, manager);

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task
        ? `https://chiefstattoobookingtech58042.api-us1.com/app/contacts/?q=8015410498`
        // `https://chiefstattoobookingtech58042.activehosted.com/app/contacts?q=8015410498`
        // `https://bing.com/?q=${task.attributes.name}`
        : 'https://chiefstattoobookingtech58042.api-us1.com';
    }

    flex.Actions.addListener("afterAcceptTask",
      (taskPayload, abortFunction) => {
        // let searchParameter = taskPayload.task.attrubutes.name;
        let taksAttributes = taskPayload.task.attrubutes;
        console.log(`*_*_*_*_*_*_*_  Task Atts: ${taksAttributes} _*_*_*_*_*_*_*`);
        // searchAndScreenPop(searchParameter, flex, manager);
      }
    )


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
