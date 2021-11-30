<template>
  <v-card
    class="mx-auto"
    height="700px"
    width="700px"
  >
    <v-data-table
      :headers="headers"
      :items="contact"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="js">
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

export default {
  name: 'Contacts',
  data: () => ({
    tableLoader: false,
    search: '',
    headers: [
      {text: 'First Name', value: 'firstName'},
      {text: 'Last Name', value: 'lastName'},
      {text: 'Phone', value: 'phone'},
      {text: 'Email', value: 'email'}
    ]
  }),
  computed: {
    ...mapState('contacts', ['contact']),
    ...mapGetters('user', ['accessToken', 'accessTokenHeaderValue']),
  },
  created() {
  },
  mounted() {
    if (!this.accessToken) {
      this.getAccessToken();
      this.getContacts();
    }
    this.getContacts();
    this.printContact();
  },
  methods: {
    ...mapActions('contacts', ['getContacts']),
    ...mapMutations('user', ['getAccessToken']),
    printContact() {
      console.log(this.contact);
    }
  }
};

</script>
