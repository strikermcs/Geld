<template>
  <div class="page_body">
    <h2>История записей</h2>
    <w-divider class="my6 mx-3"></w-divider>
    <div class="history_table">
      <HistoryTable />
    </div>
  </div>
</template>

<script>
import HistoryTable from '../components/TheHistoryTable.vue'

export default {

  components:{
    HistoryTable
  }

}
</script>