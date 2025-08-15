import { test, expect } from "@playwright/test";
import { URL_BASE } from '../../globals.js';
import { iniciarCadastro, iniciarCadastroComEmailInvalido, iniciarPaginaLogin, iniciarCadastroSemSenha } from './CadastroFunctions.js';
import { gerarDadosUnicos } from '../../utils/dataGenerator.js';

test.describe('Cadastrar usuario', () => {
    test('Deve acessar a página de cadastro', async ({ page }) => {
        await iniciarPaginaLogin(page);
        const { nome, email, senha } = gerarDadosUnicos();
        await iniciarCadastro(page, nome, email, senha);
    });

    test('Informar email invalido', async ({ page }) => {
        await iniciarPaginaLogin(page);
        await iniciarCadastroComEmailInvalido(page, 'Teste VAZ', 'emailinvalido', 'senha_12345');
    });

    test('Não informar a senha e testar cadastrar o usuario', async ({ page }) => {
        await iniciarPaginaLogin(page);
        await iniciarCadastroSemSenha(page, 'Teste VAZ', 'teste@example.com');
    });
});
