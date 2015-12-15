console.log('background script ready!!');

import SpamStorage from '../helpers/spamStorage';
import Notification from '../chrome-api/notification';

Notification.iconUrl = "../images/kappa128.png";
Notification.title = 'Twitch tv spamerino';

let handleSelection = ({selectionText}) => {
  SpamStorage.add(selectionText)
    .then(() => {
      Notification.create({message: 'copypastas added'});
    });
};

chrome.contextMenus.create({title: 'add pasterino',
                            contexts: ["selection"],
                            onclick: handleSelection});
