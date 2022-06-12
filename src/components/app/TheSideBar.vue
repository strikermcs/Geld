<template>
  <w-toolbar 
  vertical
  width="15em"
  bg-color="secondary"
  >
    <div class="navbar">
      <w-list
      :items="links"
      nav
      hover
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
  height: 90vh;
}
</style>