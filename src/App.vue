<template>
  <Login />
  <Dashboard />
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
  mounted() {
    this.checkLoggedIn();
  }

  private checkLoggedIn() {
    axios.get("https://localhost:8080/auth/check").then((res) => {
      console.log(res.data);
    });
  }
}
</script>

<style lang="scss" src="./scss/main.scss" />
