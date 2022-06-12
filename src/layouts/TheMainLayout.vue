<template>
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
  </w-flex>
</template>


<script>
import TheNavBar from '../components/app/TheNavBar.vue'
import TheSideBar from '../components/app/TheSideBar.vue'

export default {
  data: () => ({
    sideBarActive: true
  }),
  methods:{
    sideBarHandle(){
      this.sideBarActive = !this.sideBarActive
    }
  },
  components:{
    TheNavBar,
    TheSideBar
  }
}
</script>

<style scoped>

</style>