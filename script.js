// script.js

// URL base do seu backend (json-server)
const baseURL = 'http://localhost:3000/locais';

document.addEventListener('DOMContentLoaded', () => {
  const localForm = document.getElementById('localForm');
  const locaisList = document.getElementById('locaisList');
  const cancelEditButton = document.getElementById('cancelEdit');
  
  // Carrega os locais cadastrados ao iniciar
  fetchLocais();
  
  // Evento de envio do formulário
  localForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Recupera os dados do formulário
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const foto = document.getElementById('foto').value;
    const localId = document.getElementById('localId').value;
    
    // Se houver um id, está editando; senão, cria um novo local
    if (localId) {
      updateLocal(localId, { titulo, descricao, foto });
    } else {
      createLocal({ titulo, descricao, foto });
    }
  });
  
  // Evento para cancelar a edição
  cancelEditButton.addEventListener('click', function () {
    resetForm();
  });
  
  // Função para buscar e exibir os locais
  function fetchLocais() {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        displayLocais(data);
      })
      .catch(error => console.error('Erro ao buscar os locais:', error));
  }
  
  function displayLocais(locais) {
    locaisList.innerHTML = '';
    locais.forEach(local => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-4';
      
      col.innerHTML = `
        <div class="card">
          <img src="${local.foto}" class="card-img-top" alt="${local.titulo}">
          <div class="card-body">
            <h5 class="card-title">${local.titulo}</h5>
            <p class="card-text">${local.descricao}</p>
            <button class="btn btn-warning btn-sm edit-btn" data-id="${local.id}" title="Editar">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${local.id}" title="Excluir">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      locaisList.appendChild(col);
    });
    
    // Adiciona os eventos aos botões de editar e excluir
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        editLocal(id);
      });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteLocal(id);
      });
    });
  }
  
  // Função para criar um novo local
  function createLocal(localData) {
    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(localData)
    })
      .then(response => response.json())
      .then(data => {
        resetForm();
        fetchLocais();
      })
      .catch(error => console.error('Erro ao criar local:', error));
  }
  
  // Função para atualizar um local já existente
  function updateLocal(id, localData) {
    fetch(`${baseURL}/${id}`, {
      method: 'PUT', // ou use PATCH se preferir atualizar apenas parte dos dados
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(localData)
    })
      .then(response => response.json())
      .then(data => {
        resetForm();
        fetchLocais();
      })
      .catch(error => console.error('Erro ao atualizar local:', error));
  }
  
  // Função para excluir um local
  function deleteLocal(id) {
    if (confirm("Deseja realmente excluir este local?")) {
      fetch(`${baseURL}/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          fetchLocais();
        })
        .catch(error => console.error('Erro ao excluir local:', error));
    }
  }
  
// Função para carregar os dados de um local no formulário para edição
function editLocal(id) {
  fetch(`${baseURL}/${id}`)
    .then(response => response.json())
    .then(local => {
      document.getElementById('titulo').value = local.titulo;
      document.getElementById('descricao').value = local.descricao;
      document.getElementById('foto').value = local.foto;
      document.getElementById('localId').value = local.id;
      document.getElementById('submitButton').textContent = 'Atualizar Local';
      cancelEditButton.style.display = 'inline-block';

      // Rola suavemente até a parte do formulário
      document.getElementById('formContainer').scrollIntoView({
        behavior: 'smooth'
      });
    })
    .catch(error => console.error('Erro ao buscar local para edição:', error));
}
  
  // Função para resetar o formulário
  function resetForm() {
    localForm.reset();
    document.getElementById('localId').value = '';
    document.getElementById('submitButton').textContent = 'Adicionar Local';
    cancelEditButton.style.display = 'none';
  }
});