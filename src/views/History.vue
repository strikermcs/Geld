<template>
  <div class="page_body">
    <h2>История записей</h2>
    <w-divider class="my6 mx-3"></w-divider>
    <Loader v-if="loading"/>
     <p class="text-center" v-else-if="!records.length">Записей пока нет! 
    <router-link to="/record">Добавить запись</router-link></p>
    <div class="history_body" v-else>
      <div class="history_chart">
        <Pie :chart-data="chartData" :styles="chartStyle"/>
      </div>
      <div class="history_table">
        <HistoryTable :records="items"/>
        <div class="pagination-wrapper">
          <Paginate 
            v-model="page"
            :page-count="pageCount"
            :click-handler="pageChangeHandler"
            :prev-text="'Назад'"
            :next-text="'Вперед'"
            :container-class="'pagination'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import HistoryTable from '../components/TheHistoryTable.vue'
import { Pie } from 'vue-chartjs'
import Paginate from "vuejs-paginate-next"
import paginationMixin from '../mixins/pagination.mixin'
import { useRecordStore } from '../store/record'
import { useCategoryStore } from '../store/category'
import { mapActions } from 'pinia'
import { Chart as ChartJS, Title, Tooltip, ArcElement, Legend, PieController, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PieController,  ArcElement, CategoryScale, LinearScale)


export default {
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    categories: [],
    records: [],
    chartStyle: {
      width: "300px"
     } 
  }),
  methods:{
    ...mapActions(useRecordStore, ['fetchRecords']),
    ...mapActions(useCategoryStore, ['fetchCategories']),

    setup(categories){
      this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }
      })) 
    }
  },
  computed:{
    chartData(){
      return {
          labels: this.categories.map(c => c.title),
          datasets: [{
            label: 'Расходы по категориям',
            data: this.categories.map(c => {
              return this.records.reduce((total, r) => {
                if(r.categoryId === c.id && r.type === 'outcome'){
                      total += +r.amount
                  }
                  return total
              }, 0)
            }),
            backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
        }
    }
  },
  async mounted(){
    this.records = await this.fetchRecords()
    this.categories = await this.fetchCategories()
    this.setup(this.categories)
    this.loading = false
  },
  components:{
    Loader,
    Pie,
    Paginate,
    HistoryTable
  }

}
</script>


<style>
.history_chart {
  display: flex;
  justify-content: center;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 3;
  color: #23527c;
  background-color: #eee;
  border-color: #ddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

</style>