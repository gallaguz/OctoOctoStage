<template>
    <div :id="$style.app">
        <div v-if="isAuth">
            <Navigation />
            <UserBar />

            <router-view />
        </div>

        <div v-else>
            <authorization />
        </div>

        <div>
            <p>Protected service</p>
            <button @click="getUsers">Get users</button>
            <ul v-if="isAuth">
                <li v-for="user in this.users" :key="user.email">
                    {{ user.email }}
                </li>
            </ul>
        </div>

        <hr />

        <div>
            Debug block
            <p>Errors:</p>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Navigation from './components/Navigation.vue';
import Authorization from './components/Authorization.vue';
import UserBar from '@/components/UserBar.vue';

export default defineComponent({
    name: 'App',
    components: { UserBar, Navigation, Authorization },
    computed: {
        ...mapGetters({
            user: 'user',
            isAuth: 'isAuth',
            users: 'users',
            errors: 'get_errors',
        }),
    },
    methods: {
        ...mapActions(['LOGOUT', 'GET_USERS']),
        async logout() {
            await this.LOGOUT();
        },
        async getUsers() {
            await this.GET_USERS();
        },
    },
});
</script>

<style module lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

  #nav
    padding: 30px
</style>

<style lang="sass">
a
  font-weight: bold
.router-link-active
  color: #2c3e50
.router-link-exact-active
  color: #42b983
</style>
