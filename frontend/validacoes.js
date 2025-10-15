// Validações JavaScript para CPF, Data e Telefone

/**
 * Valida CPF
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} - true se válido, false se inválido
 */
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpfLimpo.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
        return false;
    }
    
    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let primeiroDigito = resto < 2 ? 0 : 11 - resto;
    
    // Verifica o primeiro dígito
    if (parseInt(cpfLimpo.charAt(9)) !== primeiroDigito) {
        return false;
    }
    
    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let segundoDigito = resto < 2 ? 0 : 11 - resto;
    
    // Verifica o segundo dígito
    if (parseInt(cpfLimpo.charAt(10)) !== segundoDigito) {
        return false;
    }
    
    return true;
}

/**
 * Valida data de nascimento
 * @param {string} data - Data no formato YYYY-MM-DD
 * @returns {object} - {valido: boolean, mensagem: string}
 */
function validarDataNascimento(data) {
    if (!data) {
        return { valido: false, mensagem: 'Data de nascimento é obrigatória' };
    }
    
    const dataNascimento = new Date(data);
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    
    // Ajusta a idade se ainda não fez aniversário este ano
    const idadeReal = (mesAtual < mesNascimento || 
                      (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) 
                      ? idade - 1 : idade;
    
    // Verifica se a data é válida
    if (isNaN(dataNascimento.getTime())) {
        return { valido: false, mensagem: 'Data inválida' };
    }
    
    // Verifica se a data não é futura
    if (dataNascimento > hoje) {
        return { valido: false, mensagem: 'Data de nascimento não pode ser futura' };
    }
    
    // Verifica se a idade é válida (entre 16 e 120 anos)
    if (idadeReal < 16) {
        return { valido: false, mensagem: 'Idade mínima é 16 anos' };
    }
    
    if (idadeReal > 120) {
        return { valido: false, mensagem: 'Idade máxima é 120 anos' };
    }
    
    return { valido: true, mensagem: '' };
}

/**
 * Valida telefone
 * @param {string} telefone - Telefone a ser validado
 * @returns {boolean} - true se válido, false se inválido
 */
function validarTelefone(telefone) {
    // Remove caracteres não numéricos
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    // Verifica se tem 10 ou 11 dígitos
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        return false;
    }
    
    // Verifica se é um celular (11 dígitos) ou telefone fixo (10 dígitos)
    if (telefoneLimpo.length === 11) {
        // Celular: deve começar com 9
        return telefoneLimpo.charAt(2) === '9';
    } else {
        // Telefone fixo: não deve começar com 9
        return telefoneLimpo.charAt(2) !== '9';
    }
}

/**
 * Valida e-mail
 * @param {string} email - E-mail a ser validado
 * @returns {boolean} - true se válido, false se inválido
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida nome completo
 * @param {string} nome - Nome a ser validado
 * @returns {object} - {valido: boolean, mensagem: string}
 */
function validarNome(nome) {
    if (!nome || nome.trim().length === 0) {
        return { valido: false, mensagem: 'Nome é obrigatório' };
    }
    
    if (nome.trim().length < 2) {
        return { valido: false, mensagem: 'Nome deve ter pelo menos 2 caracteres' };
    }
    
    if (nome.trim().length > 100) {
        return { valido: false, mensagem: 'Nome deve ter no máximo 100 caracteres' };
    }
    
    // Verifica se contém apenas letras, espaços e acentos
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!regex.test(nome.trim())) {
        return { valido: false, mensagem: 'Nome deve conter apenas letras e espaços' };
    }
    
    // Verifica se tem pelo menos nome e sobrenome
    const partes = nome.trim().split(/\s+/);
    if (partes.length < 2) {
        return { valido: false, mensagem: 'Digite nome e sobrenome' };
    }
    
    return { valido: true, mensagem: '' };
}

/**
 * Formata CPF
 * @param {string} cpf - CPF sem formatação
 * @returns {string} - CPF formatado
 */
function formatarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Formata telefone
 * @param {string} telefone - Telefone sem formatação
 * @returns {string} - Telefone formatado
 */
function formatarTelefone(telefone) {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    
    if (telefoneLimpo.length === 11) {
        return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefoneLimpo.length === 10) {
        return telefoneLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefoneLimpo;
}

/**
 * Remove formatação de CPF
 * @param {string} cpf - CPF formatado
 * @returns {string} - CPF sem formatação
 */
function removerFormatacaoCPF(cpf) {
    return cpf.replace(/\D/g, '');
}

/**
 * Remove formatação de telefone
 * @param {string} telefone - Telefone formatado
 * @returns {string} - Telefone sem formatação
 */
function removerFormatacaoTelefone(telefone) {
    return telefone.replace(/\D/g, '');
}

/**
 * Valida endereço
 * @param {string} endereco - Endereço a ser validado
 * @returns {object} - {valido: boolean, mensagem: string}
 */
function validarEndereco(endereco) {
    if (!endereco || endereco.trim().length === 0) {
        return { valido: true, mensagem: '' }; // Endereço é opcional
    }
    
    if (endereco.trim().length < 10) {
        return { valido: false, mensagem: 'Endereço deve ter pelo menos 10 caracteres' };
    }
    
    if (endereco.trim().length > 500) {
        return { valido: false, mensagem: 'Endereço deve ter no máximo 500 caracteres' };
    }
    
    return { valido: true, mensagem: '' };
}

/**
 * Valida checkbox de termos
 * @param {boolean} aceite - Se aceitou os termos
 * @returns {object} - {valido: boolean, mensagem: string}
 */
function validarAceiteTermos(aceite) {
    if (!aceite) {
        return { valido: false, mensagem: 'Você deve aceitar os termos e condições' };
    }
    
    return { valido: true, mensagem: '' };
}

// Exportar funções para uso global
window.validarCPF = validarCPF;
window.validarDataNascimento = validarDataNascimento;
window.validarTelefone = validarTelefone;
window.validarEmail = validarEmail;
window.validarNome = validarNome;
window.validarEndereco = validarEndereco;
window.validarAceiteTermos = validarAceiteTermos;
window.formatarCPF = formatarCPF;
window.formatarTelefone = formatarTelefone;
window.removerFormatacaoCPF = removerFormatacaoCPF;
window.removerFormatacaoTelefone = removerFormatacaoTelefone;
