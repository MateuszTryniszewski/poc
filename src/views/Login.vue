<template>
  <div>
    <v-card v-if="!login" elevation="1" outlined  class="mx-auto my-12" max-width="360">
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
            <v-btn class="d-block" @click="submit">Zarejestruj</v-btn>
            <v-divider class="mt-4 mb-2"></v-divider>
            <v-btn class="d-block" text color="primary" @click="login = !login">Logowanie</v-btn>
          </v-col>
        </v-card-actions>
      </form>
      </v-card-text>
    </v-card>

    <v-card v-else elevation="1" outlined  class="mx-auto my-12" max-width="360">
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
            <v-btn class="d-block" @click="onlogin">Zaloguj</v-btn>
            <v-divider class="mt-4 mb-2"></v-divider>
            <v-btn class="d-block" text color="primary" @click="login = !login">Rejestracja</v-btn>
          </v-col>
        </v-card-actions>
      </form>

      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

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

  name: 'Login',
  components: {
  },

  data: () => ({
    name: '',
    email: '',
    password: '',
    password2: '',
    showPass: false,
    showPass2: false,
    login: true
  }),

  computed: {
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors () {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
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
    submit () {
      this.$v.$touch()
    },
    onlogin () {
      this.$v.$touch()
      console.log(auth, this.email, this.password)
      signInWithEmailAndPassword(auth, this.email, this.password).then((result) => {
        console.log('result', result)
      }).catch((err) => {
        console.log('error ', err)
      })
    }
  },

  created () {
    console.log('auth', auth)
  }
}
</script>
