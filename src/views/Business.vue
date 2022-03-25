<template>
  <div class="business-page">
    <v-container v-if="loading" fill-height fluid>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="50"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else fluid>
      <v-row>
        <v-col cols="12">
          <div class="banner-container mt-4">
            <v-hover v-slot="{ hover }">
              <v-img :src="businessImage" class="banner-image elevation-4">
                <v-fade-transition>
                  <v-overlay
                    v-if="hover"
                    absolute
                    light
                    color="white"
                  >
                    <v-form class="primary rounded pa-2 banner-form">
                      <v-file-input
                        v-model="bannerImage"
                        label="Banner Image"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-form>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </v-hover>
          </div>

          <h2 class="text-center">{{ business.name }}</h2>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .business-page {
    height: 100%;
  }

  .banner-container {
    position: relative;
  }

  .banner-image {
    width: 100%;
    max-height: 280px;
    object-position: center center;
    object-fit: cover;
  }

  .banner-form {
    width: 300px;
  }
</style>

<script>
  import Dashboard from '../layouts/Dashboard.vue';
  const defaultBannerImage = require('@/assets/no-image-provided.png');

  export default {
    name: 'Business',

    data: () => ({
      loading: true,
      bannerImage: null,
      business: {}
    }),

    created() {
      this.$emit('update:layout', Dashboard);
    },

    mounted: async function() {
      this.getBusiness(this.$route.params.slug).then( business => {
        this.business = business;
        this.loading = false;
      }).catch( error => {
        console.log(error);
      })
    },

    methods: {
      getBusiness: async function(slug) {
        const response = await fetch(`http://localhost:3000/businesses/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (response.ok) {
          return result;
        } else {
          throw result.error;
        }
      }
    },

    computed: {
      businessImage: function() {
        if (this.business.thumbnail_image_url) return this.business.thumbnail_image_url;

        return defaultBannerImage;
      }
    }
  }
</script>
