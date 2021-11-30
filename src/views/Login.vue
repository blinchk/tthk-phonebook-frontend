<template>
  <v-container fluid>
    <v-col>
      <v-row class="justify-center">
        <v-card
          flat
          max-width="500px"
          width="500px"
        >
          <v-card-title>
            Sign In
          </v-card-title>
          <v-form>
            <v-card-text>
              <v-text-field
                v-model="credentials.username"
                label="Username"
              />
              <v-text-field
                v-model="credentials.password"
                label="Password"
                type="password"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click.stop="signIn">
                Sign In
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    credentials: {
      username: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions('user', ['authUser']),
    signIn() {
      this.authUser(this.credentials);
    }
  },
};
</script>

<style scoped>

</style>
