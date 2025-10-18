// frontend/script.js
document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('tool-request-form');

    form.addEventListener('submit', function(event) {
        
        event.preventDefault(); // Impede o recarregamento da página
        
        // Coleta TODOS os dados do formulário, incluindo o arquivo
        const formData = new FormData(form);

        // Mostra um feedback visual de "enviando"
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Envia os dados para o backend na porta 3000
        fetch('http://localhost:3000/submit-form', {
            method: 'POST',
            body: formData, 
            // Não defina 'Content-Type', o FormData faz isso automaticamente
            // para 'multipart/form-data' quando há arquivos.
        })
        .then(response => {
            if (!response.ok) {
                // Se a resposta do servidor não for 'ok', lança um erro
                throw new Error(`Erro do servidor: ${response.statusText}`);
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
            alert('Solicitação enviada com sucesso!');
            form.reset(); // Limpa o formulário
        })
        .catch(error => {
            console.error('Erro ao enviar formulário:', error);
            alert(`Erro ao enviar: ${error.message}. Verifique o console.`);
        })
        .finally(() => {
            // Restaura o botão em caso de sucesso ou erro
            submitButton.textContent = 'Enviar Solicitação';
            submitButton.disabled = false;
        });
    });
});