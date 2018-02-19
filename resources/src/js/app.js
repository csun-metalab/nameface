/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.axios = require('axios');
window.Vue = require('vue');

import VueRouter from 'vue-router'
import Splash from './views/Splash.vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const Router = new VueRouter({
    mode: 'history',
    routes : [
        {
            path: '/splash',
            name: 'splash',
            component: Splash

        }
    ]
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.component('menu-bar', require('./components/menuBar.vue'));
Vue.component('nav-bar', require('./components/fixed_components/navBar.vue'));
Vue.component('side-bar', require('./components/fixed_components/sideBar.vue'));

Vue.component('roster-container', require('./components/rosterContainer.vue'));
Vue.component('student-grid', require('./components/studentGrid.vue'));
Vue.component('student-list', require('./components/studentList.vue'));

Vue.component('shuffle-button', require('./components/shuffleButton.vue'));
Vue.component('toggle-view-button', require('./components/toggleViewButton.vue'));

Vue.component('courses-container', require('./components/coursesContainer.vue'));
Vue.component('course-grid', require('./components/courseGrid.vue'));
Vue.component('course-list', require('./components/courseList.vue'));
Vue.component('profile-image', require('./components/profileImage.vue'));

Vue.prototype.$eventBus = new Vue(); // Global event bus

const app = new Vue({
    el: '#app',
    router: Router,
    components: {
        Splash,
    },
});