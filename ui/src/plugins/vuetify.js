import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#073B3A',
        background: '#FEFAE0',
        footer: '#DDB771'
      },
      dark: {
        primary: '#266600',
        background: '#FEFAE0',
        footer: '#DDB771'
      }
    }
  }
});
