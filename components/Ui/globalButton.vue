<template>
    <div :class="buttons.classCol" class="mt-3">
        <div class="d-md-flex d-grid justify-content-md-end action-button-page">
            <div v-for="button, indexButton in buttons.item" class="ps-md-2">
                <NuxtLink v-if="button.type == 'link' && button.show" :key="indexButton" :to="localePath('/dashboard/'+button.path)" class="button-app mb-2" :class="button.style">
                    <i :class="button.icon" class="me-2"></i> {{ button.name }}
                </NuxtLink>
                <button v-if="button.type == 'button' && button.show && button.name != 'Export Data'" :key="indexButton" class="button-app mb-2" :class="button.style" :disabled="button.disabled" @click="$emit(button.action)">
                    <i :class="button.icon" class="me-2"></i> {{ button.name }} <b-spinner v-if="button.loadingBtn" small></b-spinner>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        buttons: Object,
        dataExport: Object
    },
}
</script>