import Q from 'q';

import Storage from '../chrome-api/storage';

const KEYS = {
  SPAMS: 'spams'
};

let SpamStorage = {

  getData(key, defaultVal) {

    return Q.promise((success, reject) => {
      Storage.get(key, data => {
        if (defaultVal && !data) {
          data = defaultVal;
        }
        success(data);
      });
    });
  },

  list() {
    return this.getData(KEYS.SPAMS, []);
  },

  add(newSpam) {
    return Q.promise((success, reject) => {
      SpamStorage.list().then(spams => {
        let newId = spams.length > 0 ? spams[spams.length -1].id + 1: 0;
        spams.push({
          id: newId,
          text: newSpam
        });
        Storage.set({[KEYS.SPAMS]: spams}, success);
      });
    });
  },

  remove(idToRemove) {
    return Q.promise((success, reject) => {
      SpamStorage.list().then(spams => {
        spams = spams.filter(({id}) => id !== idToRemove);
        Storage.set({[KEYS.SPAMS]: spams}, success);
      });
    });
  },

  update(id, newSpam) {
    return Q.promise((success, reject) => {
      SpamStorage.list().then(spams => {
        spams = spams.map(spam => {
          if (spam.id === id) {
            spam.text = newSpam;
          }
          return spam;
        });
        Storage.set({[KEYS.SPAMS]: spams}, success);
      });
    });
  },

  onChange() {
    return Q.promise((success, reject) => {
      Storage.onChange(success);
    });
  }

};

export default SpamStorage;
