<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
          >
            <v-card class="elevation-2">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-card-title>Crear cuenta</v-card-title>
              </v-toolbar>
              <v-card-text class="px-6">
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                  <v-text-field
                    v-model="verifyPassword"
                    id="verifyPassword"
                    label="Confirmar contraseña"
                    name="verifyPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                  />
                </v-form>
                <p>{{ error }}</p>
              </v-card-text>
              <v-card-actions class="px-4">
                <v-btn to="/evaluation" text color="primary">Atras</v-btn>
                <v-spacer />
                <v-btn :disabled="!disabled"
                  @click="createUser({ email, password })" text color="primary">Siguiente</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      verifyPassword: '',
    };
  },
  computed: {
    ...mapState(['error']),
    disabled() {
      return this.password === this.verifyPassword && this.password;
    },
  },
  methods: {
    ...mapActions(['createUser']),
  },
};
</script>
