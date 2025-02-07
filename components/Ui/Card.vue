<template>
    <div class="custom-card mt-2 mb-3">
        <div class="loader-page" v-if="loaderContent != false">
            <b-spinner class="align-middle"></b-spinner>
        </div>
        <slot/>
    </div>
</template>
<script>
    export default {
        props: {
            loaderContent: Boolean
        }
    }
</script>
