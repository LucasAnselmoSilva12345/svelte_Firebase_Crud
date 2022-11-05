<script>
  import { onDestroy } from 'svelte';
  import {
    doc,
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
  } from 'firebase/firestore';
  import { databaseFirestore } from './../firebase.js';

  let setValuesTaskForm = {
    title: '',
    description: '',
  };

  let valuesOfEachTask = [];

  let editStatus = false;

  async function createTask() {
    try {
      await addDoc(collection(databaseFirestore, 'tasks'), setValuesTaskForm);
    } catch (error) {
      alert(error);
    }
  }

  function listDataOfTask() {
    const unsub = onSnapshot(
      collection(databaseFirestore, 'tasks'),
      (querySnapshot) => {
        valuesOfEachTask = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      },
      (err) => {
        alert(err);
      }
    );
    onDestroy(unsub);
  }
  listDataOfTask();

  function handleEditTask(currentTask) {
    (setValuesTaskForm.title = currentTask.title),
      (setValuesTaskForm.description = currentTask.description);
    editStatus = true;
  }

  async function handleDeleteTask(id) {
    try {
      await deleteDoc(doc(databaseFirestore, 'tasks', id));
      alert('Task deleted');
    } catch (error) {
      alert(error);
    }
  }

  function handleSubmitForm() {
    try {
      if (editStatus) {
        alert('updating task');
      } else {
        createTask();
      }
    } catch (error) {
      alert(error);
    }
  }
</script>

<section>
  <form on:submit|preventDefault={handleSubmitForm}>
    <label for="title">Title</label>
    <input
      type="text"
      placeholder="Write a title"
      bind:value={setValuesTaskForm.title}
    />

    <label for="description">Description</label>
    <textarea
      name="description"
      id="description"
      rows="3"
      placeholder="Write a description"
      bind:value={setValuesTaskForm.description}
    />

    <button> save </button>
  </form>

  {#each valuesOfEachTask as task}
    <div>
      <h5>{task.title}</h5>
      <p>{task.description}</p>
      <button on:click={handleDeleteTask(task.id)}> Delete </button>
      <button on:click={handleEditTask(task)}> Edit </button>
    </div>
  {/each}
</section>
