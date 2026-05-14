    const DEFAULT_DIPLOMAS = [
      { titulo: 'Diploma 1', institucion: 'Institución / Universidad', año: '2024', tipo: 'Certificado' },
      { titulo: 'Diploma 2', institucion: 'Institución / Universidad', año: '2023', tipo: 'Título' },
      { titulo: 'Diploma 3', institucion: 'Institución / Universidad', año: '2023', tipo: 'Curso' },
    ];

    const grid = document.getElementById('diplomasGrid');

    function createDiplomaCard(data = {}) {
      const card = document.createElement('div');
      card.className = 'diploma-card';

      card.innerHTML = `
        <div class="diploma-img-zone" id="zone-${Date.now()}">
          <input type="file" accept="image/*">
          <img alt="Diploma">
          <button class="diploma-remove" title="Quitar imagen">✕</button>
          <div class="upload-placeholder">
            <div class="upload-icon">📄</div>
            <div class="upload-text">Haz clic o arrastra<br>tu diploma aquí</div>
            <div class="upload-badge">JPG · PNG · PDF</div>
          </div>
        </div>
        <div class="diploma-info">
          <input class="diploma-title-input" type="text" placeholder="Nombre del diploma" value="${data.titulo || ''}">
          <input class="diploma-meta-input" type="text" placeholder="Institución o universidad" value="${data.institucion || ''}">
          <div class="diploma-divider"></div>
          <div class="diploma-footer">
            <input class="diploma-year-input" type="text" placeholder="Año" value="${data.año || ''}">
            <input class="diploma-type-input" type="text" placeholder="Tipo (Título, Curso...)" value="${data.tipo || ''}">
          </div>
        </div>`;

      const zone = card.querySelector('.diploma-img-zone');
      const fileInput = card.querySelector('input[type="file"]');
      const img = card.querySelector('img');
      const removeBtn = card.querySelector('.diploma-remove');

      // Subir imagen
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          img.src = ev.target.result;
          zone.classList.add('has-img');
        };
        reader.readAsDataURL(file);
      });

      // Quitar imagen
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        img.src = '';
        zone.classList.remove('has-img');
        fileInput.value = '';
      });

      return card;
    }

    function createAddButton() {
      const btn = document.createElement('button');
      btn.className = 'add-diploma-btn';
      btn.innerHTML = `<div class="plus">+</div><span>Añadir diploma</span>`;
      btn.addEventListener('click', () => {
        const newCard = createDiplomaCard();
        grid.insertBefore(newCard, btn);
      });
      return btn;
    }

    // Inicializar
    DEFAULT_DIPLOMAS.forEach(d => grid.appendChild(createDiplomaCard(d)));
    grid.appendChild(createAddButton());
  