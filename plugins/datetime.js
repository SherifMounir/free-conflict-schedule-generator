import Vue from 'vue'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'
Settings.defaultLocale = 'en'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.component('datetime', Datetime)
