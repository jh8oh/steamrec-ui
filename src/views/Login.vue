<template>
  <div id="login" class="view">
    <div id="login-content">
      <img id="steamrec" src="../assets/steamrec.png" />
      <h1>Login to your Steam account</h1>
      <button @click="login()">
        Sign in using <img src="../assets/steam_logo.png" /> Steam
      </button>
    </div>
    <p id="footer">
      This website is not affiliated with Valve Corporation or Steam. You can
      delete your account on here and all of the data at any time.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Login extends Vue {
  private login() {
    window.location.replace("http://localhost:8080/auth/redirect");
  }
}
</script>
