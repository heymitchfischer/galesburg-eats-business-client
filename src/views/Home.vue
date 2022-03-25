<template>
  <div class="home-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          Welcome home.
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .home-page {
    height: 100%;
  }
</style>

<script>
  import Dashboard from '@/layouts/Dashboard.vue';

  export default {
    name: 'Home',

    created() {
      this.$emit('update:layout', Dashboard);
    }
  };
</script>

