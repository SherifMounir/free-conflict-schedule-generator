<template>
    <div>
        <Nuxt/>
    </div>
  </template>
  <script>
  
  export default {
    name: "layout",
    head() {
        if (this.$i18n.locale === 'ar') {
          return {
            htmlAttrs: {
              lang: this.$i18n.locale,
              dir: 'rtl',
            },
          }
        } else {
            return {
              htmlAttrs: {
                lang: this.$i18n.locale,
                dir: 'ltr',
              },
            }
        }
    },
  }
  </script>
  <style lang="scss">

  .main-grid {
    display: flex;
    position: absolute;
    width: 100%;
    transition: all;
  }
  
  .grid__content {
      background-color: var(--background-color);
      height: 100dvh;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      padding: 0.7rem;
      width: 100%;
      transition: all;
  }
  </style>