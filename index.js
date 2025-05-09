// Seleciona o botão do tema
const themeToggle = document.getElementById('themeToggle');

// Checa se há tema salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Alterna tema ao clicar
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Seleciona o form e a mensagem de resposta
const form = document.querySelector('.contact-form');
const formResponse = document.getElementById('formResponse');

// Escuta o envio do formulário
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const mensagem = form.querySelector('textarea').value.trim();

    formResponse.textContent = '';
    formResponse.style.color = 'red';

    // Validações simples
    if (nome.length < 3) {
        formResponse.textContent = 'Nome deve ter pelo menos 3 caracteres';
        return;
    }
    if (!validateEmail(email)) {
        formResponse.textContent = 'Por favor, insira um e-mail válido';
        return;
    }

    // Mostra mensagem de envio
    formResponse.style.color = 'blue';
    formResponse.textContent = 'Enviando...';

    try {
        // Simula envio para backend (ou use seu real)
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

            // Salva no localStorage
            const novoContato = {
                nome,
                email,
                mensagem,
                data: new Date().toLocaleString()
            };
            let contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || [];
            contatosSalvos.push(novoContato);
            localStorage.setItem('contatos', JSON.stringify(contatosSalvos));

            form.reset();

            // Atualiza a lista na tela (se existir)
            exibirContatosSalvos();
        } else {
            formResponse.style.color = 'red';
            formResponse.textContent = data.message || 'Erro ao enviar.';
        }
    } catch (error) {
        formResponse.style.color = 'red';
        formResponse.textContent = 'Erro ao enviar mensagem. Tente novamente!';
    }
});

// Validador de e-mail simples
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Função extra: exibir contatos salvos na tela (opcional)
function exibirContatosSalvos() {
    let contatosSalvos = JSON.parse(localStorage.getItem('contatos')) || [];
    let lista = document.getElementById('listaContatos');

    if (!lista) {
        lista = document.createElement('div');
        lista.id = 'listaContatos';
        lista.style.marginTop = '20px';
        lista.style.borderTop = '1px solid #45a29e';
        lista.innerHTML = '<h3 style="color: #66fcf1; margin-top: 15px;">Contatos salvos localmente:</h3>';
        form.parentNode.appendChild(lista);
    }

    if (contatosSalvos.length === 0) {
        lista.innerHTML = '<p style="color: #c5c6c7;">Nenhum contato salvo ainda.</p>';
    } else {
        let html = '<h3 style="color: #66fcf1; margin-top: 15px;">Contatos salvos localmente:</h3>';
        contatosSalvos.forEach((contato, index) => {
            html += `
                <div style="margin-bottom: 10px; border: 1px solid #45a29e; padding: 10px; border-radius: 5px;">
                    <strong>${index + 1}. Nome:</strong> ${contato.nome}<br>
                    <strong>Email:</strong> ${contato.email}<br>
                    <strong>Mensagem:</strong> ${contato.mensagem}<br>
                    <small style="color: #999;">Salvo em: ${contato.data}</small>
                </div>
            `;
        });
        lista.innerHTML = html;
    }
}

// Exibe ao carregar a página (se houver)
exibirContatosSalvos();
