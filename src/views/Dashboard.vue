<template>
  <div id="dashboard" class="view">
    <header>
      <button @click="logout()">Logout</button>
    </header>
    <div id="dashboard-content">
      <nav>
        <ul>
          <li @click="onClickRate()" :class="{ active: isRate }">Rate</li>
          <li @click="onClickRec()" :class="{ active: !isRate }">Recommend</li>
        </ul>
      </nav>
      <div id="dashboard-content-main">
        <Rate v-if="isRate" />
        <Rec v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Rate from "@/components/Rate.vue";
import Rec from "@/components/Rec.vue";

class Prop {
  userId!: string;
}

@Options({
  components: {
    Rate,
    Rec,
  },
})
export default class Dashboard extends Vue.with(Prop) {
  private isRate = true;

  private onClickRate() {
    this.isRate = true;
  }

  private onClickRec() {
    this.isRate = false;
  }

  private logout() {
    window.location.replace("http://localhost:8080/logout");
  }
}
</script>
