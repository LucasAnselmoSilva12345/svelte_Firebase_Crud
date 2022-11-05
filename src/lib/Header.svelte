<script>
  import { Link } from 'svelte-navigator';
</script>

<header>
  <nav class="relative bg-gray-800">
    <div class="container px-6 py-4 mx-auto flex justify-center items-center">
      <div class="flex items-center justify-center">
        <div>
          <Link
            class="text-2xl font-bold text-white transition-colors duration-300 transform lg:text-3xl hover:text-gray-300"
            to="/">Firebase Crud</Link
          >
        </div>
      </div>
    </div>
  </nav>
</header>
