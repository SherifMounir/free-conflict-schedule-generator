<script>
    export default {
        async asyncData({ params, $content, error }) {
            try {
            const post = await $content('dashboard', params.slug).fetch()
            return { post }
            } catch (e) {
                error({ statusCode: 500, message: 'Page not foun' })
            }
        }
  }
</script>