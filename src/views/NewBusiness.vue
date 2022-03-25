<template>
  <div class="new-business-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-form v-model="valid" ref="form" @submit.prevent="createBusiness">
            <v-text-field
              v-model="newBusinessForm.name"
              :rules="nameRules"
              label="Business Name"
              prepend-icon="mdi-food-fork-drink"
              required
            ></v-text-field>
            <v-text-field
              v-model="newBusinessForm.address"
              :rules="addressRules"
              label="Address"
              prepend-icon="mdi-map-marker"
              required
            ></v-text-field>
            <v-text-field
              v-model="newBusinessForm.description"
              :rules="descriptionRules"
              label="Description (Optional)"
              prepend-icon="mdi-information"
              counter="400"
            ></v-text-field>
            <v-text-field
              v-model="newBusinessForm.slug"
              :rules="slugRules"
              label="URL Slug"
              prepend-icon="mdi-link"
              required
            ></v-text-field>
            <div v-show="errors.length > 0" class="red--text text-center">
              <p class="my-0" v-for="(error, index) in errors" :key="index">{{ error }}</p>
            </div>
            <v-btn
              color="primary"
              type="submit"
              class="my-4"
            >
              Create
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .new-business-page {
    height: 100%;
  }
</style> 

<script>
  import Dashboard from '@/layouts/Dashboard.vue';

  export default {
    name: 'NewBusiness',

    data: () => ({
      valid: true,
      errors: {},
      newBusinessForm: {
        name: "",
        address: "",
        description: "",
        slug: ""
      },
      nameRules: [
        v => !!v || 'Name is required'
      ],
      addressRules: [
        v => !!v || 'Address is required'
      ],
      descriptionRules: [
        v => !v || (v.length <= 400 || 'Description must be less than 400 characters'),
      ],
      slugRules: [
        v => !!v || 'URL slug is required',
        v => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) || 'URL slug must be lowercase with words separated by dashes'
      ]
    }),

    created() {
      this.$emit('update:layout', Dashboard);
    },

    methods: {
      createBusiness: function() {
        this.$refs.form.validate();
        if (!this.valid) return;

        this.$store.dispatch('createBusiness', this.newBusinessForm).then( business => {
          this.$refs.form.reset();
          this.$router.push({ path: `/businesses/${business.slug}` });
        }).catch( errors => {
          this.errors = errors;
        });
      }
    }
  };
</script>

