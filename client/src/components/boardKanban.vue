<template>
  <div class="card card-style">
    <div class="card-header card-header-style card-header-rose mb-2 d-flex justify-content-between">
      <h4 class="card-title">{{category}}</h4>
      <button
        class="btn btn-white btn-fab btn-fab btn-round float-right"
        data-toggle="tooltip"
        data-placement="left"
        title="Add Task"
      >
        <i class="material-icons text-rose" @click.prevent="muculFormAddTask">add_circle</i>
      </button>
    </div>
    <div class="card-item">
      <!-- render list card body -->
      <!-- looping cardNode disini -->
      <cardNote
        v-for="el in selectedData"
        :key="el.id"
        :el="el"
        @deletedTask="hapusTask"
        @editTask="editDataTask"
      ></cardNote>

      <!-- form add task -->
      <div
        v-if="addTask"
        class="d-flex position-absolute"
        style="margin-top: 10px ; max-width: 330px; top:22px;"
      >
        <addFormTask
          class="mt-10"
          :category="category"
          @tutupForm="tutupFormAddTask"
          @addDatasNewTask="tambahNewTask"
        ></addFormTask>
      </div>

      <!-- form edit task -->
      <div
        v-if="editTask"
        class="d-flex position-absolute"
        style="margin-top: 10px ; max-width: 330px; top:22px;"
      >
        <editFormTask
          class="mt-10"
          :editData="editData"
          @tutupFormEdit="tutupFormEditTask"
          @tutupFormEditTask="tutupFormEditTask"
          @editDataTaskUpdate="editDataTaskUpdate"
        ></editFormTask>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cardNote from "./cardNote.vue";
import addFormTask from "./addFormTask.vue";
import editFormTask from "./editFormTask.vue";

export default {
  name: "boardKanban",
  props: ["category", "datas"],
  data() {
    return {
      addTask: false,
      editTask: false,
      dataEdit: '',
      editData: null
    };
  },
  methods: {
    muculFormAddTask() {
      this.addTask = true;
    },
    tutupFormAddTask(perintah) {
      this.addTask = false;
    },
    tambahNewTask(newTask) {
      this.datas.push(newTask);
      this.addTask = false;
    },
    hapusTask(id) {
      let dataUpdated = [];
      this.datas.forEach(el => {
        if (el.id != id) {
          dataUpdated.push(el);
        }
      });
      return (this.datas = dataUpdated);
    },
    editDataTask(data) {
      this.editTask = true;
      this.editData = data;
    },
    tutupFormEditTask() {
      this.editTask = false;
    },
    editDataTaskUpdate() {
      this.editTask = false;
      this.$emit('panggilData')
    }
  },
  components: {
    cardNote,
    addFormTask,
    editFormTask
  },
  created() {
  },
  computed: {
    selectedData() {
      let thisCategory = [];
      this.datas.forEach(el => {
        if (el.category == this.category) {
          thisCategory.push(el);
        }
      });
      return thisCategory;
    }
  }
};
</script>

<style>
</style>