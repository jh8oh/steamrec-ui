<template>
  <div id="settings">
    <div id="settings-mask" @click="onMaskClick()" />
    <div id="settings-dialog">
      <h2>Settings</h2>
      <div class="settings-option">
        <span>
          <strong>Delete your data</strong> <br />
          This will remove all the games you have rated from the database.
        </span>
        <button @click="deleteData()">Delete data</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";

export default class Settings extends Vue {
  private onMaskClick() {
    this.$emit("closeDialog");
  }

  private deleteData() {
    axios.delete("/data/ratings").then((res) => {
      if (res.status == 200) {
        alert("Your data has been deleted");
      } else {
        alert("Error whilst deleting your data. Please try again later.");
      }
    });
  }
}
</script>
