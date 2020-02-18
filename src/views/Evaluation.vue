<template>
  <v-app id="inspire">
    <v-app-bar
      app
      dark
      color="primary"
    >
      <v-btn to="/" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-2">
        Evaluación de etapa de pruebas de aplicaciones web
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!existsUser" to="/register" text>
        Crear cuenta
      </v-btn>
      <span v-if="existsUser">{{ user.email }}</span>
      <v-btn v-if="existsUser" @click.stop="dialogHistory= true;" text>
        Historial
      </v-btn>
      <v-btn @click="logout()" v-if="existsUser" text>
        Cerrar sesión
      </v-btn>
      <v-btn v-if="!existsUser" to="/login" text>
        Iniciar sesión
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            max-width="500"
          >
            <v-card>
              <v-card-title class="headline">
                Resultado de la evaluación
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  :color="messageResult.color"
                  text-color="white"
                  small
                >
                  {{ result }}
                  <v-icon right small>mdi-percent</v-icon>
                </v-chip>
              </v-card-title>
              <v-card-text>
                {{ messageResult.message }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="existsUser" color="success" @click="dialogSaveEvaluation = true" text>Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="dialogHistory" scrollable max-width="800px">
            <v-card>
              <v-card-title>Historial de evaluaciones</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 500px;" class="pa-0">
                <v-data-table
                  :headers="headers"
                  :items="this.history"
                  height="430"
                >
                  <template v-slot:item.porcentage="{ item }">
                    <v-chip :color="getColor(item.porcentage)" dark>{{ item.porcentage }}
                      <v-icon right small>mdi-percent</v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      small
                      @click="deleteItem(item)"
                      color="error"
                    >
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row justify="center">
          <v-dialog
            v-model="dialogSaveEvaluation"
            max-width="350"
          >
            <v-card>
              <v-card-title class="headline">Nombre de la evaluación</v-card-title>

              <v-card-text>
                <v-text-field
                  v-model="nameEvaluation"
                  placeholder="Nombre"
                ></v-text-field>
                <p>{{error}}</p>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="error"
                  text
                  @click="dialogSaveEvaluation = false"
                >
                  Cancelar
                </v-btn>

                <v-btn
                  color="green"
                  text
                  @click="save();"
                >
                  Aceptar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-list>
              <v-subheader>{{ header }}</v-subheader>
              <v-list-item
                v-for="(question, index) in questions" :key="index"
              >
                <v-list-item-content>
                  <v-row class="d-flex">
                    <v-col>
                      <v-list-item-title style="min-width: 200px">
                        {{ index + 1 }}. {{ question.question }}</v-list-item-title>
                    </v-col>
                    <v-col cols="9">
                      <v-radio-group
                        class="mt-0 pt-0"
                        dense
                        hide-details
                        v-model="question.value"
                        row
                      >
                        <v-radio
                          v-for="(number, index) in generateArray(question.min, question.max)"
                          :key="index"
                          :label="`${number}`"
                          :value="number"
                        >
                        </v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              class="float-right"
              color="primary"
              tile
              depressed
              @click.stop="dialog = true"
              :disabled="!isComplete"
            >Finalizar</v-btn>
            <v-btn
              class="float-right mr-2"
              color="primary"
              tile
              depressed
              @click="reset()"
              :disabled="!isNew"
            >Nueva evaluación</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; UTMACH - 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
// @ is an alias to /src
import questionsOrigin from '@/assets/questions';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      dialog: false,
      dialogHistory: false,
      dialogSaveEvaluation: false,
      nameEvaluation: '',
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'name',
          width: 200,
        },
        {
          text: 'Porcentaje',
          value: 'porcentage',
          sortable: false,
          align: 'center',
        },
        { text: 'Sugerencias', value: 'suggestion', sortable: false },
        {
          text: '',
          value: 'action',
          sortable: false,
          align: 'center',
        },
      ],
      header: 'Para cada uno de los criterios escoja un puntaje según los valores  máximos y mínimos establecidos para determinar el porcentaje de cumplimiento de pruebas de su aplicación web',
      questions: questionsOrigin,
      tableResults: [
        {
          message: 'La aplicación web no cumple con la etapa de pruebas, se recomienda mejorar la misma de manera inmediata para un trabajo eficiente.',
          min: 0,
          max: 20,
          color: 'error',
        },
        {
          message: 'Cumplimiento mínimo de la etapa de pruebas, se recomienda mejorar la aplicación lo más pronto posible, en cada uno de los puntos en donde selecciono un bajo puntaje.',
          min: 21,
          max: 40,
          color: 'error',
        },
        {
          message: 'Cumplimiento parcial de la etapa de pruebas, la aplicación esta en una etapa media del nivel de eficacia y calidad, se recomienda realizar cambios, en cada uno de los factores en los cuáles no se prestó la mayor atención',
          min: 41,
          max: 60,
          color: 'warning',
        },
        {
          message: 'Cumplimiento significativo de la etapa de pruebas de la aplicación web, se recomiendan ajustes pequeños a la misma, para asegurar un total nivel de calidad',
          min: 61,
          max: 80,
          color: 'info',
        },
        {
          message: 'Cumplimiento total de la etapa de pruebas, su aplicación web esta lista para ser usada por el usuario final, la mayoría de los factores se han cumplido de manera satisfactoria lo que asegura un nivel de calidad alto.',
          min: 81,
          max: 100,
          color: 'success',
        },
      ],
      error: '',
    };
  },
  computed: {
    ...mapState(['history', 'user']),
    ...mapGetters(['existsUser']),
    isNew() {
      return this.questions.some((question) => question.value);
    },
    isComplete() {
      return this.questions.every((question) => question.value);
    },
    result() {
      const sum = this.questions
        .reduce((previousValue, currentValue) => previousValue + currentValue.value, 0);
      const porcentaje = Math.round((sum * 100) / 242);
      return porcentaje;
    },
    messageResult() {
      const result = this.tableResults
        .find((row) => this.result >= row.min && this.result <= row.max);
      if (result) return result;
      return {
        message: '',
        color: 'orange',
      };
    },
  },
  created() {
    if (this.existsUser) {
      this.get(this.user.uid);
    }
  },
  methods: {
    ...mapActions(['logout', 'get', 'add', 'remove', 'getEvaluation']),
    generateArray(min, max) {
      return Array.from({
        length: max,
      }, (e, i) => min + i);
    },
    reset() {
      this.questions = this.questions.map((questionOrigin) => {
        const question = questionOrigin;
        question.value = 0;
        return question;
      });
    },
    save() {
      this.getEvaluation({ name: this.nameEvaluation, userId: this.user.uid })
        .then((doc) => {
          if (doc.empty) {
            const evaluation = {
              name: this.nameEvaluation,
              porcentage: this.result,
              suggestion: this.messageResult.message,
              userId: this.user.uid,
            };
            this.add(evaluation);
            this.nameEvaluation = '';
            this.dialog = false;
            this.dialogSaveEvaluation = false;
            this.reset();
            this.error = '';
          } else {
            this.error = 'Nombre existente';
          }
        });
    },
    deleteItem(item) {
      this.remove(item.id);
    },
    getColor(porcentaje) {
      const result = this.tableResults
        .find((row) => porcentaje >= row.min && porcentaje <= row.max);
      return result.color;
    },
  },
};
</script>
