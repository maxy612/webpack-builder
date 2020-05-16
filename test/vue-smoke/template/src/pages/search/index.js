import Vue from 'vue';
import App from './App';

import './reset.css';

new Vue({
  el: '#app',
  components: {
    App
  },
  render: h => h(App)
})
