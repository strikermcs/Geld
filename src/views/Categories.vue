<template>
    <div class="page_body">
    <div class="page_title w-flex justify-space-between">
      <h2>Категории</h2>
    </div>
    <w-divider class="my6 mx-3"></w-divider>
    <Loader v-if="loading"/>
    <w-flex gap="6" wrap class="cards" v-else>
      <CategoryCreate @created="addNewCategory"/>
      <CategoryEdit 
      @updated="updateCategories"
      :categories="categories"/>
    </w-flex>
  </div>
</template>


<script>
import Loader from '../components/app/Loader.vue'
import CategoryCreate from '../components/TheCategoryCreate.vue'
import CategoryEdit from '../components/TheCategoryEdit.vue'
import { useCategoryStore } from '../store/category'
import { mapActions } from 'pinia'

export default {
  data: () => ({
    loading: true,
    categories: [],
    updateCount: 0
  }),
  methods:{
    ...mapActions(useCategoryStore, ['fetchCategories']),

    addNewCategory(category){
      this.categories.push(category)
    },
    updateCategories(category){
        const idx = this.categories.findIndex(c => c.id === category.id)
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
        this.updateCount++
    }
  },
  async mounted(){
    this.categories = await this.fetchCategories()
    this.loading = false
  },
  components: {
    Loader,
    CategoryCreate,
    CategoryEdit
  }

}
</script>