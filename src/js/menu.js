import Vue from 'vue';

import SpamStorage from './helpers/spamStorage';

let dropMenu = Vue.extend({

  template:
  '<div class="js-chat-settings chat-settings chat-menu dropMenu"' +
    'style="background: white; bottom: 90px; border: 1px solid black;" '+
    ':class="classObject">' +
    '<textarea style="width: 100%;" placeholder="spam here" v-model="newSpam" @keyup.enter="addSpam">' +
    '</textarea>' +
      '<h3>Spams</h3>' +
      '<div v-for="spam in spams" track-by="$index">' +
        '<div>{{spam.id}} {{spam.text}}</div>' +
        '<div @click="remove(spam.id)">X</div>' +
      '</div>' +
    '</div>',

  data() {
    return {
      spams: [],
      newSpam: '',
      classObject: {
        'hidden': true
      }
    };
  },

  ready() {
    this.syncList();
  },

  methods: {

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

    toggle() {
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
