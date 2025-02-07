<template>
    <div classs="container-fluid">
        <div class="row main-page-dashboard">
            <div class="col-12 col-md-6 col-xl-4" v-for="routeItem in childRoute">
                <NuxtLink :to="localePath(routeItem.path)" class="child-route">
                    <UiCard class="py-3 d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <div class="child-route__icon">
                                <i :class="routeItem.icon"></i>
                            </div> 
                            <span class="px-2">{{ routeItem.name }}</span>
                        </div>
                        <div :class="routeItem.done ? 'text-success' : 'text-danger'">
                            <i class="bi" :class="routeItem.done ? 'bi-check-circle-fill' : 'bi-x-circle-fill'" ></i>
                        </div>
                    </UiCard>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            childRoute: Array
        }
    }
</script>
