import { expect } from '@playwright/test';
import { CadastroPage } from './CadastroPage.js';
import { URL_BASE } from '../../globals.js';
import { messages } from './messages.js';

export async function iniciarCadastro(page, nome, email, senha) {
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.clicarCadastrar();
    await expect(page).toHaveURL(`${URL_BASE}/cadastrarusuarios`);
    await cadastroPage.preencherCadastro(nome, email, senha);
    await cadastroPage.clicarCadastrar();
    await expect(page).toHaveURL(`${URL_BASE}/home`);
}

export async function iniciarCadastroComEmailInvalido(page, nome, email, senha) {
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.clicarCadastrar();
    await expect(page).toHaveURL(`${URL_BASE}/cadastrarusuarios`);
    await cadastroPage.preencherCadastro(nome, email, senha);
    await cadastroPage.clicarCadastrar();
    const validationMessage = await cadastroPage.getValidationMessage();
    expect(validationMessage).toContain('@');
}

export async function iniciarPaginaLogin(page) {
    await page.goto(`${URL_BASE}/login`);
    await expect(page).toHaveURL(`${URL_BASE}/login`);
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.clicarCadastrar();
}

export async function iniciarCadastroSemSenha(page, nome, email) {
    await iniciarPaginaLogin(page);
    const cadastroPage = new CadastroPage(page);
    await cadastroPage.clicarCadastrar();
    await expect(page).toHaveURL(`${URL_BASE}/cadastrarusuarios`);
    await cadastroPage.preencherCadastroSemSenha(nome, email);
    await expect(page.getByText('Password é obrigatório')).toBeVisible();
    
    // // Tenta submeter o formulário para triggar a validação
    // await cadastroPage.clicarCadastrar();
    
    // // Captura e valida a mensagem de erro da senha
    // const validationMessage = await cadastroPage.getSenhaValidationMessage();
    // expect(validationMessage).toContain('Password é obrigatório');
}
