document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarUl = document.querySelector('.navbar ul');
  
    navbarToggle.addEventListener('click', () => {
      console.log('Toggle button clicked!');
      navbarUl.classList.toggle('active');
      navbarToggle.classList.toggle('active');
    });
  });