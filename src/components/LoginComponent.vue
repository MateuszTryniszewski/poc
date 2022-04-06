<template>
  <div>
    <v-card-title>Logowanie</v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()" />

        <v-text-field
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          required
          :type="showPass ? 'text' : 'password'"
          name="input-10-2"
          label="Hasło"
          class="input-group--focused"
          @click:append="showPass = !showPass"/>

        <v-card-actions align="center" justify="end">
          <v-col>
            <v-btn class="d-block" @click="onLogin">Zaloguj</v-btn>
            <v-divider class="mt-4 mb-2"></v-divider>
            <v-btn class="d-block" text color="primary" @click="$emit('loginStateChange', true)">
              <span>Nie masz konta?</span>
              <v-icon dark left class="ml-1">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </v-card-text>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// @ is an alias to /src

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },

  name: 'LoginComponent',
  components: {
  },

  data: () => ({
    email: '',
    password: '',
    showPass: false,
  }),

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.email && errors.push('Wprowadź prawidłowy email');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.required && errors.push('E-mail jest wymagany');
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    onLogin() {
      this.$v.$touch();
      signInWithEmailAndPassword(auth, this.email, this.password).then((result) => {
        // eslint-disable-next-line no-shadow
        const { email, uid } = result.user;
        this.$store.dispatch('setUser', { email, uid });
        this.$router.push('/');
      }).catch((err) => {
        this.$emit('error', err.message);
      });
    },
  },

  created() {
  },
};
</script>
