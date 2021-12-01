<template>
  <v-layout wrap>
    <v-col cols="12">
      <v-row class="mb-3 justify-center">
        <v-card
          elevation="3"
          max-width="700px"
          width="700px"
        >
          <v-form
            ref="contactAddForm"
            @submit.prevent="contactAdding"
          >
            <v-card-title>Add new contact</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="firstName"
                label="First Name"
                type="text"
              />
              <v-text-field
                v-model="lastName"
                label="Last Name"
                type="text"
              />
              <v-text-field
                v-model="phone"
                label="Phone"
                type="text"
              />
              <v-text-field
                v-model="email"
                label="Email"
                type="text"
              />
            </v-card-text>
            <v-card-actions class="text-right">
              <v-col class="text-right">
                <v-btn
                  class="text-right"
                  color="success"
                  text
                  :loading="buttonLoader"
                  type="submit"
                >
                  <v-spacer />
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Add contact
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "NewContact",
  data: () => {
    return {
      buttonLoader: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    };
  },
  computed: {
    ...mapState('contacts', ['contact']),
    ...mapState('user', ['user']),
    ...mapGetters('user', ['accessToken', 'accessTokenHeaderValue']),
  },
  mounted() {
    if (!this.accessToken) {
      this.getAccessToken();
      if (!this.user) {
        this.getUser();
      }
    }
  },
  methods: {
    ...mapActions('contacts', ['addContact']),
    ...mapMutations('user', ['getAccessToken', 'getUser']),
    cleanFields() {
      this.firstName = '';
      this.lastName = '';
      this.phone = '';
      this.email = '';
    },
    async contactAdding() {
      this.buttonLoader = true;
      this.addContact({
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email,
      })
        .then(() => {
          this.buttonLoader = false;
          this.cleanFields();
        })
        .catch(() => {
          this.buttonLoader = false;
        });
    }
  }
};
</script>

<style scoped>

</style>
