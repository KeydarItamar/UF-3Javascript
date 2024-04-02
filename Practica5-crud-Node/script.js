fetch('http://localhost:3000/categorias')
.then(response => response.json())
.then(data => {
  const categoriaSelect = document.getElementById('categoria');
  data.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria.id; 
    option.textContent = categoria.name; 
    categoriaSelect.appendChild(option);
  });
})
.catch(error => console.error('Error al obtener las categorías:', error));

//solicitud get de las subcategorias
fetch('http://localhost:3000/subcategorias')
.then(response => response.json())
.then(data => {
  const subcategoriaSelect = document.getElementById('subcategoria');
  data.forEach(subcategoria => {
    const option = document.createElement('option');
    option.value = subcategoria.id; 
    option.textContent = subcategoria.name; 
    subcategoriaSelect.appendChild(option);
  });
})
.catch(error => console.error('Error al obtener las subcategorías:', error));