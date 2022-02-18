import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#284616',
        background: '#FEFAE0'
      },
      dark: {
        primary: '#284616',
        background: '#FEFAE0'
      }
    }
  }
});
