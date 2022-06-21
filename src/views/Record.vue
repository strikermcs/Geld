<template>
    <div class="page_body">
    <div class="page_title w-flex justify-space-between">
      <h2>Новая запись</h2>
    </div>
    <w-divider class="my6 mx-3"></w-divider>
    <Loader v-if="loading"/>
    <p class="text-center" v-else-if="!categories.length">Категорий пока нет! 
    <router-link to="/categories">Добавить категорию</router-link></p>
    <w-flex gap="6" wrap class="cards" v-else>
      <w-form  v-model="valid" class="form_create">
        <w-select :items="getCategoryItems"
        v-model="selectedCategory"
        no-unselect
        @item-click="updateSelectHandle"
        class="mb7 mt4"
        ></w-select>
       <w-radios
        v-model="type"
        :items="radioItems"
        class="mb5"
        >
       </w-radios>
        <w-input label="Сумма"
        :validators="[validators.required, validators.minSum]"
        v-model="amount"
        type="number"
        class="mb7"
        ></w-input>
        <w-input label="Описание"
        :validators="[validators.required, validators.minLength]"
        v-model="description"
        type="text"
        class="mb7"
        ></w-input>
        <w-button type="submit" lg @click="submitHandler">
          Создать
          <w-icon class="ml4">mdi mdi-send</w-icon>
        </w-button>
      </w-form>
    </w-flex>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import { useInfoStore } from '../store/info'
import { useRecordStore } from '../store/record'
import { useCategoryStore } from '../store/category'
import { mapState, mapActions } from 'pinia'

export default {
  data: () => ({
    loading: true, 
    categories: [],
    type: 'outcome',
    amount: null,
    description: null,
    selectedCategory: null,
    selected: null,
    valid: false,
    radioItems: [
      {label: "Приход", value: 'income'},
      {label: "Расход", value: 'outcome'},
    ],
    validators: {
      required: value => !!value || 'Поле не должно быть пустым',
      minLength: value => value.length >= 6 || 'Поле не должно быть менее 6 символов',
      minSum: value => value >= 1 || 'Сумма не должа быть меньше 1' 
    } 
  }),
  methods:{
    ...mapActions(useCategoryStore, ['fetchCategories']),
    ...mapActions(useRecordStore, ['createRecord']),
    ...mapActions(useInfoStore, ['updateInfo']),

    updateSelectHandle(item){
      this.selected = item
    },

    async submitHandler(){
       if(this.valid){
        if(this.canCreateRecord){
          try {
            await this.createRecord({
              categoryId: this.selected.id,
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON()
            })
            const bill = this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount 
            await this.updateInfo({bill})
            this.$waveui.notify('Запись успешно создана', 'success')
            this.amount = 1
            this.description = ''  
          } catch (e) {}
        }else{
           this.$waveui.notify(`Недостаточно средств на счете (${this.amount - this.info.bill})`, 'warning')
        }
       } 
    }
  },
  computed:{
    ...mapState(useInfoStore, ['info']),

    canCreateRecord(){
      if(this.type === 'income'){
        return true
      }
      return this.info.bill >= this.amount
    },

     getCategoryItems(){
       return this.categories.map(cat => {
        return {label: cat.title, id: cat.id, limit: cat.limit}
       })
    }
  }, 
  async mounted(){
    this.categories = await this.fetchCategories()
    this.selectedCategory = this.getCategoryItems[0],
    this.selected = this.selectedCategory
    this.loading = false
  },
  components:{
    Loader
  } 
}
</script>


<style scoped>
.form_create {
  width: 50%;
}

@media screen and (max-width: 900px) {
.form_create {
  width: 100%;
}
}
</style>