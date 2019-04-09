import Vue from 'vue';

import SpamStorage from './helpers/spamStorage';

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const STYLE_TEXT =
  'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;';

let dropMenu = Vue.extend({
  template: `<div :style="styleObject" >
        <h3>Twich TV Spamerino</h3>
        <textarea :style="styleTextarea" placeholder="place your copy-pastas here"
          v-model="newSpam">
        </textarea>
        <button class="button" :style="styleButton" @click="addSpam">Add</button>
        <button class="button" :style="styleButton" @click="clear">Clear</button>
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
            <div title={{spam.text}} :style="styleText" @click="send(spam.text, spam.id)">
              {{spam.text}}
            </div>
            <div v-bind:style="[styleTooltip, { display: spam.show ? 'block': 'none' } ]" >Copied!</div>
            <button class="circle" @click="remove(spam.id)"></button>
          </div>
        </div>
      </div>`,

  data() {
    return {
      spams: [],
      newSpam: '',
      styleText: STYLE_TEXT,
      styleTooltip: {
        position: 'absolute',
        padding: '5px',
        color: '#6441a4',
        background: 'white',
        border: '1px solid #6441a4'
      },
      styleObject: {
        width: '310px',
        left: '-310px',
        position: 'absolute',
        bottom: 'calc( 100% + 80px )',
        background: 'white',
        border: '1px solid rgba(0,0,0,.2)',
        'z-index': 600000,
        'overflow-y': 'auto',
        padding: '10px',
        color: 'black',
        display: 'none'
      },
      styleTextarea: {
        padding: '10px',
        'margin-bottom': '5px',
        width: '100%',
        border: '1px solid rgba(255,255,255,.1)',
        'background-color': 'rgba(0,0,0,.1)',
        'background-clip': 'padding-box'
      },
      styleButton: {
        background: '#6441a4',
        color: 'white',
        padding: '0 .8rem'
      },
      blockSpam: {
        cursor: 'pointer',
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, .3)',
        margin: '20px 0px',
        padding: '5px'
      },
      checked: true
    };
  },

  ready() {
    this.syncList();
  },

  methods: {
    send(text, id) {
      let index = -1;
      this.spams.forEach((spam, i) => {
        if (spam.id === id) {
          index = i;
        }
      });
      this.spams.$set(index, { ...this.spams[index], show: true });
      setTimeout(() => {
        this.spams.$set(index, { ...this.spams[index], show: false });
      }, 500);
      copyToClipboard(text);
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
      SpamStorage.list().then(spams => (this.spams = spams));
    },

    remove(id) {
      SpamStorage.remove(id).then(this.syncList);
    },

    toggleFullWidth() {
      this.checked = !this.checked;
      this.styleText =
        this.styleText === STYLE_TEXT
          ? 'overflow-wrap: break-word;'
          : STYLE_TEXT;
    },

    toggle() {
      this.styleObject.display =
        this.styleObject.display === 'none' ? 'block' : 'none';

      this.syncList();
    }
  }
});

Vue.component('drop-menu', dropMenu);

let createComponent = (id, elem) => {
  var component = new Vue({ el: `#${id}` });
  elem.onclick = () => component.$children[0].toggle();
};

export default createComponent;
