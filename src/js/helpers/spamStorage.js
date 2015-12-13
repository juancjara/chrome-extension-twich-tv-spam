import Q from 'q';

import Storage from '../chrome-api/storage';

const KEYS = {
  SPAMS: 'spams'
};

let spamStorage = {

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

  setData(data) {
    console.log('setdata', data);
    return Q.promise((success, reject) => {
      Storage.set(data, sucess);
    });
  },

  list() {
    return this.getData(KEYS.SPAMS, []);
  },

  add(newSpam) {
    return this.list().then(spams => {
      spams.push(newSpam);
      return this.setData({SPAMS: spams});
    });
  }

};

export default spamStorage;
