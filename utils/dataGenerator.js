export function gerarDadosUnicos() {
    const timestamp = Date.now();
    const nome = `Usuario_${timestamp}`;
    const email = `usuario_${timestamp}@exemplo.com`;
    const senha = `Senha${timestamp}`;
    return { nome, email, senha };
}