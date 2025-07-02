<script>
export default {
  async mounted() {
    this.fetchCourses()
  },

  enroll() {

    fetch("http://localhost:5000/api/enroll/", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        "student_id": 1,
        "course_code": "MTH204",
        "semester": "Fall 2025"
      })
    })
      .then((response) => {
        //do something awesome that makes the world a better place
      });

  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: 'course_code',
        },
        {
          key: 'course_name',
        },
        {
          key: 'instructor',
        },
        {
          key: 'action',
          label: '',
        }
      ],
      items: [

      ],
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'days', text: 'Minimum Days' },
        { value: 'slots', text: 'Minimum Slots' },

      ]
    }
  },
  methods: {
    async fetchCourses() {
      try {
        const userId = JSON.parse(localStorage.getItem("userData")).id;
        const response = await fetch(`http://localhost:5000/api/courses/${userId}`);
        const data = await response.json();

        this.items = data;
      }
      catch (error) {
        console.error("error feching data:", error);
      }
    },

    async togglrEnrollment(course) {
      try {
        const userId = JSON.parse(localStorage.getItem("userData")).id;


        const response = await this.$axios.post(`http://localhost:5000/api/${course.enrolled ? "unenroll" : "enroll"}`, {
          student_id: userId,
          course_code: course.course_code
        });


        course.enrolled = !course.enrolled;

      }
      catch (error) {
        console.error("error:", error)

      };
    }
  }

}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row g-4 d-flex align-items-stretch">
      <div class="col-xl-12">
        <UiCard class="h-100">
          <UiCardName :cardName="`courses`" />

          <div class="text-center p-2">
            <b-form-select v-model="selected" :options="options" class="w-100 custom-select"></b-form-select>
          </div>

          <b-table striped hover :items="items" :fields="fields">
            <template #cell(action)="data">
              <b class="text-info">
                <button type="button" class="btn " :class="data.item.enrolled ? 'btn-dander' : 'btn-success'"
                  @click="togglrEnrollment(data.item)">
                  {{ data.item.enrolled ? "Unenroll" : "Enroll" }}

                </button>
              </b>
            </template>
          </b-table>
        </UiCard>
      </div>

    </div>
  </div>
</template>
