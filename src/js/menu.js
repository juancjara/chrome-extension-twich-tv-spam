import Vue from 'vue';

import SpamStorage from './helpers/spamStorage';

const STYLE_TEXT = 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;';

let dropMenu = Vue.extend({

  template:
  `<div class="js-chat-settings chat-settings chat-menu dropMenu"
       style="background: white; bottom: 120px; border: 1px solid black;z-index: 60000; overflow-y: scroll;padding: 5px;"
    :style="styleObject" :class="classObject">
        <textarea style="width: 100%;" placeholder="spam here"
          v-model="newSpam" @keyup.enter="addSpam">
        </textarea>
        <h3>Spams</h3>
        <button @click="toggleFullWidth">Toggle</button>
        <div v-for="spam in spams" track-by="$index">
          <div title={{spam.text}} :style="styleText" @click="send(spam.id)">
            {{spam.text}}
          </div>
          <div @click="remove(spam.id)">X</div>
        </div>
      </div>`,

  data() {
    return {
      spams: [],
      newSpam: '',
      classObject: {
        'hidden': true
      },
      styleText: STYLE_TEXT,
      styleObject: {
        width: '300px',
        top: '-400px'
      },
      inputChat: document.querySelector('.chat_text_input')
    };
  },

  ready() {
    this.syncList();
  },

  methods: {

    send(id) {
      this.inputChat.value = this.spams
        .filter(s => s.id === id)[0].text;
    },

    addSpam() {
      console.log(this.newSpam);
      SpamStorage.add(this.newSpam).then(this.syncList);
      this.newSpam = '';
    },

    syncList() {
      SpamStorage.list().then(spams => this.spams = spams);
    },

    remove(id) {
      SpamStorage.remove(id).then(this.syncList);
    },

    toggleFullWidth() {
      this.styleText = this.styleText.length > 0 ? '': STYLE_TEXT;
    },

    toggle() {
      let heightClass = '.scroll.chat-messages.js-chat-messages.hideTimestamps.hideModIcons';
      this.styleObject.width = document.querySelector('.chat-buttons-container')
        .clientWidth;
      this.styleObject.top = '-' + (Number(document.querySelector(heightClass).clientHeight) - 20)
        + 'px';
      this.classObject.hidden = !this.classObject.hidden;
    }

  }

});

Vue.component('drop-menu', dropMenu);

let createComponent = (id, elem) => {
  var component = new Vue({el: `#${id}`});
  elem.onclick = component.$children[0].toggle;
};

export default createComponent;
