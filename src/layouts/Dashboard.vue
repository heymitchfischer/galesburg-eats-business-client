<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="$router.push('/')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/businesses/new')">
          <v-list-item-action>
            <v-icon>mdi-food-fork-drink</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>New Business</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Galesburg Eats</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="signOut" v-if="$store.getters.isLoggedIn">Sign Out</v-btn>
    </v-app-bar>

    <v-main>
      <slot/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),

    methods: {
      signOut: function() {
        this.$store.dispatch('signOut').then(() => {
          this.$router.push({ name: 'Sign In' });
        });
      }
    }
  }
</script>
