<script>
  async function loadReading() {
    try {
      const res = await fetch('reading.json');
      const data = await res.json();

      document.body.innerHTML += "<p>Loaded OK</p>";
      document.body.innerHTML += "<p>" + data.title + "</p>";

    } catch (err) {
      document.body.innerHTML += "<p style='color:red;'>ERROR LOADING JSON</p>";
      console.error(err);
    }
  }

  loadReading();
</script>
