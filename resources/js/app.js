import './bootstrap'

import Modal from './components/Modal.vue'
import ExampleComponent from './components/ExampleComponent.vue'

import ClientsComponent from './components/passport/Clients.vue'
import AuthorizedClientsComponent from './components/passport/AuthorizedClients.vue'
import PersonalAccessTokensComponent from './components/passport/PersonalAccessTokens.vue'

Vue.component('modal', Modal)
Vue.component('example-component', ExampleComponent)

Vue.component('passport-clients', ClientsComponent)
Vue.component('passport-authorized-clients', AuthorizedClientsComponent)
Vue.component('passport-personal-access-tokens', PersonalAccessTokensComponent)

const app = new Vue({
    el: '#app',
    data: {
        displayNavigation: false
    }
})
