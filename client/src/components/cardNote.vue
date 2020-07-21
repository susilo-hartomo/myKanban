<template>
  <div class="card-body pr-3 pl-3">
    <div class="card-body-title">
      {{ el.title.toUpperCase()}}
      <div class="float-right button_action">
        <a
          href
          class="m-0 mr-2"
          data-toggle="tooltip"
          data-placement="top"
          title="Edit"
          @click.prevent="$emit('editTask', el)"
        >
          <i class="material-icons text-info">create</i>
        </a>
        <a
          href
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          @click.prevent="deleteTask"
        >
          <i class="material-icons text-danger">delete</i>
        </a>
      </div>
    </div>
    <div class style="margin-top: -8px;">
      <span class="mr-2 mt-0">
        <small class="text-mutet">Due Date : {{el.due_date}}</small>
      </span>
      <small>
        Createt by :
        <cite>{{el.User.username}}</cite>
      </small>
    </div>
    <blockquote class="card-body-content mt-2">"{{ el.description }}"</blockquote>
    <hr />
    <div class="d-flex justify-content-between">
      <div>
        <span class="badge badge-primary">{{el.tag}}</span>
      </div>
      <div class="float-right">
        <p class="mb-0">Priority : {{el.task_priority}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "cardNote",
  props: ["el"],
  data() {
    return {};
  },
  methods: {
    deleteTask() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this file!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          axios({
            method: "DELETE",
            url: "https://infinite-oasis-77229.herokuapp.com/kanban/" + this.el.id,
            headers: { access_token: localStorage.access_token }
          })
            .then(data => {
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
                button: false,
                timer: 2000
              });
              this.$emit("deletedTask", this.el.id);
            })
            .catch(err => {
              swal("Your file can't access delete", {
                icon: "error",
                button: false,
                timer: 2000
              });
              console.log(err);
            });
        } else {
          swal("Your file can't access delete", {
            icon: "error",
            button: false,
            timer: 2000
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.button_action a {
  display: none;
}

.card-body:hover {
  box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.1);
}

.card-body:hover .button_action a{
  display: inline-block;
}
</style>