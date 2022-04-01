<template>
  <div>
      <v-card-title>Rejestracja</v-card-title>
      <v-card-text>
      <form>
        <v-text-field v-model="name"
          :error-messages="nameErrors"
          label="Imię i nazwisko"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          required
          :type="showPass ? 'text' : 'password'"
          name="input-10-2"
          label="Hasło"
          class="input-group--focused"
          @click:append="showPass = !showPass"/>

        <v-text-field
          v-model="password2"
          :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
          required
          :type="showPass2 ? 'text' : 'password'"
          name="input-10-2"
          label="Powtórz Hasło"
          class="input-group--focused"
          @click:append="showPass2 = !showPass2" />

        <v-card-actions align="center" justify="end">
          <v-col>
            <v-btn class="d-block" @click="register">Zarejestruj</v-btn>
            <v-divider class="mt-4 mb-2"></v-divider>
            <v-btn class="d-block" text color="primary" @click="$emit('loginStateChange', false)">
              <v-icon dark left>mdi-arrow-left</v-icon>
              Powrót
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
      </v-card-text>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// @ is an alias to /src

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(3) },
    email: { required, email },
    select: { required },
    password: { required },
    password2: { required }
  },

  name: 'RegisterComponent',
  components: {
  },

  data: () => ({
    email: '',
    password: '',
    password2: '',
    showPass: false,
    showPass2: false
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push('Nazwa musi mieć przynajmniej 3 znaki')
      !this.$v.name.required && errors.push('Nazwa jest wymagana.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Wprowadź prawidłowy email')
      !this.$v.email.required && errors.push('E-mail jest wymagany')
      return errors
    }
  },

  methods: {
    register () {
      this.$v.$touch()
      createUserWithEmailAndPassword(auth, this.email, this.password).then((result) => {
        const user = result.user
        console.log('user', user)
      }).catch((err) => {
        this.$emit('error', err.message)
      })
    }
  },

  created () {
  }
}
</script>
