import createComponent from '../menu';

const createElement = (tagName, attrs = {}) => {
  const el = document.createElement(tagName);
  for (let k in attrs) {
    el[k] = attrs[k];
  }
  return el;
};

const MENU_ID = 'spamMenu';

const addDropDownMenu = parentElem => {
  const menu = createElement('div', {
    id: MENU_ID,
    innerHTML: '<drop-menu></drop-menu>'
  });
  menu.style.position = 'relative';
  parentElem.appendChild(menu);
};

let addSpamButton = chatButton => {
  const newButton = chatButton.cloneNode(true);
  newButton.innerText = 'Spam';
  newButton.title = 'Let the spam begin';
  newButton.id = 'spam-buttom';

  return newButton;
};

let onDomReady = buttonChat => {
  let newButton = addSpamButton(buttonChat);
  addDropDownMenu(buttonChat.parentElement);
  buttonChat.parentElement.prepend(newButton);
  createComponent(MENU_ID, newButton);
};

const getElementByXPath = xpath =>
  new XPathEvaluator()
    .createExpression(xpath)
    .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;

const xpath = '//button//*[text()="Chat"]';

let waitChatLoad = setInterval(() => {
  let nodeChat = getElementByXPath(xpath);
  if (nodeChat) {
    clearInterval(waitChatLoad);
    let buttonChat = nodeChat.closest('button');
    onDomReady(buttonChat);
  }
}, 100);
