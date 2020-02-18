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
                <v-card-title>Iniciar sesión</v-card-title>
              </v-toolbar>
              <v-card-text class="px-6">
                <v-form @submit.prevent="login({ email, password })">
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
                </v-form>
                <p>{{ error }}</p>
              </v-card-text>
              <v-card-actions class="px-4">
                <v-btn to="/evaluation" text color="primary">Atras</v-btn>
                <v-spacer />
                <v-btn text color="primary" @click="login({ email, password })">Siguiente</v-btn>
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
  name: 'login',
  methods: {
    ...mapActions(['login']),
  },
  computed: {
    ...mapState(['error']),
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>
