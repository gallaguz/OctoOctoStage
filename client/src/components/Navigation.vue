<template>
    <div :id="$style.nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Navigation',
});
</script>

<style module lang="sass">
#nav
  padding: 30px
</style>
