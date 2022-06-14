<template>
  <div id="dashboard">
    <nav>
      <ul>
        <li @click="onClickRate()">Rate</li>
        <li @click="onClickRec()">Recommend</li>
      </ul>
    </nav>
    <Rate v-if="isRate" />
    <Rec v-else />
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
}
</script>
