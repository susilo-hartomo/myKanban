<template>
  <!-- form add task -->
  <div class="d-flex card">
    <div class>
      <form class="form" v-on:submit.prevent="addNewTask">
        <div class="card-header card-header-primary text-center">
          <h4 class="card-title">Add New Task</h4>
        </div>
        <div class="card-body">
          <div class="input-group mt-2">
            <input type="text" class="form-control" placeholder="Title" v-model="addTitle" />
          </div>
          <div class="input-group mt-2">
            <input type="text" class="form-control" placeholder="Description" v-model="addDesc" />
          </div>
          <div class="input-group mt-2">
            <input type="text" class="form-control" placeholder="Tag" v-model="addTag" />
          </div>
          <div class="input-group mt-2">
            <input type="date" class="form-control" placeholder="2020/20/02" v-model="addDate" />
          </div>
          <div class="input-group mt-3">
            <label for>Task Priority</label>
            <div class="mt-0">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" v-model="addPriority" value="low" />
                  Low
                  <span class="circle">
                    <span class="check"></span>
                  </span>
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" v-model="addPriority" value="medium" />
                  medium
                  <span class="circle">
                    <span class="check"></span>
                  </span>
                </label>
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" v-model="addPriority" value="hight" />
                  Hight
                  <span class="circle">
                    <span class="check"></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="footer text-center mb-3 mt-4">
          <button class="btn btn-primary m-2" style="width: inherit;">Create</button>
          <button
            class="btn btn-outline-muted m-2"
            style="width: inherit;"
            @click.prevent="$emit('tutupForm', false)"
          >Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "addFormTask",
  props: ["category"],
  data() {
    return {
      addTitle: "",
      addDesc: "",
      addTag: "",
      addDate: "",
      addPriority: []
    };
  },
  methods: {
    addNewTask() {
      let createNewTask = {
        category: this.category,
        title: this.addTitle,
        description: this.addDesc,
        tag: this.addTag,
        due_date: this.addDate,
        task_priority: this.addPriority
      };
      axios({
        method: "POST",
        url: "https://infinite-oasis-77229.herokuapp.com/kanban",
        data: createNewTask,
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          // console.log(data);
          let createNewTask1 = {
            id: data.data.id,
            category: this.category,
            title: this.addTitle,
            description: this.addDesc,
            tag: this.addTag,
            due_date: this.addDate,
            task_priority: this.addPriority,
            User: {
              username: localStorage.getItem("username")
            }
          };
          this.$emit("addDatasNewTask", createNewTask1);
          swal("Success Created Task!", {
            icon: "success",
            button: false,
            timer: 2500
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>