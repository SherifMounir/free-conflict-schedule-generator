<template>
  <div class="row flex justify-content-center">
    <div class="col-md-6">
      <UiCard class="h-100 p-3">
        <div v-if="sessions.length === 0" class="text-center p-5">
          <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h4 class="text-muted">No schedule generated yet</h4>

        </div>
        <table v-else class="table table-bordered">
          <thead>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>GROUP NAME</th>
              <th>Instructor</th>
              <th>Type</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="session in sessions" :key="session[1] + session[3]">
              <!-- <td>{{ session.day }}</td>
              <td>{{ session.start_time }}</td>
              <td>{{ session.end_time }}</td>
              <td>{{ session.room }}</td>
              <td>{{ session.instructor }}</td>
              <td>{{ session.type }}</td>
              <td>{{ session.course_code }}</td> -->

              <td>{{ session[0] }}</td>
              <td>{{ session[1] }}</td>
              <td>{{ session[2] }}</td>
              <td>{{ session[3] }}</td>
              <td>{{ session[4] }}</td>
              <td>{{ session[5] }}</td>
              <td>{{ session[6] }}</td>
            </tr>
          </tbody>
        </table>


      </UiCard>
    </div>
  </div>

</template>
<script>

export default {

  data: function () {
    return {
      sessions: [],


    }

  },

  async mounted() {
    try {
        const userId = JSON.parse(localStorage.getItem("userData")).id;

        const response = await this.$axios.post(`http://localhost:5000/api/student_schedule`, {
            student_id: userId,
        });

        console.log("Full Response:", response);
        console.log("Response Data:", response.data);

        let data = response.data;

        // Ensure `schedule` exists and is an object
        if (!data.schedule || typeof data.schedule !== "object") {
            console.error("Invalid schedule data:", data);
            this.sessions = [];
            return;
        }

        // Extract and set `best_solution`
        this.sessions = data.schedule || [];
        console.log("Extracted Sessions:", this.sessions);

    } catch (error) {
        console.error("Error fetching schedule:", error);
        this.sessions = [];
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

.fc-direction-ltr .fc-daygrid-event.fc-event-end,
.fc-direction-rtl .fc-daygrid-event.fc-event-start {
  padding: 0px;
}

.fc-direction-ltr .fc-daygrid-event.fc-event-start,
.fc-direction-rtl .fc-daygrid-event.fc-event-end {
  padding: 0px !important;
}

.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),
.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start) {
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
