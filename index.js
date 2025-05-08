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
    const form = document.querySelector('.contact-form')
    const formResponse = document.getElementById('formResponse') 

    form.addEventListener(submit, function(e) {
        e.preventDefault()


        const nome = form.querySelector('input[type="text"]').value.trim()
        const email = form.querySelector('input[type="email"]').value.trim()
        const mensagem = form.querySelector('textarea').value.trim()

        //Limpa as mensagens antigas
        formResponse.textContent = ''
        formResponse.style.color = 'red'

        //validaçoes simples
        if (nome.length < 2) {
            formResponse.textContent = 'nome deve ter pelo menos 3 caracteres'
            return
        }
        if (!validateEmail(email)) {
            formResponse,this.textContent = 'Por favor, insira um e-mail valido'
            return
        }

        //vai simular uma animação simples no envio
        formResponse.style.color ='blue'
        formResponse.textContent = 'Enviando..'

        setTimeout(() => {
            formResponse.style.color = 'green'
            formResponse.textContent = `Obrigado${nome}, sua mensagem foi enviada com sucesso!`

        //limoa o formulario dps de enviar 
        form.reset()
        }, 1500)
    })


        function validateEmail(email) {
            //expressão para validar email
            const re =  /\S+@\S+\.\S+/;
            return re.test(email)
        }

        //inicia AOS (animação de rolagem)
        AOS.init()
