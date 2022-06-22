<template>
  <div class="page_body">
    <div class="page_title w-flex justify-space-between">
      <h2>Планирование</h2>
      <h4>{{$currency(info.bill, 'UAH')}}</h4>
    </div>
    <w-divider class="my6 mx-3"></w-divider>
    <Loader v-if="loading"/>
      <p class="text-center" v-else-if="!categories.length">Категорий пока нет! 
    <router-link to="/categories">Добавить категорию</router-link></p>
    <div class="progress_list" v-else>
      <div class="progress_item mb7"
      v-for="cat of categories" :key="cat.id"
      >
        <p>
          <strong>{{cat.title}}:</strong>
          {{this.$currency(cat.spend,'UAH')}} из {{this.$currency(cat.limit,'UAH')}}
        </p>
        <w-progress
          :model-value="cat.progressPercent"
          size="1em"
          outline
          round
          :color="cat.progressColor"
          stripes>
        </w-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { useInfoStore } from '../store/info'
import { useRecordStore } from '../store/record'
import { useCategoryStore } from '../store/category'
import { mapState} from 'pinia'

export default {
  data:() => ({
    loading: true,
    categories: [] 
  }),
  computed: {
    ...mapState(useInfoStore, ['info'])
  },
  async mounted(){
    const recordStore = useRecordStore()
    const catStore = useCategoryStore()

    const records = await recordStore.fetchRecords()
    const categories = await catStore.fetchCategories()

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)

        const percent = 100 * spend / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
            ? 'green'
            : percent < 100
            ? 'yellow'
            : 'red'

         const tooltipValue = cat.limit - spend
         const tooltip = `${tooltipValue < 0 ? 'Превышение на:' : 'Осталось:'} ${this.$currency(Math.abs(tooltipValue))}`

         return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
         }
    })
    this.loading = false
  }
}
</script>
