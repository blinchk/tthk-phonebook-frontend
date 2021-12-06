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
      <v-spacer />
      <v-btn
        color="success"
        @click.stop="addDialog = true"
      >
        <v-icon left>
          mdi-plus
        </v-icon>Add
      </v-btn>
    </v-card-title>
    <v-divider />

    <v-data-table
      :headers="headers"
      :items="contacts"
      :search="search"
    >
      <template v-slot:item.group="{ item }">
        {{ item.group ? item.group.title : "" }}
      </template>
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
        <v-btn
          small
          icon
          @click.stop="shareContact(item.id)"
        >
          <v-icon>
            mdi-share
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
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
              class="ml-1 mr-2"
              label="First Name"
            />
            <v-text-field
              v-model="editContactCredentials.lastName"
              class="mr-2 ml-2"
              label="Last Name"
            />
          </v-row>
          <v-row class="mr-2 ml-2">
            <v-text-field
              v-model="editContactCredentials.phone"
              class="mr-2 ml-1"
              label="Phone"
            />
            <v-text-field
              v-model="editContactCredentials.email"
              class="mr-2 ml-2"
              label="Email"
            />
          </v-row>
          <v-row class="mr-3 ml-3">
            <v-select
              v-model="editContactCredentials.group"
              clearable
              :items="groups"
              item-text="title"
              item-value="id"
              label="Group"
              @click:clear="clearGroup()"
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
            :loading="editLoader"
            color="success"
            text
            @click.stop="_editContact(editContactCredentials.id)"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addDialog">
      <v-card
        max-width="700px"
        width="700px"
      >
        <v-form
          ref="contactAddForm"
          @submit.prevent="contactAdding()"
        >
          <v-card-title>Add new contact</v-card-title>
          <v-col cols="12">
            <v-row class="ml-2 mr-2">
              <v-text-field
                v-model="firstName"
                class="ml-1 mr-2"
                label="First Name"
              />
              <v-text-field
                v-model="lastName"
                class="mr-2 ml-2"
                label="Last Name"
              />
            </v-row>
            <v-row class="mr-2 ml-2">
              <v-text-field
                v-model="phone"
                class="mr-2 ml-1"
                label="Phone"
              />
              <v-text-field
                v-model="email"
                class="mr-2 ml-2"
                label="Email"
              />
            </v-row>
            <v-row class="mr-3 ml-3">
              <v-select
                v-model="group"
                :items="groups"
                item-text="title"
                item-value="id"
                label="Group"
              />
            </v-row>
          </v-col>
          <v-card-actions class="text-right">
            <v-col class="text-right">
              <v-btn
                text
                @click.stop="addDialog = false"
              >
                Cancel
              </v-btn>
              <v-btn
                :loading="addLoader"
                class="text-right"
                color="success"
                text
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
        <v-col cols="12">
          <v-row class="ml-2 mr-2" />
        </v-col>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="js">
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

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
    addDialog: false,
    addLoader: false,
    editContactCredentials: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      group: null
    },
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    group: null,
    headers: [
      {text: 'First Name', value: 'firstName'},
      {text: 'Last Name', value: 'lastName'},
      {text: 'Phone', value: 'phone', sortable: false},
      {text: 'Email', value: 'email', sortable: false},
      {text: 'Group', value: 'group.title'},
      {text: 'Action', value: 'action', sortable: false}
    ],
    isContactShared: false
  }),
  computed: {
    ...mapState('contact', ['contacts']),
    ...mapState('group', ['groups']),
    ...mapGetters('user', ['accessToken', 'accessTokenHeaderValue']),
  },
  created() {},
  mounted() {
    this.getContacts().then(() => {
      this.getGroups().then(() => {}).catch((error) => {
        if (error.response.status === 401) this.$router.push('/login');
      });
    }).catch((error) => {
      if (error.response.status === 401) this.$router.push('/login');
    });
    if (this.$route.query.add) {
      console.log("let's go add contact with ID: " + this.$route.query.add);
      this.getContact({
        id: this.$route.query.add
      }).then((contact) => {
        this.isContactShared = true;
        this.addDialog = true;
        this.firstName = contact.firstName;
        this.lastName = contact.lastName;
        this.phone = contact.phone;
        this.email = contact.email;
      });
    }
  },
  methods: {
    ...mapMutations(['createNewAlert']),
    ...mapActions('contact', ['getContacts', 'addContact', 'deleteContact', 'editContact', 'getContact']),
    ...mapActions('group', ['getGroups']),
    async contactAdding() {
      this.addLoader = true;
      this.addContact({
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email,
        group: this.group
      })
        .then(() => {
          if (this.isContactShared) {
            this.$router.push(this.$route.path);
            this.isContactShared = false;
          }
          this.addDialog = false;
          this.addLoader = false;
          this.cleanFields();
          this.getContacts();
        })
        .catch(() => {
          if (this.isContactShared) {
            this.$router.push(this.$route.path);
            this.isContactShared = false;
          }
          this.addLoader = false;
        });
    },
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
      this.editLoader = true;
      this.editContact({
        id: this.editContactCredentials.id,
        firstName: this.editContactCredentials.firstName,
        lastName: this.editContactCredentials.lastName,
        phone: this.editContactCredentials.phone,
        email: this.editContactCredentials.email,
        group: this.editContactCredentials.group

      }).then(() => {
        this.getContacts();
        this.editLoader = false;
        this.editDialog = false;
      }).catch(() => {
        this.editLoader = false;
      });
    },
    cleanFields() {
      this.firstName = '';
      this.lastName = '';
      this.phone = '';
      this.email = '';
      this.group = '';
    },
    clearGroup() {
      this.editContactCredentials.group = null;
    },
    shareContact(id) {
      navigator.clipboard.writeText("https://phonebook.laus.me/contacts?add=" + id);
      this.createNewAlert({
        color: 'success',
        text: `URL to contact with ID ${id} copied to clipboard.`
      });
    }
  }
};

</script>
