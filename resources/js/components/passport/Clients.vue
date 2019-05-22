<template>
    <div>
        <div class="border rounded-lg">
            <div class="px-4 py-3 border-b bg-gray-100 text-gray-600 rounded-t-lg flex items-center justify-between">
                <span class="font-semibold">OAuth Clients</span>
                <a class="text-sm cursor-pointer hover:underline" tabindex="-1" @click.prevent="createForm.visible = true">Create Client</a>
            </div>

            <div class="p-4 bg-white text-gray-700 rounded-b-lg overflow-hidden">
                <!-- Current Clients -->
                <p class="mb-0" v-if="clients.length === 0">
                    You have not created any OAuth clients.
                </p>

                <table v-else>
                    <thead>
                        <tr>
                            <th>Client ID</th>
                            <th>Name</th>
                            <th>Secret</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="client in clients">
                            <!-- ID -->
                            <td style="vertical-align: middle;">
                                {{ client.id }}
                            </td>

                            <!-- Name -->
                            <td style="vertical-align: middle;">
                                {{ client.name }}
                            </td>

                            <!-- Secret -->
                            <td style="vertical-align: middle;">
                                <code>{{ client.secret }}</code>
                            </td>

                            <!-- Edit Button -->
                            <td style="vertical-align: middle;">
                                <a class="cursor-pointer" tabindex="-1" @click.prevent="edit(client)">
                                    Edit
                                </a>
                            </td>

                            <!-- Delete Button -->
                            <td style="vertical-align: middle;">
                                <a class="cursor-pointer text-danger" @click.prevent="destroy(client)">
                                    Delete
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <modal :visible="createForm.visible" ref="createClientModal">
            <div class="border border-gray-400 bg-white rounded-lg">
                <div class="p-4 border-b bg-gray-100 rounded-t-lg flex items-center justify-between">
                    <h4 class="text-gray-600 font-semibold">Create Client</h4>

                    <button
                        class="p-1 text-gray-600 hover:text-gray-900"
                        @click.prevent="createForm.visible = false"
                        aria-hidden="true"
                    >
                        <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
                            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                        </svg>
                    </button>
                </div>

                <div class="p-6">
                    <!-- Form Errors -->
                    <div class="alert alert-danger" v-if="createForm.errors.length > 0">
                        <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
                        <br>
                        <ul>
                            <li v-for="error in createForm.errors">
                                {{ error }}
                            </li>
                        </ul>
                    </div>

                    <!-- Create Client Form -->
                    <form role="form">
                        <!-- Name -->
                        <div>
                            <input
                                autofocus
                                required
                                tabindex="1"
                                type="text"
                                placeholder="Name"
                                class="form-input"
                                @keyup.enter="store"
                                v-model="createForm.name"
                            />

                            <div class="mt-2 text-gray-600 text-sm">Something your users will recognize and trust.</div>
                        </div>

                        <!-- Redirect URL -->
                        <div class="form-group row">
                            <label class="col-md-3 col-form-label">Redirect URL</label>

                            <div class="col-md-9">
                                <input type="text" class="form-input" name="redirect" @keyup.enter="store" v-model="createForm.redirect">

                                <span class="form-text text-muted">
                                    Your application's authorization callback URL.
                                </span>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                    <button type="button" class="btn btn-primary" @click.prevent="store">
                        Create
                    </button>
                </div> -->
            </div>
        </modal>

        <!-- Edit Client Modal -->
        <div class="hidden modal fade" ref="editClientModal" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            Edit Client
                        </h4>

                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>

                    <div class="modal-body">
                        <!-- Form Errors -->
                        <div class="alert alert-danger" v-if="editForm.errors.length > 0">
                            <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
                            <br>
                            <ul>
                                <li v-for="error in editForm.errors">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>

                        <!-- Edit Client Form -->
                        <form role="form">
                            <!-- Name -->
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Name</label>

                                <div class="col-md-9">
                                    <input id="edit-client-name" type="text" class="form-control"
                                                                @keyup.enter="update" v-model="editForm.name">

                                    <span class="form-text text-muted">
                                        Something your users will recognize and trust.
                                    </span>
                                </div>
                            </div>

                            <!-- Redirect URL -->
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Redirect URL</label>

                                <div class="col-md-9">
                                    <input type="text" class="form-control" name="redirect"
                                                    @keyup.enter="update" v-model="editForm.redirect">

                                    <span class="form-text text-muted">
                                        Your application's authorization callback URL.
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                        <button type="button" class="btn btn-primary" @click.prevent="update">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            clients: [],
            createForm: {
                visible: false,
                errors: [],
                name: '',
                redirect: ''
            },
            editForm: {
                visible: false,
                errors: [],
                name: '',
                redirect: ''
            }
        }),

        ready() {
            this.prepareComponent()
        },

        mounted() {
            this.prepareComponent()
        },

        methods: {
            prepareComponent() {
                this.getClients()

                // $('#modal-create-client').on('shown.bs.modal', () => {
                //     $('#create-client-name').focus()
                // })

                // this.$refs.editClientModal.on('shown.bs.modal', () => {
                //     $('#edit-client-name').focus()
                // })
            },

            getClients() {
                axios.get('/oauth/clients')
                    .then(response => this.clients = response.data)
            },

            showCreateClientForm() {
                this.data.createForm.visible = true
            },

            hideCreateClientForm() {
                this.$refs.createClientModal.classList.add('hidden')
            },

            showEditClientForm() {
                this.$refs.editClientModal.classList.remove('hidden')
            },

            hideEditClientForm() {
                this.$refs.editClientModal.classList.add('hidden')
            },

            store() {
                this.persistClient(
                    'post', '/oauth/clients',
                    this.createForm, this.$refs.createClientModal
                )
            },

            edit(client) {
                this.editForm.id = client.id
                this.editForm.name = client.name
                this.editForm.redirect = client.redirect

                this.$refs.editClientModal.classList.remove('hidden')
            },

            update() {
                this.persistClient(
                    'put', '/oauth/clients/' + this.editForm.id,
                    this.editForm, this.$refs.editClientModal
                )
            },

            persistClient(method, uri, form, modal) {
                form.errors = []

                axios[method](uri, form)
                    .then(response => {
                        this.getClients()

                        form.name = ''
                        form.redirect = ''
                        form.errors = []

                        modal.classList.add('hidden')
                    })
                    .catch(error => {
                        if (typeof error.response.data === 'object') {
                            form.errors = _.flatten(_.toArray(error.response.data.errors))
                        } else {
                            form.errors = ['Something went wrong. Please try again.']
                        }
                    })
            },

            destroy(client) {
                axios.delete('/oauth/clients/' + client.id)
                    .then(this.getClients())
            }
        }
    }
</script>
