<template>
  <div class="container-fluid p-0">
    <div class="row g-4 d-flex align-items-stretch">
      <div class="col-xl-12">
        <UiCard class="h-100">
          <UiCardName :cardName="`faq`" />
          <div class="accordion" role="tablist">
            <!-- About Project Section -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-3" role="tab" v-b-toggle.accordion-1>
                About registration
              </b-card-header>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel" class="p-3">
                <b-card-body>
                  <b-card-text>
                    This project is designed to provide a streamlined solution for university scheduling challenges. It incorporates modern
                    algorithms and user-centric designs to create personalized schedules for students and faculty. Key features include:
                  </b-card-text>
                  <ul>
                    <li>Personalized student schedules based on preferences and faculty availability.</li>
                    <li>Dynamic timetable updates to handle last-minute changes efficiently.</li>
                    <li>Integration of advanced optimization algorithms for efficient resource utilization.</li>
                  </ul>
                  <b-card-text>
                    <strong>Rules for Successful Registration:</strong>
                  </b-card-text>
                  <ul>
                    <li>Ensure that all personal details (name, email, phone number) are accurate before submission.</li>
                    <li>Select courses based on your academic plan and prerequisites.</li>
                    <li>Avoid conflicts by reviewing your chosen timeslots thoroughly.</li>
                    <li>Submit your preferences within the specified registration window.</li>
                    <li>Contact the university's helpdesk for any technical issues during registration.</li>
                  </ul>
                  <b-card-text>
                    Following these guidelines will help students avoid scheduling conflicts and ensure a smooth registration process.
                  </b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- About Us Section -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-3" role="tab" v-b-toggle.accordion-2>
                About Us
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="p-3">
                <b-card-body>
                  <b-card-text>
                    BrightFuture University, established in 1975, is a leading institution dedicated to academic excellence, innovative
                    research, and community engagement. Over the past 50 years, we have empowered countless students to achieve their goals
                    and make a positive impact on society.
                  </b-card-text>
                  <ul>
                    <li>
                      <strong>Vision:</strong> To lead in education by fostering creativity, innovation, and lifelong learning.
                    </li>
                    <li>
                      <strong>Mission:</strong> Deliver high-quality education, promote interdisciplinary research, and prepare students
                      for real-world challenges.
                    </li>
                  </ul>
                  <b-card-text>
                    Located in Greenwood City, our 200-acre campus features state-of-the-art facilities, including academic buildings,
                    libraries, sports complexes, and student housing, creating a vibrant learning environment.
                  </b-card-text>
                  <b-card-text>
                    <strong>Contact Us:</strong>
                  </b-card-text>
                  <ul>
                    <li><strong>Location:</strong> 123 University Ave, Greenwood City, Country</li>
                    <li><strong>Phone:</strong> +1-800-555-1234</li>
                    <li><strong>Email:</strong> contact@brightfutureuniversity.edu</li>
                    <li><strong>Fax:</strong> +1-800-555-5678</li>
                    <li><strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 6:00 PM</li>
                  </ul>
                </b-card-body>
              </b-collapse>
            </b-card>
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
      text: ""
    };
  }
};
</script>

<style scoped>
.container-fluid {
  font-family: Arial, sans-serif;
  color: #333;
}

.b-card-header {
  background-color: #f8f9fa;
  cursor: pointer;
}

.b-card-text {
  margin-bottom: 10px;
  line-height: 1.6;
}
</style>
