<template>
    <client-only placeholder="Loading...">
        <line-chart
        ref="doughnutRef"
        :chart-data="datacollection"
        :chart-options="options"
        :height="100"
        :width="300"
        style="height: 300px;"
        chart-id="lineChart"
        />
    </client-only>
</template>
<script>
export default {
    props: {
        data: Object
    },
    data() {
        return {
            datacollection: this.data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 20,
                // borderRadius: 10,
                hoverOffset: 4,
                tooltips: {
                    backgroundColor: '#17BF62'
                },
                plugins: { 
                    legend: { display: false }, 
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    
                }
            },
        }
    },
    methods: {
        updateChart(){
            this.datacollection = this.data
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