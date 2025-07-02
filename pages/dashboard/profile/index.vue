<template>
  <div class="container-fluid p-0">
    <div class="row g-4 d-flex align-items-stretch">
      <div class="col-xl-12">
        <UiCard class="h-100">
          <UiCardName :cardName="`Profile`"/>
          <div v-if="loading" class="text-center p-4">
            <b-spinner variant="primary" label="Loading..."></b-spinner>
          </div>
          <div v-else-if="student" class="row mt-3 g-2">
            <div class="col-2 py-2 d-flex justify-content-center">
                <div class="profile-image-container">
                  <img 
                    :src="student.image || require('~/assets/images/student.png')" 
                    class="profile-image"
                    alt="Profile Image"
                  >
                </div>
              </div>
            <div class="col-6">
              <b-list-group>
                <b-list-group-item>
                  <strong>Student ID:</strong> {{ student.id || 'N/A' }}
                </b-list-group-item>
                <b-list-group-item>
                  <strong>Name:</strong> {{ student.name || 'N/A' }}
                </b-list-group-item>
                <b-list-group-item>
                  <strong>Level:</strong> {{ student.level || 'N/A' }}
                </b-list-group-item>
                <b-list-group-item>
                  <strong>Grade:</strong> {{ student.gpa || 'N/A' }}
                </b-list-group-item>
                <b-list-group-item>
                  <strong>Email:</strong> {{ student.email || 'N/A' }}
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
          <div v-else class="text-center p-4 text-danger">
            Failed to load student data
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: null,
      loading: true,
      error: null
    }
  },
  async mounted() {
  try {
    const userId = JSON.parse(localStorage.getItem("userData")).id;
    const data = await fetch(`http://localhost:5000/api/profile/${userId}`);
    const response = await data.json();
    console.log("PROFILE :" , response)
    if (response != null) {
      this.student = {
        id: response.id,
        name: response.name,
        level: response.level,
        email: response.email,
        gpa: response.gpa
      };
    }
  } catch (error) {
    this.error = error.response?.data?.error || 
                error.message || 
                "Failed to load profile";
    console.error("Profile load error:", error);
  } finally {
    this.loading = false;
  }
},
  methods: {
    calculateAge(dob) {
      if (!dob) return null;
      const birthDate = new Date(dob);
      const diff = Date.now() - birthDate.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
}
</script>

<style lang="scss">
.profile-image-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #4c52bb;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .profile-image-container {
    width: 100px;
    height: 100px;
    margin: 0 auto 1rem;
  }
}
/* Your existing styles remain the same */
.custom-line-chart {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.c-line-chart {
  width: 8px;
  margin-left: 1px;
  display: inline-flex;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-top-right-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-topright: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.time-line-container {
  .time-line-content {
    display: block;
    height: 50px;
    width: 100%;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    .user-icon {
      width: 50px;
      height: 50px;
      background-color: #4c52bb;
      border-radius: 50px;
    }
  }
}
</style>