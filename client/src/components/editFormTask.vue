<template>
  <!-- form add task -->
  <div class="d-flex card">
    <div class>
      <form class="form" v-on:submit.prevent="updatedTask">
        <div class="card-header card-header-primary text-center">
          <h4 class="card-title">Update Task</h4>
        </div>
        <div class="card-body" style="overflow: auto; max-height: 290px">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Select Category</label>
            <select
              class="form-control selectpicker"
              data-style="btn btn-link"
              id="exampleFormControlSelect1"
              v-model="addCategory"
            >
              <option value disabled>-- Select your Option</option>
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="done">Done</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="input-group mt-2">
            <input type="text" class="form-control" v-model="addTitle" />
          </div>
          <div class="input-group mt-2">
            <input type="text" class="form-control" v-model="addDesc" />
          </div>
          <div class="input-group mt-2">
            <input type="text" class="form-control" v-model="addTag" />
          </div>
          <div class="input-group mt-2">
            <input type="date" class="form-control" v-model="addDate" />
          </div>
          <div class="input-group mt-3">
            <label for>Task Priority</label>
            <div class="mt-0">
              <div class="form-check form-check-inline">
                <label class="form-check-label">
                  <input class="form-check-input" type="radio" v-model="addPriority" checked="checked" value="low"/>
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
          <button class="btn btn-primary m-2" style="width: inherit;">Update</button>
          <button
            class="btn btn-outline-muted m-2"
            style="width: inherit;"
            @click.prevent="$emit('tutupFormEdit', false)"
          >Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "editFormTask",
  props: ["editData"],
  data() {
    return {
      addCategory: this.editData.category,
      addTitle: this.editData.title,
      addDesc: this.editData.description,
      addTag: this.editData.tag,
      addDate: this.editData.due_date,
      addPriority: this.editData.task_priority
    };
  },
  methods: {
    updatedTask() {
      let newUpdatedTask = {
        category: this.addCategory,
        title: this.addTitle,
        description: this.addDesc,
        tag: this.addTag,
        due_date: this.addDate,
        task_priority: this.addPriority
      };
      console.log("newUpdatedTask: ", newUpdatedTask);
      axios({
        method: "put",
        url: "https://infinite-oasis-77229.herokuapp.com/kanban/" + this.editData.id,
        data: newUpdatedTask,
        headers: { access_token: localStorage.access_token }
      })
        .then(response => {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
            button: false,
            timer: 2500
          });
          this.$emit("editDataTaskUpdate");
        })
        .catch(err => {
          swal("Your file can't access edit", {
            icon: "error",
            button: false,
            timer: 2000
          });
          console.log(err);
          this.$emit('tutupFormEditTask')
        });
    }
  }
};
</script>

<style>
</style>