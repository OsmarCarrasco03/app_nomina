var footer = document.querySelector('footer');

if (!footer) {

   footer = document.createElement('footer');

   footer.innerHTML = `

       <div class="footer-content">

           <p>Copyright &copy; 2023. Financiera para el Bienestar, Todos los derechos reservados.</p>

       </div>

   `;

   footer.style.backgroundColor = '#13322b';

   footer.style.color = 'white';

   footer.style.textAlign = 'center';

   footer.style.fontSize = '15px';

   footer.style.position = 'fixed';

   footer.style.bottom = '0';

   footer.style.width = '100%';

 

   document.body.appendChild(footer);

}

