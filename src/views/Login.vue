<template>
  <div>
    <h1 class="text-center">Geld</h1>
    <w-card title="Авторизация" bg-color="white">
      <w-form v-model="valid">
        <w-input label="Email" type="email" v-model="email" class="form_input mb3" :validators="[validators.required, validators.email]"></w-input>
        <w-input label="Password" type="password" v-model="password" class="form_input mb5" :validators="[validators.required]"></w-input>
        <w-button type="submit" bg-color="warning-dark1" color="white" width="100%" @click="submitHandler">Войти</w-button>
        <div class="text-center mt5">
          <p>Нет аккаунта? <span>
            <router-link to="/register" class="link">
              ЗАРЕГИСТРИРОВАТЬСЯ
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
    ...mapActions(useAuthStore, ['login']),

    async submitHandler(){
      if(this.valid){
        await this.login(this.email, this.password)
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