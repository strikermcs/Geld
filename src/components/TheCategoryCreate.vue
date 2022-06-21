<template>
  <w-card title="Создать" title-class="blue-light5--bg"
  class="card"
  >
    <w-form v-model="valid">
      <w-input label="Название категории" 
      type="text" class="mb7" 
      :validators="[validators.required, validators.minLength]"
      v-model="name"
      ></w-input>
      <w-input label="Назначить лимит" 
      type="number" class="mb7" 
      :validators="[validators.required, validators.minSum]"
      v-model="limit"
      ></w-input>
      <w-button type="submit" lg @click="submitHandler">
        Создать
        <w-icon class="ml4">mdi mdi-send</w-icon>
      </w-button>
    </w-form>
  </w-card>
</template>


<script>
import { useCategoryStore } from '../store/category'
import { mapActions } from 'pinia'

export default {
  data: () => ({
    name: null,
    limit: null, 
    valid: false,
    validators: {
      required: value => !!value || 'Поле не должно быть пустым',
      minLength: value => value.length >= 3 || 'Поле не должно быть менее 3 символов',
      minSum: value => value >= 100 || 'Сумма не должа быть меньше 100' 
    }
  }),
  methods:{
    ...mapActions(useCategoryStore, ['createCategory']),

    async submitHandler(){
      if(this.valid){
        try {
          const category = await this.createCategory({title: this.name, limit: this.limit})
          this.name = null
          this.limit = null
          this.$waveui.notify('Категория успешно создана', 'success')
          this.$emit('created', category) 
        } catch (e) {}
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 47%;
}

@media screen and (max-width: 1200px){
  .card {
    width: 100%;
  }
}
</style>