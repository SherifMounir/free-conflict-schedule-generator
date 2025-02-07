import Vue from "vue";
import { Line, Doughnut, Bar } from "vue-chartjs";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    ArcElement,
} from "chart.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
);

Vue.component("line-chart", {
    type: 'line',
    extends: Line,
});
Vue.component("doughnut-chart", {
    extends: Doughnut,
});
Vue.component("bar-chart", {
    extends: Bar,
});