<template>
<form @submit.prevent="handleSubmit(onSubmit)">
  <div class="col-12 pb-3">
    <ValidationProvider
      name="email"
      :rules="'required|customEmail:' + 'aucegypt.edu'"
      tag="div"
      v-slot="{ errors }"
    >
      <input
        type="email"
        name="email"
        v-model="email"
        class="form-control py-3"
        :class="{ 'has-danger': errors[0] }"
        placeholder="Email Address"
      />
      <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
  <div class="col-12 pb-3">
    <ValidationProvider name="password" rules="required|min:6" tag="div" v-slot="{ errors }">
      <input
        type="password"
        name="password"
        v-model="password"
        class="form-control py-3"
        :class="{ 'has-danger': errors[0] }"
        placeholder="Password"
      />
      <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
  <div class="form--group">
    <div class="row">
      <div class="col-12">
        <button class="primary-button w-100 p-3" type="submit">
          Login
        </button>
      </div>
      <div class="col-12 mt-4">
        <NuxtLink type="primary" class="signup-button text-center w-100 p-3" to="/en">
          Back To Login
        </NuxtLink>
      </div>
    </div>
  </div>
</form>
</template>

  <script>
import { mapActions } from "vuex";

export default {
  name: "AppResetPassword",
  auth: false,
  data() {
    return {
      email: null,
      password: null, // Add password field
      showForm: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  beforeMount() {
    if (this.$store.state.auth.loggedIn) {
      this.showForm = false;
      this.$router.push(this.localePath({ path: "/dashboard/statistics" }));
    } else {
      this.showForm = true;
      return true;
    }
  },
  methods: {
    ...mapActions({
      LOGIN: "accounts/login", // Define the login Vuex action
    }),

async onSubmit() {
  try {
    if (this.email === "demo@msa.edu.eg" && this.password === "demo123") {
      const demoUserData = {
        name: "Demo User",
        email: this.email,
        level: "Senior",
        gpa: 3.9,
        id: 999,
        demo: true
      };

      // Store demo user data in localStorage
      localStorage.setItem("userData", JSON.stringify(demoUserData));
      this.errorMessage = "";
      this.successMessage = "Demo login successful! Redirecting...";

      console.log("Logged in as demo user:", demoUserData);

      setTimeout(() => {
        this.$router.push(this.localePath({ path: "/dashboard/home" }));
      }, 1500);

      return; // Skip backend call
    }

    const response = await this.$axios.post("http://localhost:8000/api/login", {
      email: this.email,
      password: this.password,
    });

    console.log("Login Response:", response.data);

    if (response.data.error) {
      this.errorMessage = response.data.error;
      this.successMessage = "";
    } else {
      this.errorMessage = "";
      this.successMessage = "Login successful! Redirecting...";
      localStorage.setItem("userData", JSON.stringify(response.data));

      console.log("Saved user data:", localStorage.getItem("userData"));

      setTimeout(() => {
        this.$router.push(this.localePath({ path: "/dashboard/home" }));
      }, 1500);
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error);
    this.errorMessage = error.response?.data?.error || "Login failed. Please try again.";
  }
}

  },
};
</script>

  <style lang="scss">
  .login {
      min-height: 100vh;
      background-color: #fff;
  }
  .background-font-page {
    background-color: var(--base_color);
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .AppLogin {
    background-color: #fff;
  }
  .passwordField {
    position: relative;
  }
  .switchVisibility {
    position: absolute;
    right: 10px;
    top: 0px;
    bottom: 0;
    margin: auto;
    height: fit-content;
    color: #b3b3b3;
    font-size: 22px;
    cursor: pointer;
  }

  .signup-button {
    background-color: #fff;
    border-color: #4c52bb;
    border: 1px solid var(--base_color);
    text-align: center;
    display: block;
  }
  </style>

