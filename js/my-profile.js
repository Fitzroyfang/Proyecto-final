function displayImage () {
    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
      document.getElementById('imagePreview').src = savedImage; // Muestra la imagen
      console.log("Imagen cargada desde localStorage", savedImage);
    } else {
      console.error("No se encontró la imagen en localStorage");
    }
  }
  
  window.onload = displayImage;