<template>
  <div class="contacts">
    <h1>This is contacts page</h1>
  </div>
</template>

<script lang="js">
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

export default {
  name: 'Contacts',
  computed: {
    ...mapState('contacts', ['contact']),
    ...mapGetters('user', ['accessToken', 'accessTokenHeaderValue']),
  },
  mounted() {
    if (!this.accessToken) {
      this.getAccessToken();
    }
    this.getContacts();
  },
  methods: {
    ...mapActions('contacts', ['getContacts']),
    ...mapMutations('user', ['getAccessToken'])
  }
};

</script>
