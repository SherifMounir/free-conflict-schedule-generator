<template >
    <div id="app" class="main-grid" >
        <AppSidebar/>
        <div class="grid__content" id="grid__content">
            <AppHeader />
            <div class="main-page-dashboard">
              <transition mode="out-in" name="home">
                <NuxtChild/>
              </transition>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>