<template>
  <w-toolbar shadow
  bg-color="warning-dark1"
  color="primary-dark3"
  height="4em"
  class="py0 tool_bar"
  >
    <div class="burger_menu" @click="burgerMenuClick">
        <w-icon v-if="menuActive" size="2em">mdi mdi-hamburger-remove</w-icon>
        <w-icon v-else size="2em">mdi mdi-hamburger-plus</w-icon>
    </div>
    <div class="title2">Geld</div>
    <span class="ml12 date_time">{{$date(date, 'datetime')}}</span>
    <div class="spacer"></div>
    <w-divider class="mr5" vertical></w-divider>
    <w-menu show-on-hover>
      <template #activator="{ on }">
        <w-button v-on="on" bg-color="#FF8800" lg class="mr7">
           {{name}}
          <w-icon class="ml1">mdi mdi-menu-down</w-icon>
        </w-button>
      </template>
       <w-list
       :items="userMenuItems"
       class="title5"
       @item-click="menuClickHandle"
      nav
       >
          <template #item="{ item }">
            <w-icon class="mr5" xl>{{ item.icon }}</w-icon>
            <span>{{ item.label }}</span> 
          </template>
       </w-list>
    </w-menu>
  </w-toolbar>
</template>

<script>
import { useInfoStore } from '../../store/info'
import { mapState } from 'pinia' 
import { useAuthStore } from '../../store/auth'
import { mapActions } from 'pinia'

export default {
  props: ['menuActive'],
   data: () => ({
        date: new Date(),
        interval: null,
        userMenuItems: [
          {label: 'Профиль', icon: 'mdi mdi-face-man', route: '/profile'},
          {label: 'Выйти', icon: 'mdi mdi-power', route: "/login" },
        ]
  }),
  methods:{
    ...mapActions(useAuthStore, ['logout']),

    burgerMenuClick(){
      this.$emit('burgerClick')
    },
    async menuClickHandle(item){
      if(item.route === '/login'){
        await this.logout()
      } 
    }
  },
  computed:{
    ...mapState(useInfoStore, ['getUserName']),

    name(){
      return this.getUserName
    }
  },
  mounted(){
    this.interval = setInterval(() => {
        this.date = new Date()
    }, 1000)
      
  },
    beforeDestroy(){
        clearInterval(this.interval)
    }
}

</script>


<style scoped>

.tool_bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.burger_menu{
  cursor: pointer;
  margin-right: 10px;
}

@media screen and (max-width: 540px) {
  .date_time{
    display: none;
  }

}
</style>

