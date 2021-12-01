<template>
  <v-container fluid>
    <v-col>
      <v-row class="justify-center">
        <v-card
          max-width="500px"
          width="500px"
          flat
        >
          <v-card-title>
            Sign Up
          </v-card-title>
          <v-form>
            <v-card-text>
              <v-text-field
                v-model="credentials.username"
                label="Username"
              />
              <v-text-field
                v-model="credentials.email"
                type="email"
                label="Email"
              />
              <v-text-field
                v-model="credentials.firstName"
                label="First Name"
              />
              <v-text-field
                v-model="credentials.lastName"
                label="Last Name"
              />
              <v-text-field
                v-model="credentials.password"
                type="password"
                label="Password"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click.stop="signUp">
                Sign Up
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  name: 'Register',
  data: () => ({
    credentials: {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }),
  computed: {
    ...mapState('user', ["accessToken"])
  },
  mounted() {
    if (this.accessToken) {
      this.$router.push('home').then(() => {
        this.createNewAlert({
          color: 'error',
          text: 'Already logged in'
        });
      });
    }
  },
  methods: {
    ...mapActions('user', ['createUser']),
    ...mapMutations(['createNewAlert']),
    signUp() {
      this.createUser(this.credentials);
    }
  },
};
</script>

<style scoped>

</style>
