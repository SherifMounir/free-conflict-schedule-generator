<template>
    <div class="row flex justify-content-center">
      <div class="col-md-6">
        <UiCard class="h-100 p-3">
          <FullCalendar :options='calendarOptions'/>
                
          <div class="row gap-3 flex justify-content-center mt-3">
            <div class="col-2">
                <button type="button" class="btn btn-success w-100" @click="console()">Accept</button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-danger w-100">Re-Generate</button>
            </div>

          </div>
        </UiCard>
      </div>
      <div class="col-md-6">
        <UiCard class="h-100 p-3">
          <FullCalendar :options='calendarOptions'/>
                
          <div class="row gap-3 flex justify-content-center mt-3">
            <div class="col-2">
                <button type="button" class="btn btn-success w-100" @click="console()">Accept</button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-danger w-100">Re-Generate</button>
            </div>

          </div>
        </UiCard>
      </div>
    </div>

</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
          bootstrap5Plugin
        ],
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        timeZone: 'UTC',
        initialView: 'timeGridWeek',
        themeSystem: 'bootstrap5',
        editable: true,
        height: 600,
        weekends: true,
        dayHeaderFormat: { weekday: 'long' },

        events: [
          {
            "groupId": "999",
            "title": "Repeating Event",
            "start": "2025-01-16T16:00:00+00:00",
            "end": "2025-01-16T18:30:00+00:00"
          },
          
          {
            "title": "Meeting",
            "start": "2025-01-16T10:30:00+00:00",
            "end": "2025-01-16T12:30:00+00:00"
          },
          {
            "title": "Lunch",
            "start": "2025-01-16T12:00:00+00:00",
            "end": "2025-01-16T14:30:00+00:00"
          },
          {
            "title": "Birthday Party",
            "start": "2025-01-17T07:00:00+00:00",
            "end": "2025-01-17T09:30:00+00:00"
          }
        ]
      }
    }
  },
  methods: {
    console(){
        console.log(this.calendarOptions)
    }
  }
}

</script>
<style lang="scss">
  .fc-daygrid-event {
    border-radius: 0px;
    padding: 5px 5px;
  }
  .border-radius {
    border-radius: 20px !important;
    padding-left: 0.7em;
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start {
    padding: 0px;
  }
  .fc-direction-ltr .fc-daygrid-event.fc-event-start, .fc-direction-rtl .fc-daygrid-event.fc-event-end {
    padding: 0px !important;
    div {
        overflow: hidden;
    }
  }
  .fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end), .fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start) {
    padding: 0px !important;
  }
  
  .remove-event-icon {
    z-index: 99999;
    background: rgb(0 0 0 / 25%);
    height: 100%;
    top: 0;
    text-align: center;
    align-items: center;
    display: flex;
    right: 0;
    padding-left: 8px;
    padding-right: 8px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .add-new-color-category {
    background: #fff;
    width: 100%;
    border-bottom: 1px solid var(--gray_color_2);
    bottom: 0;
    background-color: var(--gray_color);
    position: sticky;
  }
  .modal-colors {
    height: 500px;
    max-height: 500px;
    overflow-y: auto;
  }
  .fc-toolbar-chunk {
    .btn-group {
      display: none;
    }
  }
</style>