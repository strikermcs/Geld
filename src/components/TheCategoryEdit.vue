<template>
  <w-card title="Редактировать" title-class="blue-light5--bg"
  class="card"
  >
   <w-form v-if="categories.length" v-model="valid">
      <w-select :items="getCategoryItems"
      v-model="selectedCategory"
      no-unselect
      @item-click="updateSelectHandle"
      class="mb7 mt4"
      ></w-select>
      <w-input label="Имя категории"
      :validators="[validators.required, validators.minLength]"
      v-model="title"
      class="mb7"
      ></w-input>
      <w-input label="Лимит категории"
      :validators="[validators.required, validators.minSum]"
      v-model="limit"
      type="number"
      class="mb7"
      ></w-input>
      <w-button type="submit" lg @click="submitHandler">
        Обновить
        <w-icon class="ml4">mdi mdi-send</w-icon>
      </w-button>
    </w-form>
    <p v-else class="text-center">Категорий пока нет</p>
  </w-card>
</template>


<script>
import { useCategoryStore } from '../store/category'
import { mapActions } from 'pinia'

export default {
  props: ['categories'],
  data: () => ({
    title: null,
    limit: null,
    selectedCategory: null,
    selected: null,
    valid: false,
    validators: {
      required: value => !!value || 'Поле не должно быть пустым',
      minLength: value => value.length >= 3 || 'Поле не должно быть менее 3 символов',
      minSum: value => value >= 100 || 'Сумма не должа быть меньше 100' 
    }
  }),
  methods:{
    ...mapActions(useCategoryStore, ['updateCategory']),

    async submitHandler(){
      if(this.valid){
        try {
          const categoryData = {
            id: this.selected.id,
            title: this.title,
            limit: this.limit
          }
          await this.updateCategory(categoryData)
          this.$waveui.notify('Категория успешно обновлена', 'success')
          this.$emit('updated', categoryData)
          this.selectedCategory = this.getCategoryItems[0]
          this.selected = this.getCategoryItems[0]
          this.title = this.selectedCategory.label
          this.limit = this.selectedCategory.limit
        } catch (e) {}
      }
    },
    updateSelectHandle(item){
      this.title = item.label
      this.limit = item.limit
      this.selected = item
    }
  },
  computed:{
    getCategoryItems(){
       return this.categories.map(cat => {
        return {label: cat.title, id: cat.id, limit: cat.limit}
       })
    }
  },
  mounted(){
    this.selectedCategory = this.getCategoryItems[0]
    this.selected = this.getCategoryItems[0]
    if(this.selectedCategory){
      this.title = this.selectedCategory.label
      this.limit = this.selectedCategory.limit
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