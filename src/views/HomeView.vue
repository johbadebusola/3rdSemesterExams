<script>
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      passwordMatch: null,
      errorMessage: null,
      loginView: true,
      isLoggedin: false,
      isLoading: false,
    };
  },
  methods: {
    toggleView() {
      this.$router.push("/signup");
    },
    authenticate() {
      this.login();
    },
    forgotPAssword() {
      this.$router.push("/forgotPassword");
    },
    login() {
      const auth = getAuth();
      this.isLoading = true;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          this.isLoading = false;
          const user = userCredential.user;

          this.isLoggedin = true;
          const { displayName, uid } = user;
          this.$store.dispatch("UpdateUser", { displayName, uid });
          this.$router.push("/product");
          auth.onAuthStateChanged((user) => {
            if (user) {
              this.isLoggedin = true;
              this.$store.dispatch("updateAuth", this.isLoggedin);
            } else {
              this.isLoggedin = false;
            }
          });
        })
        .catch((error) => {
          this.isLoading = false;
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === "auth/network-request-failed") {
            this.errorMessage = "No internet connection";
          }
          if (errorCode === "auth/invalid-email") {
            this.errorMessage = "Invalid email";
          }
          if (errorCode === "auth/user-not-found") {
            this.errorMessage = "Create an account";
          }
          if (errorCode === "auth/wrong-password") {
            this.errorMessage = "Wrong password";
          }
          if (errorCode === "auth/missing-email") {
            this.errorMessage = "Enter email address";
          }
        });
    },
  },
  computed: {
    users() {
      return this.$store.getters.getData;
    },
  },
};
</script>

<template>
  <div class="Login">
    <h3>Log in into your Account</h3>
    <hr />
    <h4 class="errormsg">{{ errorMessage }}</h4>
    <input type="text" placeholder="Email" v-model="email" />

    <input type="password" placeholder="Password" v-model="password" />

    <div class="submit-div">
      <button @click="authenticate">
        <span v-if="isLoading" class="spinner"></span>
        <p v-else>Login</p>
      </button>
    </div>
    <div class="toggle-page">
      <p>
        New to products ?
        <span> <a @click="toggleView"> Signup </a></span>
      </p>
    </div>
    <p @click="forgotPAssword">Forgot Password ?</p>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Carter+One&family=Roboto+Slab&display=swap");
/* font-family: 'Carter One', cursive; */
/* font-family: 'Roboto Slab', serif; */

.spinner {
  /* Spinner size and color */
  width: 1.5rem;
  height: 1.5rem;
  border-top-color: white;
  border-left-color: #444;

  /* Additional spinner styles */
  animation: spinner 400ms linear infinite;
  border-bottom-color: transparent;
  border-right-color: transparent;
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
}

/* Animation styles */
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.Login {
  width: 300px;
  padding: 2em;
  margin: auto;
  margin-top: 6em;
  border: #1890ff solid 3px;
  border-radius: 1em;
}

.Login > hr {
  margin-bottom: 1em;
}

.Login > h3 {
  color: black;
  font-family: "Carter One", cursive;
}

.Login > input {
  padding: 9px;
  margin-bottom: 1em;
  width: 100%;
  border: 2px solid rgb(82, 17, 131);
  border-radius: 6px;
  font-family: "Carter One", cursive;
}

.Login > .submit-div > button {
  width: 100%;
  margin-right: 4em;
  border-radius: 6px;
  background: #004182;
  color: white;
  font-weight: bold;
  padding: 8px;
  font-family: "Carter One", cursive;
}
.Login > .submit-div > button:hover {
  background-color: white;
  color: #004182;
}

.Login > .toggle-page > p {
  font-family: "Carter One", cursive;
  margin-top: 1em;
}

.Login > .toggle-page > p > span > a {
  color: #1890ff !important;
}

.Login > p {
  color: #1890ff;
  font-family: "Carter One", cursive;
}

.Login > .errormsg {
  color: tomato;
  font-family: "Carter One", cursive;
}

.active {
  display: none;
}
</style>
