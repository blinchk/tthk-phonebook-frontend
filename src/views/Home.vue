<template>
  <v-container fluid>
    <v-col>
      <v-row class="justify-center">
        <v-card
          width="100%"
          min-width="300px"
        >
          <v-card-title>
            Available actions
          </v-card-title>
          <v-card-text>
            <v-list class="mx-n4">
              <v-list-item-group
                v-if="accessToken"
              >
                <v-list-item to="/contacts">
                  <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
                  <v-list-item-title>Contacts</v-list-item-title>
                </v-list-item>
                <v-list-item to="/groups">
                  <v-list-item-icon><v-icon>mdi-account-group</v-icon></v-list-item-icon>
                  <v-list-item-title>Groups</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
              <v-list-item-group v-else>
                <v-list-item to="/login">
                  <v-list-item-icon><v-icon>mdi-login</v-icon></v-list-item-icon>
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item to="/register">
                  <v-list-item-icon><v-icon>mdi-account-plus</v-icon></v-list-item-icon>
                  <v-list-item-title>Register</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Home',
  methods: {
    ...mapState('user', ['accessToken'])
  }
};
</script>
