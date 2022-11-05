<script>
  import { Router, Route } from 'svelte-navigator';
  import Header from './lib/Header.svelte';
  import Home from './routes/Home.svelte';
</script>

<Router>
  <Header />
  <main>
    <Route path="/">
      <Home />
    </Route>
  </main>
</Router>
