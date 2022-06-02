<template>
  <div id="dashboard">
    <h1>{{ userId }}</h1>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

class Prop {
  userId!: string;
}

export default class Dashboard extends Vue.with(Prop) {}
</script>
