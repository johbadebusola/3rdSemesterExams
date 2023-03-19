<template>
  <div class="about">
    <header>
      <p>{{ ` Hello, ${email}` }}</p>
      <button @click="LogOut">Logout</button>
    </header>
    <h3>View various categories of our product</h3>
    <div class="loader" v-if="isLoading === true">
      <span class="spinner spinner-large spinner-blue spinner-slow"></span>
    </div>
    
    <div v-else class="product-container">

     <p v-if="isLoading === true"> Loading</p>
      <div v-else class="product-box" v-for="(item, index) in paginate" :key="index">
        <div class="product-box-img">
          <img :src="item.images[0]" alt="" />
        </div>


        <p><span> Brand: </span> {{ item.brand }}</p>
        <p><span> Title:</span> {{ item.title }}</p>
        <p>{{ item.description }}</p>
        <p><span> Price: </span> ${{ item.price }}</p>
        <p><span>Discount: </span> {{ item.discountPercentage }}%</p>
      </div>
    </div>
    <vue-awesome-paginate
      :total-items="productDataLength"
      :items-per-page="6"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useFetch } from "../components/useFetchComposable";
export default {
  data() {
    return {
      loggedIn: true,
      productData: [],
      currentPage: 1,
      isLoading: true,
      error: null,
    };
  },

  methods: {
    LogOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
         localStorage.setItem("auth",false)
         const log = localStorage.getItem("auth")
          this.$store.dispatch("updateAuth", log);
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch((error) => {
          // An error happened.
         
        });
    },
    fetchData() {
      // this.isLoading = true
      // fetch("https://dummyjson.com/products")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     this.isLoading = false
      //     this.productData = data.products;
      //     console.log(this.productData.length);
      //   })
      //   .catch((error) => {
      //     this.isLoading = false
      //     console.log(error);
      //   });

      const { data, error, loading } = useFetch(
        "https://dummyjson.com/products"
      );
      this.productData = data;
      this.isLoading = loading;
     
    },
    onClickHandler(page) {
     
      this.currentPage = page;
    },
  },
  computed: {
    email() {
      return this.$store.getters.getData;
    },
    IsLoggedIn() {
      return this.$store.getters.getAuth;
    },
    productDataLength() {
      return this.productData.length;
    },
    paginate() {
      // Pagination logic to change the products displayed
      const lastPost = this.currentPage * 6;
      const firstPost = lastPost - 6;
      return (this.currentPost = this.productData.slice(firstPost, lastPost));
    },
  },
  mounted() {
    this.fetchData();
   
  },
};
</script>

<style>
.about > header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  font-family: "Carter One", cursive;
  color: #004182;
}

h3 {
  font-family: "Carter One", cursive;
  color: #004182;
  text-align: center;
  margin-bottom: 1em;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
}
.product-box {
  width: 300px;
  border: 3px solid #004182;
  margin-bottom: 1em;
  margin-left: 1em;
  border-radius: 7px;
  padding: 1em;
  text-align: center;
  font-family: "Roboto Slab", serif;
}

.product-box-img {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;

  height: 100px;
  margin-bottom: 1em;
}

.product-box > p > span {
  font-family: "Carter One", cursive;
  color: #004182;
}
.product-box > .product-box-img > img {
  height: 100%;
  width: 70%;
}

@media (min-width: 694px) {
  .product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1111px) {
  .product-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
  .about > header {
    margin-top: 1em;
  }
}

.loader {
  text-align: center;
  margin-top: 3em;
}

.pagination-container {
  margin-bottom: 2em;
  width: 100%;
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}


.spinner {
  /* Spinner size and color */
  width: 1.5rem;
  height: 1.5rem;
  border-top-color: #444;
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


/* Optional — create your own variations! */
.spinner-large {
  width: 5rem;
  height: 5rem;
  border-width: 6px;
}

.spinner-slow {
  animation: spinner 1s linear infinite;
}

.spinner-blue {
  border-top-color: #09d;
  border-left-color: #09d;
}
</style>
