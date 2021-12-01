<template>
  <v-card
    class="mx-auto fill-height"
  >
    <v-card-title>
      Contacts
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="ml-5 mr-5"
        label="Search"
        single-line
      />
    </v-card-title>


    <v-data-table
      :headers="headers"
      :items="contacts"
      :search="search"
      :single-select="true"
    >
      <template v-slot:item.action="{ item }">
        <v-btn
          class="mr-2"
          small
          icon
          @click.stop="assignValuesToEdit(item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          small
          icon
          @click.stop="deleteDialog = true; selectedItem = item"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <div />
    <v-dialog
      v-model="deleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title>Delete contact</v-card-title>
        <v-card-text>
          Are you sure you want to delete this contact?
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click.stop="deleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="deleteLoader"
            color="error"
            text
            @click.stop="_deleteContact(selectedItem)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="editDialog"
      width="500"
    >
      <v-card>
        <v-card-title>Edit contact</v-card-title>
        <v-col cols="12">
          <v-row class="ml-2 mr-2">
            <v-text-field
              v-model="editContactCredentials.firstName"
              class="ml-2 mr-2"
              label="First Name"
            />
            <v-text-field
              v-model="editContactCredentials.lastName"
              class="mr-2"
              label="Last Name"
            />
          </v-row>
          <v-row class="mr-2 ml-2">
            <v-text-field
              v-model="editContactCredentials.phone"
              class="mr-2 ml-2"
              label="Phone"
            />
            <v-text-field
              v-model="editContactCredentials.email"
              class="mr-2 ml-2"
              label="Email"
            />
          </v-row>
        </v-col>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click.stop="editDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="editButtonLoading"
            color="success"
            text
            @click.stop="_editContact(editContactCredentials.id)"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="js">
import {mapActions, mapGetters, mapState} from 'vuex';

export default {
  name: 'Contacts',
  data: () => ({
    tableLoader: false,
    search: '',
    selectedItem: '',
    deleteLoader: false,
    deleteDialog: false,
    editDialog: false,
    editLoader: false,
    editButtonLoading: false,
    editContactCredentials: {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    },
    headers: [
      {text: 'First Name', value: 'firstName'},
      {text: 'Last Name', value: 'lastName'},
      {text: 'Phone', value: 'phone', sortable: false},
      {text: 'Email', value: 'email', sortable: false},
      {text: 'Action', value: 'action', sortable: false}
    ]
  }),
  computed: {
    ...mapState('contact', ['contacts']),
    ...mapGetters('user', ['accessToken', 'accessTokenHeaderValue']),
  },
  created() {
  },
  mounted() {
    this.getContacts();
  },
  methods: {
    ...mapActions('contact', ['getContacts', 'deleteContact', 'editContact']),
    _deleteContact(id) {
      this.deleteLoader = true;
      this.deleteContact(id).then(() => {
          this.getContacts();
          this.deleteDialog = false;
          this.deleteLoader = false;
        }
      );
    },
    assignValuesToEdit(item) {
      this.selectedItem = this.contacts.indexOf(item);
      this.editContactCredentials = Object.assign({}, item);
      this.editDialog = true;
    },
    _editContact() {
      this.editButtonLoading = true;
      this.editContact({
        id: this.editContactCredentials.id,
        firstName: this.editContactCredentials.firstName,
        lastName: this.editContactCredentials.lastName,
        phone: this.editContactCredentials.phone,
        email: this.editContactCredentials.email,
      }).then(() => {
        this.getContacts();
        this.editButtonLoading = false;
        this.editDialog = false;
      }).catch(() => {
        this.editButtonLoading = false;
      });
    }
  }
};

</script>
