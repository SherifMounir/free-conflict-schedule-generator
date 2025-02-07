<template>
    <div class="row d-flex align-items-center">
        <div class="col-lg-8 col-12">
            <doughnut-chart :chart-data="doughnutChartData" ref="doughnutRef" :chart-options="doughnutChartOptions" class="mb-2"/>
        </div>
        <div class="col-lg-4 col-12">
            <div v-for="itemDou, itemDouIndex in doughnutChartData.labels" :key="itemDouIndex" class="d-flex align-items-center mb-1">
                <span style="width: 20px; height: 20px;" :style="{ 'background-color': doughnutChartData.datasets[0].backgroundColor[itemDouIndex] }" class="d-flex align-items-center justify-content-center">
                    <span class="x-small-size" v-if="doughnutChartData.datasets[0].data[itemDouIndex] == 0">{{ doughnutChartData.datasets[0].data[itemDouIndex] }}</span>
                </span>
                <span class="px-2 small-size text-capitalize">{{ doughnutChartData.labels[itemDouIndex] }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        doughnutChartData: Object
    },
    data() {
        return {
            
            doughnutChartOptions: {
                responsive: true,
                plugins: { 
                    legend: { display: false,},
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                        }
                    }
                },
                cutout: '75%',
            },
        }
    },
    methods: {
        updateChart(){
            this.doughnutChartData.datasets[0].data = this.data
            this.$refs.doughnutRef.updateChart();
        }
    },
    watch: {
        data: {
            handler: function(value) {
                    this.updateChart()
            }
        }
    }
}
</script>
<style>
    .small-size {
        font-size: 13px;
    }
    .x-small-size {
        color: #3b1818;
        font-size: 10px;
        font-weight: bold;
    }
</style>