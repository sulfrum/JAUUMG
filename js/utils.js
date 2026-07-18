
    // -------------------------------------------------------
    // funzioni globali
    // -------------------------------------------------------

    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }
    

    function getClampedInt(inputId, min, max, fallback) {
      const input = document.getElementById(inputId);
      let value = Number(input.value);

      if (!Number.isFinite(value)) {
        value = fallback;
      }

      value = Math.floor(value);
      value = Math.max(min, Math.min(max, value));

      input.value = value;

      return value;
    }   
