<template>
    <div>
        <strong>{{ user.email }}</strong>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    name: 'UserBar',
    computed: {
        ...mapGetters({
            user: 'user',
        }),
    },
    methods: {
        ...mapActions(['LOGOUT']),
        async logout() {
            await this.LOGOUT();
        },
    },
});
</script>

<style scoped></style>
