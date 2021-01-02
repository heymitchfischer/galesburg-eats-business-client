<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Sign Up</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="text"
                    v-model="signUpForm.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="signUpForm.password"
                  ></v-text-field>

                  <v-text-field
                    id="password-confirmation"
                    label="Password Confirmation"
                    name="password-confirmation"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="signUpForm.passwordConfirmation"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-text v-show="formattedErrors.length > 0" class="red--text text-center">
                <p class="my-0" v-for="error in formattedErrors" :key="error">{{ error }}</p>
              </v-card-text>
              <v-card-actions class="justify-center flex-column">
                <v-btn color="primary" v-on:click="signUp">Create Account</v-btn>
                <p class="mt-8 mb-0">Already have an account?</p>
                <router-link to="/sign_in">Sign in here</router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import { formatErrors } from '@/misc/helpers.js';

  export default {
    data: function() {
      return {
        signUpForm: {
          email: "",
          password: "",
          passwordConfirmation: ""
        },

        errors: {}
      }
    },

    methods: {
      signUp() {
        this.errors = {};

        this.$store.dispatch('signUp', {
          email: this.signUpForm.email,
          password: this.signUpForm.password,
          passwordConfirmation: this.signUpForm.passwordConfirmation
        }).then( () => {
          this.$router.push({ name: 'Home' });
        }).catch( errors => {
          this.errors = errors;
        });
      }
    },

    computed: {
      formattedErrors: function() {
        return formatErrors(this.errors);
      }
    }
  }
</script>
