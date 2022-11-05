<script>
  import { onDestroy } from 'svelte';
  import { databaseFirestore } from './../firebase.js';
  import {
    doc,
    addDoc,
    collection,
    onSnapshot,
    deleteDoc,
    updateDoc,
  } from 'firebase/firestore';
  import Toastify from 'toastify-js';

  let setValuesTaskForm = {
    title: '',
    description: '',
  };
  let valuesOfEachTask = [];
  let editStatus = false;
  let currentId = '';

  async function createTask() {
    try {
      await addDoc(collection(databaseFirestore, 'tasks'), setValuesTaskForm);

      Toastify({
        text: 'Created task',
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: '#37b24d',
        },
      }).showToast();
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
    try {
      (setValuesTaskForm.title = currentTask.title),
        (setValuesTaskForm.description = currentTask.description);
      currentId = currentTask.id;
      editStatus = true;
    } catch (error) {
      alert(error);
    }
  }

  async function updateTask() {
    try {
      await updateDoc(
        doc(databaseFirestore, 'tasks', currentId),
        setValuesTaskForm
      );
    } catch (error) {
      alert(error);
    }
  }

  async function handleDeleteTask(id) {
    try {
      await deleteDoc(doc(databaseFirestore, 'tasks', id));
      Toastify({
        text: 'Task deleted',
        duration: 3000,
        newWindow: true,
        close: false,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: '#ff2500',
        },
      }).showToast();
    } catch (error) {
      alert(error);
    }
  }

  function handleSubmitForm() {
    try {
      if (editStatus) {
        updateTask();
      } else {
        createTask();
      }
    } catch (error) {
      alert(error);
    }

    setValuesTaskForm = {
      title: '',
      description: '',
    };
    editStatus = false;
    currentId = '';
  }
</script>

<section
  class="block p-6 rounded-lg shadow-lg bg-white w-9/12 md:w-6/12 my-5 mx-auto"
>
  <h1 class="text-3xl mb-6">Create new task</h1>

  <form on:submit|preventDefault={handleSubmitForm}>
    <div class="form-group mb-6">
      <input
        bind:value={setValuesTaskForm.title}
        required
        type="text"
        class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Write a title"
      />
    </div>

    <div class="form-group mb-6">
      <textarea
        bind:value={setValuesTaskForm.description}
        required
        class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
        name="description"
        id="description"
        rows="3"
        placeholder="Write a description"
      />
    </div>

    <button
      type="submit"
      class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out">Create</button
    >
  </form>
</section>

{#if valuesOfEachTask}
  {#each valuesOfEachTask as task}
    <div
      class="block p-6 rounded-lg shadow-lg bg-white w-9/12 md:w-6/12 my-5 mx-auto"
    >
      <h2 class="text-xl mb-2 text-zinc-900">{task.title}</h2>
      <p class="text-lg text-slate-500">{task.description}</p>
      <div class="mt-6 flex items-start gap-2">
        <button
          class="flex items-center px-4 py-2 text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
          on:click={handleDeleteTask(task.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <button
          class="flex items-center px-4 py-2 text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80"
          on:click={handleEditTask(task)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
    </div>
  {/each}
{/if}
