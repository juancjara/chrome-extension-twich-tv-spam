console.log('content script ready');
import createComponent from '../menu';

let createElement = (tagName, attrs = {}) => {
  let el= document.createElement(tagName);
  for (let k in attrs) {
    el[k] = attrs[k];
  }
  return el;
};

const MENU_ID = 'spamMenu';

let addDropDownMenu = (parentElem) => {
  let menu = createElement('div',
                           {
                             id: MENU_ID,
                             innerHTML: '<drop-menu></drop-menu>'
                           });
  parentElem.appendChild(menu);
};

let toggleMenu = () => {
  let menu = document.getElementById(MENU_ID);
  let classList = [...menu.classList];
  classList[classList.length - 1] = classList[classList.length - 1] === 'hidden'?
                                    'rofl': 'hidden';
  menu.className = classList.join(' ');
};

let addSpamButton = (chatButtons) => {
  return createElement('a',
                       {className: chatButtons.children[0].className,
                        title: 'Let the spam begin',
                        innerText: 'Spam'});
  //spamButtom.onclick = toggleMenu;
  // chatButtons.appendChild(spamButtom);
};

let onDomReady = (chatButtons) => {
  addDropDownMenu(chatButtons.parentElement);
  let button = addSpamButton(chatButtons);
  chatButtons.appendChild(button);
  createComponent(MENU_ID, button);
};

let waitChatLoad = setInterval(() => {
  let chatButtons = document.querySelector('.chat-buttons-container');
  if (chatButtons) {
    clearInterval(waitChatLoad);
    onDomReady(chatButtons);
  }
}, 100);

