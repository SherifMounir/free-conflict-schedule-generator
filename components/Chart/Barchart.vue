<template>
    <bar-chart :chart-data="datacollection" ref="globalCustomBarchart" :chart-options="barChartOptions" style="height: 100%; width: 80%;"/>
</template>
<script>
export default {
    props: {
        data: Array,
        color: String
    },
    data() {
        return {
            datacollection: {
                labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
                datasets: [
                    {
                        label: "Total Ticket",
                        backgroundColor: this.color,
                        data: this.data
                    }
                ]
            },
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                hoverOffset: 0,
                borderWidth: 0,
                borderRadius: 10,
                barPercentage: 1,
                categoryPercentage: 0.5,
                tooltips: {
                backgroundColor: '#17BF62'
                },
                plugins: { 
                    legend: { 
                        display: false
                    }, 
                },
                scales: {
                    x: {
                        ticks: {
                            display: false,
                            padding: 0,
                            border: 0
                        },
                        grid: {
                            display: false,
                            borderWidth: 0
                        },
                    },
                    y: {
                        ticks: {
                            display: false,
                            padding: 0,
                            border: 0
                        },
                        grid: {
                            display: false,
                            borderWidth: 0
                        }
                    },
                }
            },
        }
    },
    methods: {
        updateChart(){
            this.datacollection.datasets[0].data = this.data
            this.$refs.globalCustomBarchart.updateChart();
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