<script>
  import { Router, Route } from 'svelte-navigator';
  import Home from './routes/Home.svelte';
</script>

<Router>
  <main>
    <Route path="/">
      <Home />
    </Route>
  </main>
</Router>
