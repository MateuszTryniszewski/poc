import Vue from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { auth } from './firebase';

Vue.config.productionTip = false;

let app;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
