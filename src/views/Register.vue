<template>
  <div>
    <h1 class="text-center">Geld</h1>
    <w-card title="Регистрация" bg-color="white">
      <w-form v-model="valid">
        <w-input label="Email" type="email" v-model="email" class="form_input mb3" :validators="[validators.required, validators.email]"></w-input>
        <w-input label="Password" type="password" v-model="password" class="form_input mb5" :validators="[validators.required]"></w-input>
        <w-input label="Name" type="text" v-model="name" class="form_input mb5" :validators="[validators.required]"></w-input>
        <w-button type="submit" bg-color="warning-dark1" color="white" width="100%" @click="submitHandler">Регистрация</w-button>
        <div class="text-center mt5">
          <p>Есть аккаунт? <span>
            <router-link to="/login" class="link">
              ВОЙТИ
            </router-link>
          </span></p>
        </div>
      </w-form>
    </w-card>
  </div>
</template>


<script>
import { useAuthStore } from '../store/auth';
import { mapActions } from 'pinia';

export default {
  data: () => ({
    email: null,
    password: null,
    name: null,
    valid: false,
    validators: {
      required: value => !!value || 'This field is required',
      email: value => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return value == value.match(validRegex) || 'Email is incorect'
      }
    }
  }),
  methods:{
    ...mapActions(useAuthStore, ['register']),

    async submitHandler(){
      if(this.valid){
        await this.register(this.email, this.password, this.name)
        this.$router.push('/')  
      }
    }
  }
}
</script>


<style scoped>
.form_input {
  width: 300px;
  font-size: 16px;
}

.link {
  color: #ffab40;
}
</style>