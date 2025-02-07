<template>
    <div class="page_name">
        <i :class="icon"></i> {{ cardName }}
    </div>
</template>

<script>
    export default {
        props: {
            cardName: String,
            icon: String
        }
    }
</script>
<style>
    .page_name {
        padding-bottom: 0.8rem;
        border-bottom: 1px solid #f3f3f3;
        text-transform: capitalize;
    }
</style>