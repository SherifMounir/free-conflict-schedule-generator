<template>
  <div class="login_app">
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-12 col-xl-6">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <div class="row g-0">
                <div class="col-xl-7 col-lg-12 mx-auto">
                  <div class="col-sm-10 mx-auto">
                    <div class="mb-3">
                      <h4><strong> REGiSRTATION</strong></h4>
                    </div>
                    <div>
                      <h1><strong>Welcome back</strong></h1>
                      <p class="text-muted mb-5"> Welcome back! Please login to your account. </p>
                    </div>
                    <div class="alert alert-danger mb-3" role="alert" v-if="incorrectAuth != null">
                        {{ incorrectAuth }}
                      </div>
                    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                      <form @submit.prevent="handleSubmit(onSubmit)">
                        <div class="col-12 pb-3">
                          <ValidationProvider
                          name="Email Address"
                          :rules="'required|customEmail:' + 'msa.edu.eg'"
                          tag="div"
                          v-slot="{ errors }"
                          >
                              <input type="text" v-model="email" class="form-control py-3" :class="{ 'has-danger': errors[0] }" placeholder="Email Address"/>
                              <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="col-12 pb-3">
                          <ValidationProvider
                          name="password"
                          rules="required"
                          tag="div"
                          v-slot="{ errors }"
                          >
                          <div class="passwordField">
                            <input
                            :type="type"
                            name="password"
                            v-model="password"
                            :class="{ 'has-danger': errors[0] }"
                            class="form-control py-3"
                            placeholder="Password"/>


                            <i class="switchVisibility bi"
                            :class="{ 'bi-eye-slash-fill': type == 'text', 'bi-eye-fill': type != 'text' }"
                            @click="switchVisibility"/>


                          </div>
                          <span v-if="errors[0]" class="errorMessage">{{ errors[0] }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="col-12">
                          <div class="d-flex justify-content-between">
                            <label class="checkbox-group d-flex justify-content-between">
                              <input type="checkbox" >
                              Remember Me
                              <span class="checkmark" />
                            </label>
                            <NuxtLink :to="localePath('/accounts/password/reset/')" class="reset_password">
                              Reset Password
                            </NuxtLink>
                          </div>
                        </div>
                        <div>
                        </div>
                        <div class="form--group mt-3">
                          <div class="row">
                            <div class="col-12">
                              <button class="primary-button mt-3 w-100 p-3" type="submit">
                                Log In <b-spinner v-if="loading" small></b-spinner>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </ValidationObserver>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-xl-6 d-none d-md-flex">
          <div class="background-font-page">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
// password1234 arafa.ezzat@gmail.com
export default {
  name: 'IndexPage',
  data () {
    return {
      appDetails: null,
      incorrectAuth: null,
      email: '',
      password: '',
      type: 'password',
      loading: false,
      dataUser: null,
    }
  },
  methods: {

    async onSubmit() {
      this.incorrectAuth = null
      this.loading = true
        this.$refs.form.validate().then(success => {
            if (!success) {
              return;
            }else {
              this.loginAccount()
            }

        });
    },
   async loginAccount() {
  this.incorrectAuth = null;
  try {
    if (this.email === "demo@msa.edu.eg" && this.password === "123456") {
      const demoUserData = {
        name: "Demo User",
        email: this.email,
        level: "Senior",
        gpa: 3.8,
        id: 999,
        demo: true
      };

      localStorage.setItem("userData", JSON.stringify(demoUserData));
      this.errorMessage = "";
      this.successMessage = "Demo login successful! Redirecting...";

      console.log("Logged in as demo user:", demoUserData);

      setTimeout(() => {
        this.$router.push(this.localePath({ path: "/dashboard/home" }));
      }, 1500);

      return; // Stop further execution
    }

    const response = await this.$axios.post("http://localhost:5000/api/login", {
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

      setTimeout(() => {
        this.$router.push(this.localePath({ path: "/dashboard/home" }));
      }, 1500);
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error);
    this.errorMessage = error.response?.data?.error || "Login failed. Please try again.";
  }

  

    },
    switchVisibility () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
  }
}
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



</style>
