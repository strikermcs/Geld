<template>
  <Loader v-if="loading"/>
  <div v-else>
    <header>
      <TheNavBar :menuActive="sideBarActive" @burgerClick="sideBarHandle"/>
    </header>
    <w-flex grow>
      <w-transition-expand>
        <aside v-if="sideBarActive">
          <TheSideBar />
        </aside>
      </w-transition-expand>
      <main class="grow">
      <router-view />
      </main>
      <div class="add-record-button">
        <w-button class="pa7 record_button" 
        bg-color="blue" 
        icon="mdi mdi-plus" 
        route="/record"
        color="white"
        ></w-button>
      </div>
    </w-flex>
  </div> 
</template>


<script>
import TheNavBar from '../components/app/TheNavBar.vue'
import TheSideBar from '../components/app/TheSideBar.vue'
import Loader from '../components/app/Loader.vue'
import { useInfoStore } from '../store/info'
import { mapActions } from 'pinia'

export default {
  data: () => ({
    sideBarActive: true,
    loading: true 
  }),
  methods:{
    ...mapActions(useInfoStore, ['fetchInfo']),

    sideBarHandle(){
      this.sideBarActive = !this.sideBarActive
    }
  },
  async mounted(){
    await this.fetchInfo()
    this.loading = false
  },
  components:{
    TheNavBar,
    TheSideBar,
    Loader
  }
}
</script>

<style scoped>
  .add-record-button{
    position: fixed;
    bottom: 50px;
    right: 50px;
  }

  @media screen and (max-width: 900px) {
    .add-record-button {
      bottom: 20px;
      right: 20px;
    }

    .record_button {
      padding: 20px;
    }
  }
</style>