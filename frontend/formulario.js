// JavaScript principal do formulário

// Elementos DOM
const form = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const cpfInput = document.getElementById('cpf');
const dataNascimentoInput = document.getElementById('dataNascimento');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const enderecoInput = document.getElementById('endereco');
const aceiteTermosInput = document.getElementById('aceiteTermos');
const limparFormBtn = document.getElementById('limparForm');
const enviarFormBtn = document.getElementById('enviarForm');
const formStatus = document.getElementById('formStatus');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    setupInputFormatting();
});

function setupEventListeners() {
    // Event listeners para validação em tempo real
    nomeInput.addEventListener('blur', () => validarCampo('nome'));
    nomeInput.addEventListener('input', () => limparErro('nome'));
    
    cpfInput.addEventListener('blur', () => validarCampo('cpf'));
    cpfInput.addEventListener('input', () => {
        formatarInputCPF();
        limparErro('cpf');
    });
    
    dataNascimentoInput.addEventListener('blur', () => validarCampo('dataNascimento'));
    dataNascimentoInput.addEventListener('change', () => limparErro('dataNascimento'));
    
    telefoneInput.addEventListener('blur', () => validarCampo('telefone'));
    telefoneInput.addEventListener('input', () => {
        formatarInputTelefone();
        limparErro('telefone');
    });
    
    emailInput.addEventListener('blur', () => validarCampo('email'));
    emailInput.addEventListener('input', () => limparErro('email'));
    
    enderecoInput.addEventListener('blur', () => validarCampo('endereco'));
    enderecoInput.addEventListener('input', () => limparErro('endereco'));
    
    aceiteTermosInput.addEventListener('change', () => validarCampo('aceiteTermos'));
    
    // Event listeners para botões
    limparFormBtn.addEventListener('click', limparFormulario);
    form.addEventListener('submit', handleSubmit);
    
    // Prevenir envio com Enter em campos de input
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
}

function setupInputFormatting() {
    // Configurar máscaras de entrada
    cpfInput.setAttribute('maxlength', '14');
    telefoneInput.setAttribute('maxlength', '15');
}

function formatarInputCPF() {
    const valor = cpfInput.value;
    const cpfFormatado = formatarCPF(valor);
    cpfInput.value = cpfFormatado;
}

function formatarInputTelefone() {
    const valor = telefoneInput.value;
    const telefoneFormatado = formatarTelefone(valor);
    telefoneInput.value = telefoneFormatado;
}

function validarCampo(campo) {
    let valido = false;
    let mensagem = '';
    
    switch (campo) {
        case 'nome':
            const nomeResultado = validarNome(nomeInput.value);
            valido = nomeResultado.valido;
            mensagem = nomeResultado.mensagem;
            break;
            
        case 'cpf':
            const cpfLimpo = removerFormatacaoCPF(cpfInput.value);
            valido = validarCPF(cpfLimpo);
            mensagem = valido ? '' : 'CPF inválido';
            break;
            
        case 'dataNascimento':
            const dataResultado = validarDataNascimento(dataNascimentoInput.value);
            valido = dataResultado.valido;
            mensagem = dataResultado.mensagem;
            break;
            
        case 'telefone':
            const telefoneLimpo = removerFormatacaoTelefone(telefoneInput.value);
            valido = validarTelefone(telefoneLimpo);
            mensagem = valido ? '' : 'Telefone inválido (formato: (00) 00000-0000 ou (00) 0000-0000)';
            break;
            
        case 'email':
            valido = validarEmail(emailInput.value);
            mensagem = valido ? '' : 'E-mail inválido';
            break;
            
        case 'endereco':
            const enderecoResultado = validarEndereco(enderecoInput.value);
            valido = enderecoResultado.valido;
            mensagem = enderecoResultado.mensagem;
            break;
            
        case 'aceiteTermos':
            const aceiteResultado = validarAceiteTermos(aceiteTermosInput.checked);
            valido = aceiteResultado.valido;
            mensagem = aceiteResultado.mensagem;
            break;
    }
    
    mostrarErro(campo, valido ? '' : mensagem);
    return valido;
}

function mostrarErro(campo, mensagem) {
    const errorElement = document.getElementById(campo + 'Error');
    const inputElement = document.getElementById(campo);
    
    if (mensagem) {
        errorElement.textContent = mensagem;
        errorElement.classList.add('show');
        inputElement.classList.add('error');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        inputElement.classList.remove('error');
    }
}

function limparErro(campo) {
    const errorElement = document.getElementById(campo + 'Error');
    const inputElement = document.getElementById(campo);
    
    errorElement.textContent = '';
    errorElement.classList.remove('show');
    inputElement.classList.remove('error');
}

function validarFormulario() {
    const campos = ['nome', 'cpf', 'dataNascimento', 'telefone', 'email', 'endereco', 'aceiteTermos'];
    let formValido = true;
    
    campos.forEach(campo => {
        const campoValido = validarCampo(campo);
        if (!campoValido) {
            formValido = false;
        }
    });
    
    return formValido;
}

function handleSubmit(e) {
    e.preventDefault();
    
    // Limpar status anterior
    limparStatus();
    
    // Validar formulário
    if (!validarFormulario()) {
        mostrarStatus('error', 'Por favor, corrija os erros no formulário.');
        return;
    }
    
    // Simular envio
    enviarFormulario();
}

function enviarFormulario() {
    // Mostrar estado de carregamento
    enviarFormBtn.classList.add('loading');
    enviarFormBtn.disabled = true;
    limparFormBtn.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        // Simular sucesso ou erro
        const sucesso = Math.random() > 0.2; // 80% de chance de sucesso
        
        if (sucesso) {
            mostrarStatus('success', 'Formulário enviado com sucesso! Em breve entraremos em contato.');
            limparFormulario();
        } else {
            mostrarStatus('error', 'Erro ao enviar formulário. Tente novamente.');
        }
        
        // Restaurar botões
        enviarFormBtn.classList.remove('loading');
        enviarFormBtn.disabled = false;
        limparFormBtn.disabled = false;
    }, 2000);
}

function limparFormulario() {
    // Limpar todos os campos
    form.reset();
    
    // Limpar todos os erros
    const campos = ['nome', 'cpf', 'dataNascimento', 'telefone', 'email', 'endereco', 'aceiteTermos'];
    campos.forEach(campo => {
        limparErro(campo);
    });
    
    // Limpar status
    limparStatus();
    
    // Focar no primeiro campo
    nomeInput.focus();
}

function mostrarStatus(tipo, mensagem) {
    formStatus.textContent = mensagem;
    formStatus.className = `form-status ${tipo} show`;
    
    // Auto-ocultar após 5 segundos
    setTimeout(() => {
        limparStatus();
    }, 5000);
}

function limparStatus() {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
}

// Função para testar validações (para demonstração)
function testarValidacoes() {
    console.log('=== Testando Validações ===');
    
    // Teste CPF
    console.log('CPF válido (11144477735):', validarCPF('11144477735'));
    console.log('CPF inválido (11111111111):', validarCPF('11111111111'));
    
    // Teste Data
    console.log('Data válida (1990-01-01):', validarDataNascimento('1990-01-01'));
    console.log('Data inválida (2030-01-01):', validarDataNascimento('2030-01-01'));
    
    // Teste Telefone
    console.log('Telefone válido (11999999999):', validarTelefone('11999999999'));
    console.log('Telefone inválido (1111111111):', validarTelefone('1111111111'));
    
    // Teste E-mail
    console.log('E-mail válido (teste@email.com):', validarEmail('teste@email.com'));
    console.log('E-mail inválido (teste@):', validarEmail('teste@'));
}

// Executar testes no console (para demonstração)
if (typeof window !== 'undefined') {
    window.testarValidacoes = testarValidacoes;
}
