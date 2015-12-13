console.log('content script ready');
import SpamStorage from '../helpers/spamStorage';

var createElement = (tagName, attrs = {}) => {
  var el= document.createElement(tagName);
  for (var k in attrs) {
    el[k] = attrs[k];
  }
  return el;
};

var addSpamButton = (chatButtons) => {
  var spamButtom = createElement('a',
                                 {className: chatButtons.children[0].className,
                                  title: 'Let the spam begin',
                                  innerText: 'Spam'});

  chatButtons.appendChild(spamButtom);
  SpamStorage.list().then((data) => console.log(data));
  SpamStorage.add('spamerino')
    .then(() => {
      SpamStorage.list().then((data) => console.log(data));
    });
};

var waitChatLoad = setInterval(() => {
  var chatButtons = document.querySelector('.chat-buttons-container');
  if (chatButtons) {
    clearInterval(waitChatLoad);
    addSpamButton(chatButtons);
  }
}, 100);


//create button
