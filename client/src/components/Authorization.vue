<template>
    <div>
        <div v-if="!isLoading">
            <form id="loginForm">
                <input v-model="email" type="email" placeholder="email" />
                <br />
                <input
                    v-model="password"
                    type="password"
                    placeholder="password"
                />
                <br />
                <input @click="login" type="button" value="login" />
            </form>

            <form id="registrationForm">
                <input v-model="name" type="text" placeholder="name" />
                <br />
                <input v-model="email" type="email" placeholder="email" />
                <br />
                <input
                    v-model="password"
                    type="password"
                    placeholder="password"
                />
                <br />
                <input
                    v-model="passwordConfirmation"
                    type="password"
                    placeholder="password"
                />
                <br />
                <input
                    @click="registration"
                    type="button"
                    value="registration"
                />
            </form>
        </div>

        <div v-else>Loading...</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    name: 'Authorization',
    components: {},
    data: function () {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        };
    },
    computed: {
        ...mapGetters({
            user: 'user',
            isAuth: 'isAuth',
            isLoading: 'isLoading',
        }),
    },
    methods: {
        ...mapActions(['LOGIN', 'REGISTRATION', 'LOGOUT', 'CHECK_AUTH']),
        async login() {
            await this.LOGIN({ email: this.email, password: this.password });
        },
        async registration() {
            await this.REGISTRATION({
                name: this.name,
                email: this.email,
                password: this.password,
                passwordConfirmation: this.passwordConfirmation,
            });
        },
        async logout() {
            await this.LOGOUT();
        },
    },
    mounted() {
        this.CHECK_AUTH();
    },
});
</script>

<style module lang="sass"></style>
