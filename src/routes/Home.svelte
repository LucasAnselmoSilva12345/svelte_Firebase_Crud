<script>
  import { addDoc, collection } from 'firebase/firestore';
  import { databaseFirestore } from './../firebase.js';

  let getValuesTaskForm = {
    title: '',
    description: '',
  };

  async function handleSubmitForm() {
    await addDoc(collection(databaseFirestore, 'tasks'), getValuesTaskForm);
    console.log('task saved');
  }
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
</section>
