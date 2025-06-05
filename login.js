document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validação simples
    if (username === '' || password === '') {
        showToast('Por favor, preencha todos os campos.', 'danger');
        return;
    }

    // Simulação de autenticação
    if (username === 'user' && password === 'password') {
        showToast('Login realizado com sucesso!', 'success');
        // Redirecionar para a página principal após o login
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showToast('Usuário ou senha incorretos.', 'danger');
    }
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

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se o usuário está logado
    checkUserAuth();

    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Aqui você faria a verificação de credenciais (em uma aplicação real, provavelmente faria uma requisição a um servidor)
            if (username && password) {
                // Salva o nome do usuário no localStorage
                localStorage.setItem('username', username);

                // Exibe mensagem de sucesso (pode ser via toast)
                showToast('Login bem-sucedido!');

                // Redireciona para a página inicial ou qualquer outra
                window.location.href = 'index.html';
            } else {
                showToast('Por favor, insira um nome de usuário e senha válidos.');
            }
        });
    }
});

function checkUserAuth() {
    const username = localStorage.getItem('username');

    if (username) {
        // Se o usuário estiver logado, exibe o nome e o botão de logout
        document.getElementById('username-display').textContent = username;
        document.getElementById('user-info').classList.remove('d-none');
        document.getElementById('logout-item').classList.remove('d-none');
        document.getElementById('login-item').classList.add('d-none');
        document.getElementById('register-item').classList.add('d-none');
    }
}

function logout() {
    // Remove o usuário do localStorage e recarrega a página
    localStorage.removeItem('username');
    window.location.reload();
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Adiciona o evento de clique ao botão de modo escuro
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
