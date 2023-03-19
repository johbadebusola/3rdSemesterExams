<template>
  <div class="container">
    <h3>Reset your password</h3>
    <hr />
    <h4 class="errormsg">{{ errorMessage }}</h4>
    <input type="text" placeholder="Enter a valid email" v-model="emailText" />
    <button class="submit" @click="submit">
      <span v-if="isLoading" class="spinner"></span>
      <p v-else>Submit</p>
    </button>
    <button class="back" @click="back">Back</button>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
  name: "ForgotPassword",
  data() {
    return {
      emailText: null,
      isLoading: false,
      errorMessage: null
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      this.isLoading = true;
      sendPasswordResetEmail(auth, this.emailText)
        .then(() => {
          // Password reset email sent!
          // ..
          this.isLoading = false;
          console.log("sent successfully");
          this.errorMessage = null
        })
        .catch((error) => {
          this.isLoading = false;
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);

          if (errorCode === "auth/user-not-found") {
            this.errorMessage = "Email not found";
          }
          if (errorCode === "auth/network-request-failed") {
            this.errorMessage = "No internet connection";
          }
          if (errorCode === "auth/missing-email") {
            this.errorMessage = "Enter a valid email";
          }

          
        
          // ..
        });
    },
    back() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
input {
  padding: 9px;
  margin-bottom: 1em;
  width: 100%;
  border: 2px solid rgb(82, 17, 131);
  border-radius: 6px;
  font-family: "Carter One", cursive;
}

.container {
  width: 300px;
  padding: 2em;
  margin: auto;
  margin-top: 6em;
  border: #1890ff solid 3px;
  border-radius: 1em;
}

.container > .submit {
  width: 60%;
  margin-right: 2em;
  border-radius: 6px;
  background: #004182;
  color: white;
  font-weight: bold;
  padding: 8px;
  font-family: "Carter One", cursive;
}

.container > .back {
  border-radius: 6px;
  background: rgba(242, 46, 11, 0.921);
  color: white;
  font-weight: bold;
  padding: 8px;
  font-family: "Carter One", cursive;
}

.container > h3 {
  color: black;
  font-family: "Carter One", cursive;
}

.container > hr {
  margin-bottom: 1em;
}

.container > .submit:hover {
  background-color: #1890ff ;
}

.errormsg {
    color: tomato;
    font-family: "Carter One", cursive;
  }
  
</style>
