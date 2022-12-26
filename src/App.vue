<template>
  <Login v-if="userId == null" />
  <Dashboard v-else :userId="userId" />
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
  private userId = null;

  mounted() {
    this.checkLoggedIn();
  }

  private checkLoggedIn() {
    axios.get("https://steamrec.cyclic.app/auth/check").then((res) => {
      if (res.data.user) {
        this.userId = res.data.user.id;
      }
    });
  }
}
</script>

<style lang="scss" src="./scss/main.scss" />
