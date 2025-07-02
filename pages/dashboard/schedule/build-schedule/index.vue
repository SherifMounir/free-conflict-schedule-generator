<template>
  <div class="row flex justify-content-center">
    <div class="text-center p-2">
      <b-form-select v-model="selected" :options="options" class="w-100 custom-select" @change="handleOptionChange"></b-form-select>
    </div>
<div v-if="showInstructorDropdown" class="text-center p-2 position-relative">
  <div class="custom-select-dropdown w-100">
    <button
      class="form-control text-left d-flex justify-content-between align-items-center"
      @click="toggleDropdown"
    >
      <span>{{ selectedInstructor.length ? selectedInstructor.join(', ') : 'Select Instructor(s)' }}</span>
      <i class="fas fa-chevron-down"></i>
    </button>
    <div v-if="dropdownOpen" class="dropdown-menu show w-100 mt-1 px-2 py-1 shadow">
    <div
      v-for="option in instructorOptions"
      :key="option.value"
      class="form-check"
    >
      <input
        class="form-check-input"
        type="checkbox"
        :value="option.value"
        v-model="selectedInstructor"
        :id="'instructor-' + option.value"
        :disabled="isDisabled(option)"
      />
      <label
        class="form-check-label"
        :for="'instructor-' + option.value"
      >
        {{ option.text }} ({{ option.course }} - {{ option.type }})
      </label>
    </div>

    </div>
  </div>
</div>


    <div class="col-md-6">
      <UiCard class="h-100 p-3">
                <!-- Display conflict messages if any -->
        <div v-if="conflicts.length > 0" class="alert alert-warning text-center">
          <h5 class="text-danger"><i class="fas fa-exclamation-triangle"></i> Schedule Conflicts Detected!</h5>
          <ul class="list-group text-left">
            <li v-for="(conflict, index) in conflicts" :key="index" class="list-group-item">
              ❌ <strong>{{ conflict.day }}</strong>: {{ conflict.new_course }} ({{ conflict.start_time }} - {{ conflict.end_time }})
              conflicts with {{ conflict.conflicting_course }}.
            </li>
          </ul>
          <p class="text-muted mt-2">Please modify your selection before proceeding.</p>
        </div>
            <div v-if="sessions.length === 0" class="text-center p-5">
            <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
            <h4 class="text-muted">No schedule generated yet</h4>
            <p class="text-muted">Select an option and click "Re-Generate" to create a schedule</p>
          </div>

    <div v-else>
      <!-- Days Summary Card -->
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Schedule Summary</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <p><strong>Total Days:</strong> {{ daysInfo.number_of_days }}</p>
              <p><strong>Days:</strong> {{ formattedDays }}</p>
              <div v-if="selected === 'choose_instructor' && usedSelectedInstructors.length > 0">
              <h4 class="font-semibold mt-2">Matched Instructors:</h4>
              <ul class="list-disc list-inside text-sm text-gray-700">
              <li v-for="(instructor, index) in usedSelectedInstructors" :key="index">
                {{ instructor }}
              </li>
              </ul>
            </div>

            </div>
            <div class="col-md-6">
              <div class="days-visualization">
                <span 
                  v-for="day in ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']" 
                  :key="day"
                  class="badge mr-2 mb-2"
                  :class="daysInfo.days.includes(day) ? 'badge-success' : 'badge-secondary'"
                >
                  {{ day.substring(0, 3) }}
                </span>
              </div>
            </div>
          </div>
        </div>
          </div>

      <!-- Schedule Table -->
      <table class="table table-bordered">
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
            <td>{{ formatDay(session[0]) }}</td>
            <td>{{ session[1] }}</td>
            <td>{{ session[2] }}</td>
            <td>{{ session[3] }}</td>
            <td>{{ session[4] }}</td>
            <td>{{ session[5] }}</td>
            <td>{{ session[6] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

        <div class="row gap-3 flex justify-content-center mt-3">
          <div class="col-2">
            <button type="button" class="btn btn-success w-100" @click="acceptCalender()">Accept</button>
          </div>
          <div class="col-3">
            <button type="button" class="btn btn-danger w-100" @click="generateCalender()">Re-Generate</button>
          </div>

        </div>
      </UiCard>
    </div>

  </div>

</template>
<script>

import { BFormGroup, BFormCheckboxGroup, BFormCheckbox } from 'bootstrap-vue';

export default {
  components: {
    BFormGroup,
    BFormCheckboxGroup,
    BFormCheckbox
  },
  data: function () {
  return {
    selected: null,
    dropdownOpen: false,

    options: [
      { value: null, text: 'Please select an option' },
      { value: 'min_days', text: 'Minimum Days' },
      { value: 'min_slots', text: 'Minimum Slots' },
      { value: 'choose_instructor', text: 'Choose Instructor' }
    ],
    showInstructorDropdown: false,
    selectedInstructor: [],
    instructorOptions: [],
    sessions: [],
    daysInfo: {
      number_of_days: 0,
      days: []
    },
    conflicts: []
  }
},
  computed: {
  formattedDays() {
    return this.daysInfo.days.map(day => 
      day.charAt(0) + day.slice(1).toLowerCase()
    ).join(', ');
  },
  usedSelectedInstructors() {
  if (!this.selectedInstructor || !Array.isArray(this.selectedInstructor)) return [];
  const instructorSet = new Set(this.sessions.map(s => s[4]));
  return this.selectedInstructor.filter(name => instructorSet.has(name));
}


},
  methods: {
    console() {
      console.log(this.calendarOptions)
    },
    formatDay(day) {
    // If already in "MONDAY" format, convert to "Monday"
    if (typeof day === 'string' && day === day.toUpperCase()) {
      return day.charAt(0) + day.slice(1).toLowerCase();
    }
    return day; 
  },
    isDisabled(option) {
    // If no one is selected, allow everything
    if (this.selectedInstructor.length === 0) return false;

    // Find if someone else from the same course and type is already selected
    return this.selectedInstructor.some(selected => {
      const selectedMeta = this.instructorOptions.find(i => i.value === selected);
      return selectedMeta &&
        selectedMeta.course === option.course &&
        selectedMeta.type === option.type &&
        selected !== option.value;
    });
  },
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  },
  closeDropdownOnOutsideClick(e) {
    if (!this.$el.contains(e.target)) {
      this.dropdownOpen = false;
    }
  },
  async handleOptionChange() {
    if (this.selected === 'choose_instructor') {
      this.showInstructorDropdown = true;
      await this.fetchInstructors();
    } else {
      this.showInstructorDropdown = false;
      this.selectedInstructor = [];    }
  },
  async fetchInstructors() {
  try {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const response = await this.$axios.post('http://localhost:5000/api/get-instructors', {
      student_id: userId
    });
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    this.instructorOptions = response.data.instructors
  } catch (error) {
    console.error("Error fetching instructors:", error);
    this.instructorOptions = [];
    this.$toast.error(`Failed to load instructors: ${error.message}`);
  }
},
async generateCalender() {
  if (!this.selected) {
    alert("Select an option.");
    return;
  }
  
  // Validate instructor selection only when that option is chosen
  if (this.selected === 'choose_instructor' && this.selectedInstructor.length == 0) {
    alert("Please select an instructor.");
    return;
  }

  try {
    this.conflicts = []; // Clear conflicts
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    let lastAlgorithm = localStorage.getItem("last_used_algorithm") || "GA";

    let newAlgorithm = lastAlgorithm === "GA" ? "PSO" : "GA";

    const requestData = {
      student_id: userId,
      preferences: {
        algorithm: newAlgorithm,
        epoch: 100,
        pop_size: 50,
        schedule_option: this.selected
      }
    };

    if (this.selected === 'choose_instructor' && this.selectedInstructor.length > 0) {
      requestData.preferences.preferred_instructor = this.selectedInstructor;
    }

    const response = await this.$axios.post(
      'http://localhost:5000/api/generate-schedule',
      requestData
    );

    if (response.data.error) {
      alert(response.data.error);
      return;
    }

    console.log(response.data);
    localStorage.setItem("last_used_algorithm", newAlgorithm);
    localStorage.removeItem("schedule_schema");
    this.sessions = [];

    const scheduleData = {
      sessions: response.data, 
      daysInfo: this.extractDaysInfo(response.data)
    };
    
    localStorage.setItem("schedule_schema", JSON.stringify(scheduleData));
    this.$nextTick(() => {
      this.sessions = scheduleData.sessions || []
      this.daysInfo = scheduleData.daysInfo || []
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("An error occurred while generating the schedule. Please try again.");
  }
},
extractDaysInfo(schedule) {
  if (!schedule || !schedule.length) return { number_of_days: 0, days: [] };
  
  const days = new Set();
  schedule.forEach(session => {
    days.add(session[0]); 
  });
  
  return {
    number_of_days: days.size,
    days: Array.from(days).sort((a, b) => {
      const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
      return dayOrder.indexOf(a) - dayOrder.indexOf(b);
    })
  };
},
    // //////////////////////////////////////
    // //////////////////////////////////////
    // //////////////////////////////////////
    async acceptCalender() {
    try {
        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const scheduleSchema = localStorage.getItem("schedule_schema"); // Keep as string
        console.log("scheduleSchema : " , scheduleSchema);

        const response = await this.$axios.post(`http://localhost:5000/api/accept-schedule`, {
            student_id: userId,
            schedule_schema: JSON.parse(scheduleSchema).sessions,
        });

        // 🔥 FIX: If there is an error, stop execution before success toast
        if (response.data.error) {
            console.error("Schedule Conflict:", response.data.conflicts);
            this.$toast.error("Schedule conflict detected! Please review conflicts and regenerate schedule.");
            this.conflicts = response?.data?.conflicts; // Store conflicts
            return; // STOP further execution
        }

        // If everything is fine, show success message and update the schedule
        console.log(response.data.message);
        this.$toast.success("Schedule saved successfully!");

        // Update the sessions with the returned schedule
        this.sessions = response.data.schedule || []; // Use the returned schedule
        this.conflicts = []; // Clear conflicts

    } catch (error) {
        console.error("API Error:", error);
        this.$toast.error("An error occurred while saving the schedule.");
    }
}


  }
}

</script>
<style lang="scss">

.custom-select-dropdown {
  position: relative;

  .dropdown-menu {
    max-height: 200px;
    overflow-y: auto;
    border-radius: 0.25rem;
    z-index: 1000;
  }

  .form-check {
    margin-bottom: 0.5rem;
  }

  .form-control {
    cursor: pointer;
    user-select: none;
  }
}

.list-style-checkboxes {
  .custom-control {
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #e0e0e0;
    list-style: none;
  }

  .custom-control:last-child {
    border-bottom: none;
  }

  .custom-control-label {
    cursor: pointer;
    width: 100%;
    display: block;
  }
}

.custom-select option:checked {
  background-color: #d4edda; /* Bootstrap's success light color */
  color: #155724; /* Bootstrap's success dark color */
}
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

  div {
    overflow: hidden;
  }
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
