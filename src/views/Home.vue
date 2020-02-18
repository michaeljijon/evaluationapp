<template>
  <div>
    <v-app-bar
      color="primary"
      dark
      flat
      prominent
      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
      :height="allHeigh"
      class="pt-2"
      style="background: #fff !important;"
    >
      <template v-slot:img="{ props }">
        <v-img
        cover
          position="center center"
          v-bind="props"
          gradient="to top right, rgba(0,0,0,.5), rgb(66,103,178)"
        ></v-img>
      </template>

      <div
        class="d-flex flex-column justify-center align-center"
        :style="{ height: '100%', width: '100%',
          position: 'absolute', top: 0, left: 0,
          padding: `${$vuetify.breakpoint.xsOnly ? '20px' : '100px' }` }">
        <p :class="[
          'text-center',
          `${$vuetify.breakpoint.xsOnly ? 'headline' : 'display-2' }`,
          'font-weight-thin',
        ]">
          Un sistema para la evaluación de la etapa de pruebas de aplicaciones web
        </p>
        <p :class="[
          'text-center',
          `${$vuetify.breakpoint.xsOnly ? 'subtitle-1' : 'headline' }`,
          'font-weight-thin',
        ]">
          La etapa de pruebas de aplicaciones web conllevan la evaluación de diversos factores. Este test te ayudará a conocer el nivel de cumplimiento de dicha etapa.
        </p>
        <v-btn
          to="/evaluation"
          tile
          text
          depressed
        >INICIAR TEST DE NIVEL DE CUMPLIMIENTO</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  computed: {
    allHeigh() {
      return window.innerHeight;
    },
  },
};
</script>
