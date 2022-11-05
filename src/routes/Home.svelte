<script>
  import { onDestroy } from 'svelte';
  import { addDoc, collection, onSnapshot } from 'firebase/firestore';
  import { databaseFirestore } from './../firebase.js';

  let getValuesTaskForm = {
    title: '',
    description: '',
  };

  let valuesOfEachTask = [];

  async function handleSubmitForm() {
    await addDoc(collection(databaseFirestore, 'tasks'), getValuesTaskForm);
  }

  function listDataOfTask() {
    const unsub = onSnapshot(
      collection(databaseFirestore, 'tasks'),
      (querySnapshot) => {
        valuesOfEachTask = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), taskID: doc.id };
        });
      },
      (err) => {
        alert(err);
      }
    );
    onDestroy(unsub);
  }

  listDataOfTask();
</script>

<section>
  <form on:submit|preventDefault={handleSubmitForm}>
    <label for="title">Title</label>
    <input
      type="text"
      placeholder="Write a title"
      bind:value={getValuesTaskForm.title}
    />

    <label for="description">Description</label>
    <textarea
      name="description"
      id="description"
      rows="3"
      placeholder="Write a description"
      bind:value={getValuesTaskForm.description}
    />

    <button> save </button>
  </form>

  {#each valuesOfEachTask as task}
    <div>
      <h5>{task.title}</h5>
      <p>{task.description}</p>
    </div>
  {/each}
</section>
