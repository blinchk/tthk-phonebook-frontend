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
    <v-divider />
    <v-col class="text-right">
      <v-btn
        color="primary"
        dark
        @click.stop="addDialog = true"
      >
        New Group
      </v-btn>
    </v-col>


    <v-data-table
      :headers="headers"
      :items="groups"
      :search="search"
    >
      <template v-slot:item.action="{ item }">
        <v-btn
          class="mr-2"
          icon
          small
          @click.stop="assignGroupName(item)"
        >
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          icon
          small
          @click.stop="deleteDialog = true; selectedItem = item"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog
      v-model="deleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title>Delete group</v-card-title>
        <v-card-text>
          Are you sure you want to delete this group?
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
            @click.stop="_deleteGroup(selectedItem)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="editDialog"
      width="300"
    >
      <v-card>
        <v-card-title>
          Edit group
        </v-card-title>
        <v-col cols="12">
          <v-row class="ml-2 mr-2">
            <v-text-field
              v-model="editGroupCredentials.title"
              class="ml-1 mr-1"
              label="First Name"
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
            @click.stop="_editGroup(editGroupCredentials.id)"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="addDialog"
      width="300"
    >
      <v-card>
        <v-card-title>
          Add new group
        </v-card-title>
        <v-col cols="12">
          <v-row class="ml-2 mr-2">
            <v-text-field
              v-model="title"
              class="mr-2 ml-1"
              label="Name"
            />
          </v-row>
        </v-col>

        <v-divider />
        <v-card-actions>
          <v-col class="text-right">
            <v-btn
              text
              @click.stop="addDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              :loading="addLoader"
              color="success"
              text
              @click.stop="_addGroup()"
            >
              Add
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "Groups",
  data: () => ({
    headers: [
      {text: 'Name', value: 'title'},
      {text: 'Action', value: 'action', sortable: false}
    ],
    editGroupCredentials: {
      title: ''
    },
    deleteLoader: false,
    deleteDialog: false,
    editDialog: false,
    editLoader: false,
    addDialog: false,
    addLoader: false,
    tableLoader: false,
    search: '',
    selectedItem: '',
    title: ''

  }),
  computed: {
    ...mapState('group', ['groups'])
  },
  mounted() {
    this.getGroups();
  },
  methods: {
    ...mapActions('group', ['getGroups', 'addGroup', 'deleteGroup', 'editGroup']),
    async _addGroup() {
      this.addLoader = true;
      this.addGroup({
        title: this.title
      }).then(() => {
        this.addDialog = false;
        this.addLoader = false;
        this.getGroups();
      }).catch(() => {
        this.addLoader = false;
      });
    },
    assignGroupName(item) {
      this.selectedItem = this.groups.indexOf(item);
      this.editGroupCredentials = Object.assign({}, item);
      this.editDialog = true;
    },
    _editGroup() {
      this.editLoader = true;
      this.editGroup({
        id: this.editGroupCredentials.id,
        title: this.editGroupCredentials.title
      }).then(() => {
        this.getGroups();
        this.editLoader = false;
        this.editDialog = false;
      }).catch(() => {
        this.editLoader = false;
      });
    },
    _deleteGroup(id) {
      this.deleteLoader = true;
      this.deleteGroup(id).then(() => {
        this.getGroups();
        this.deleteLoader = false;
        this.deleteDialog = false;
      });
    }
  }

};
</script>

<style scoped>

</style>
