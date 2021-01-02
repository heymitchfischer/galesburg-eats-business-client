<template>
  <div class="auth-page">
    <SignIn v-if="isSignIn"/>
    <SignUp v-else/>
  </div>
</template>

<script>
  import SignIn from '@/components/SignIn.vue';
  import SignUp from '@/components/SignUp.vue';

  export default {
    name: 'Auth',
    components: {
      SignIn,
      SignUp
    },
    computed: {
      isSignIn() {
        return this.$route.name === 'Sign In'
      }
    }
  };
</script>
