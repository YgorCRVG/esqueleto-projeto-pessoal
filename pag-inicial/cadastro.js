document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Impede o envio do formulário

    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const sexo = document.getElementById('sexo').value;
    const nomeMaterno = document.getElementById('nome-materno').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const telefoneCelular = document.getElementById('telefone-celular').value;
    const telefoneFixo = document.getElementById('telefone-fixo').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validação simples
    if (nome === '' || dataNascimento === '' || sexo === '' || nomeMaterno === '' || cpf === '' ||
        email === '' || telefoneCelular === '' || telefoneFixo === '' || cep === '' || endereco === '' || login === '' ||
        password === '' || confirmPassword === '') {
        showToast('Por favor, preencha todos os campos.', 'danger');
        return;
    }

    // Validação do Nome
    if (nome.length < 15 || nome.length > 80 || !/^[a-zA-Z\s]+$/.test(nome)) {
        showToast('O nome deve ter entre 15 e 80 caracteres alfabéticos.', 'danger');
        return;
    }

    // Validação do CPF
    if (!validarCPF(cpf)) {
        showToast('CPF inválido.', 'danger');
        return;
    }

    // Validação do Telefone Celular e Telefone Fixo
    const phoneRegex = /^\+\d{2}\d{2}-\d{8}$/;
    if (!phoneRegex.test(telefoneCelular) || !phoneRegex.test(telefoneFixo)) {
        showToast('Os telefones devem estar no formato (+55)XX-XXXXXXXX.', 'danger');
        return;
    }

    // Validação do Login
    if (login.length !== 6 || !/^[a-zA-Z]+$/.test(login)) {
        showToast('O Login deve ter exatamente 6 caracteres alfabéticos.', 'danger');
        return;
    }

    // Validação da Senha
    if (password.length < 8 || !/^[a-zA-Z]+$/.test(password)) {
        showToast('A Senha deve ter pelo menos 8 caracteres alfabéticos.', 'danger');
        return;
    }

    // Confirmação da Senha
    if (password !== confirmPassword) {
        showToast('As senhas não coincidem.', 'danger');
        return;
    }

    // Simulação de cadastro bem-sucedido
    showToast('Cadastro realizado com sucesso!', 'success');

    // Redirecionar para a página de login após um breve atraso
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
});

// Função para exibir o toast
function showToast(message, type) {
    const toastElement = document.getElementById('toast');
    const toastBody = document.getElementById('toast-body');

    toastBody.textContent = message;
    toastElement.classList.remove('bg-success', 'bg-danger');
    toastElement.classList.add(type === 'success' ? 'bg-success' : 'bg-danger');

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Validação de CPF (dígito verificador)
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Elimina CPFs inválidos conhecidos (sequências de números repetidos)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let primeiroDigitoVerificador = 11 - (soma % 11);
    if (primeiroDigitoVerificador >= 10) {
        primeiroDigitoVerificador = 0;
    }

    // Verifica se o primeiro dígito verificador está correto
    if (primeiroDigitoVerificador !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let segundoDigitoVerificador = 11 - (soma % 11);
    if (segundoDigitoVerificador >= 10) {
        segundoDigitoVerificador = 0;
    }

    // Verifica se o segundo dígito verificador está correto
    if (segundoDigitoVerificador !== parseInt(cpf.charAt(10))) {
        return false;
    }

    // CPF é válido
    return true;
}

// Função para buscar e preencher o endereço com base no CEP
document.getElementById('cep').addEventListener('blur', function () {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    showToast('CEP não encontrado.', 'danger');
                    return;
                }

                // Preenche o campo de endereço com os dados retornados
                document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            })
            .catch(error => {
                showToast('Erro ao buscar o CEP. Tente novamente.', 'danger');
            });
    }
});

// Função para alternar o modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Adiciona o evento de clique ao botão de modo escuro
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
