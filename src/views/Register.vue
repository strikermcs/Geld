<template>
  <div>
    <h1 class="text-center">Geld</h1>
    <w-card title="Регистрация" bg-color="white">
      <w-form v-model="valid">
        <w-input label="Email" type="email" class="form_input mb3" :validators="[validators.required, validators.email]"></w-input>
        <w-input label="Password" type="password" class="form_input mb5" :validators="[validators.required]"></w-input>
        <w-input label="Name" type="text" class="form_input mb5" :validators="[validators.required]"></w-input>
        <w-button type="submit" bg-color="warning" width="100%" @click="submitHandler">Войти</w-button>
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

export default {
  data: () => ({
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
    submitHandler(){
      console.log(this.valid)
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