const themeToggle = document.getElementById('themeToggle')

//isso vai checar se o tema esta salvo no lacalStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode')
    themeToggle.textContent =  '☀️'
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')

    //isso aqui meu parceiro vai atualizar o texto do botão e saalvar no localStorage
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️'
        localStorage.setItem('theme', 'light') 
       }
})

    //isso vai manipular o envio do seu formulario com a validação e animação
    const form = document.querySelector('.contact-form');
const formResponse = document.getElementById('formResponse');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const nome = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const mensagem = form.querySelector('textarea').value.trim();

    formResponse.textContent = '';
    formResponse.style.color = 'red';

    if (nome.length < 2) {
        formResponse.textContent = 'Nome deve ter pelo menos 3 caracteres';
        return;
    }
    if (!validateEmail(email)) {
        formResponse.textContent = 'Por favor, insira um e-mail válido';
        return;
    }

    formResponse.style.color = 'blue';
    formResponse.textContent = 'Enviando...';

    try {
        const response = await fetch('http://localhost:5000/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, mensagem })
        });

        const data = await response.json();

        if (response.ok) {
            formResponse.style.color = 'green';
            formResponse.textContent = `Obrigado ${nome}, sua mensagem foi enviada com sucesso!`;
            form.reset();
        } else {
            formResponse.style.color = 'red';
            formResponse.textContent = data.message;
        }
    } catch (error) {
        formResponse.style.color = 'red';
        formResponse.textContent = 'Erro ao enviar mensagem. Tente novamente!';
    }
});

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
