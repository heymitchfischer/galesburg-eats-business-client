<template>
  <div class="home-page">
    Welcome home.
    <v-btn color="primary" @click="signOut" v-if="$store.getters.isLoggedIn">Sign Out</v-btn>
  </div>
</template>

<script>
  export default {
    name: 'Home',

    methods: {
      signOut: function() {
        this.$store.dispatch('signOut').then(() => {
          this.$router.push({ name: 'Sign In' });
        });
      }
    }
  };
</script>

