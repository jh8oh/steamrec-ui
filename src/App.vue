<template>
  <Login v-if="!isLoggedIn" />
  <Dashboard v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

@Options({
  components: {
    Login,
    Dashboard,
  },
})
export default class App extends Vue {
  private isLoggedIn = false;

  created() {
    this.checkLoggedIn();
  }

  private checkLoggedIn() {
    axios.get("https://dog-sundress.cyclic.app/auth/check").then((res) => {
      console.log(this.isLoggedIn);
      console.log(res.data);
      this.isLoggedIn = res.data.isLoggedIn;
    });
  }
}
</script>

<style lang="scss" src="./scss/main.scss" />
