<script>
  let getValuesTaskForm = {
    title: '',
    description: '',
  };

  function handleSubmitForm() {
    console.log(getValuesTaskForm);
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
