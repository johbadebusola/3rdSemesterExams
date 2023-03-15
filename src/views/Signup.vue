<template>
  <div class="Login">
    <h3>Create an account</h3>
    <hr />
    <h4 class="errormsg">{{ errorMessage }}</h4>

    <input type="Firstname" placeholder="Firstname" v-model="firstName" />

    <input type="Lastname" placeholder="LastName" v-model="lastName" />

    <input type="text" placeholder="Email" v-model="email" />

    <input type="password" placeholder="Password" v-model="password" />

    <input
      type="password"
      placeholder="Confirm Password"
      v-model="confirmPassword"
    />

    <div class="submit-div">
      <button @click="signup">
        <span v-if="isLoading" class="spinner"></span>
        <p v-else>Signin</p>

      </button>
    </div>
    <div class="toggle-page">
      <p>
        Already have an account ?
        <span> <a @click="toggleLogin"> Signin </a></span>
      </p>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      passwordMatch: null,
      errorMessage: null,
      isLoggedin: false,
      isLoading: false,
    };
  },
  methods: {
    toggleLogin() {
      this.$router.push("/");
    },

    signup() {
      this.isLoading = true;
      const auth = getAuth();
      if (this.password === this.confirmPassword) {
        this.passwordMatch = this.confirmPassword;
        createUserWithEmailAndPassword(auth, this.email, this.passwordMatch)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            this.isLoading = false;
            this.updateProfile();
            this.$router.push("/");

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorMessage);
            this.isLoading = false;

            if (errorCode === "auth/weak-password") {
              this.errorMessage = "Password should be at least 6 charaters";
            }
          });
      } else {
        this.errorMessage = "Password does not match";
      }
    },
    updateProfile() {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: this.firstName + " " + this.lastName,
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log(success);
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(unsuccessful);
        });
    },
  },
};
</script>
