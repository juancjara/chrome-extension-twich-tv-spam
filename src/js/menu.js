import Vue from 'vue';

import SpamStorage from './helpers/spamStorage';

const STYLE_TEXT = 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;';

let dropMenu = Vue.extend({

  template:
  `<div class="js-chat-settings chat-settings chat-menu dropMenu"
    :style="styleObject" :class="classObject">
        <h3>Twich TV Spamerino</h3>
        <textarea class="chat_text_input mousetrap ember-view ember-text-area"
          :style="styleTextarea" placeholder="place your copy-pastas here"
          v-model="newSpam">
        </textarea>
        <button class="button primary" @click="addSpam">Add</button>
        <button class="button primary" @click="clear">Clear</button>
        <h4 style="margin-top: 5px; text-align: center;">Copy pastas</h4>
        <div style="margin: 5px 0;" class="checkbox switcher">
          <label for="test">
            <input @click="toggleFullWidth" type="checkbox" id="test" v-model="checked">
            <span><small></small></span>
            <small style="font-size: 15px;">Wrap</small>
          </label>
        </div>
        <div v-for="spam in spams" track-by="$index">
          <div :style="blockSpam">
            <div title={{spam.text}} :style="styleText" @click="send(spam.id)">
              {{spam.text}}
            </div>
            <button class="circle" @click="remove(spam.id)">X</button>
          </div>
        </div>
      </div>`,

  data() {
    return {
      spams: [],
      newSpam: '',
      styleText: STYLE_TEXT,
      styleObject: {
        width: '300px',
        top: '-400px',
        background: 'white',
        bottom: '120px',
        border: '1px solid rgba(0,0,0,.2)',
        'z-index': 600000,
        'overflow-y': 'auto',
        'padding': '10px',
        color: 'black'
      },
      styleTextarea: {
        'margin-bottom': '5px',
        width: '100%',
        color: '#000',
        border: '1px solid rgba(255,255,255,.1)',
        'background-color': 'rgba(0,0,0,.1)',
        'background-clip': 'padding-box'
      },
      blockSpam: {
        cursor: 'pointer',
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, .3)',
        margin: '20px 0px',
        padding: '5px'
      },
      inputChat: document.querySelector('.chat_text_input'),
      checked: true,
      classObject: {
        hidden: true
      }
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
      if (!this.newSpam.length) return;
      SpamStorage.add(this.newSpam).then(this.syncList);
      this.newSpam = '';
    },

    clear() {
      this.newSpam = '';
    },

    syncList() {
      SpamStorage.list().then(spams => this.spams = spams);
    },

    remove(id) {
      SpamStorage.remove(id).then(this.syncList);
    },

    toggleFullWidth() {
      this.checked = !this.checked;
      this.styleText = this.styleText === STYLE_TEXT ?
        'overflow-wrap: break-word;': STYLE_TEXT;
    },

    toggle() {
      let heightClass = '.scroll.chat-messages.js-chat-messages.hideTimestamps.hideModIcons';
      let width = document.querySelector('.chat-buttons-container')
            .clientWidth;
      this.styleObject.width = Number(width) - 10 + 'px' ;

      let height = document.querySelector(heightClass).clientHeight;
      this.styleObject.top = '-' + (Number(height) - 20)
        + 'px';
      this.classObject.hidden = !this.classObject.hidden;
      this.syncList();
    }

  }

});

Vue.component('drop-menu', dropMenu);

let createComponent = (id, elem) => {
  var component = new Vue({el: `#${id}`});
  elem.onclick = component.$children[0].toggle;
};

export default createComponent;
