<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="signInForm.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="signInForm.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text v-show="errorMessage" class="my-0 text-center red--text">
                {{ errorMessage }}
              </v-card-text>
              <v-card-actions class="justify-center flex-column">
                <v-btn color="primary" v-on:click="signIn">Sign In</v-btn>
                <p class="mt-8 mb-0">Don't have an account?</p>
                <router-link to="/sign_up">Create one here</router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  const ERROR_MESSAGE = "Please check your email and password.";

  export default {
    data: function() {
      return {
        signInForm: {
          email: "",
          password: ""
        },

        errorMessage: null
      }
    },

    methods: {
      signIn() {
        this.errorMessage = null;

        this.$store.dispatch('signIn', {
          email: this.signInForm.email,
          password: this.signInForm.password
        }).then( () => {
          this.$router.push({ name: 'Home' });
        }).catch( () => {
          this.errorMessage = ERROR_MESSAGE;
        });
      }
    }
  }
</script>
