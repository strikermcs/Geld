<template>
  <w-toolbar 
  vertical
  width="16em"
  bg-color="info-light2"
  class="nav"
  shadow
  >
    <div class="navbar">
      <w-list
      :items="links"
      nav
      hover
      color="grey-dark5"
      class="title3 mt9"
      >
      </w-list>
    </div>
  </w-toolbar>
</template>

<script>
export default {
   data: () => ({
        links: [
            {label: 'Счет', route: '/'},
            {label: 'История', route: '/history'},
            {label: 'Планирование', route: '/planning'},
            {label: 'Новая запись', route: '/record'},
            {label: 'Категории', route: '/categories'},
        ]
    })
}
</script>

<style scoped>
.navbar {
  height: 91.5vh;
}

.nav{
  margin-top: 64px;
}

@media screen and (max-width: 900px) {

    .nav{
    position: fixed;
    left: 0;
    z-index: 10;
  }
}
</style>