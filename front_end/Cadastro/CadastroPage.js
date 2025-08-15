export class CadastroPage {
    constructor(page) {
        this.page = page;
        this.USER_NAME = '#nome';
        this.DIGITE_EMAIL = '#email';
        this.DIGITE_SENHA = '#password';
        this.CADASTRAR = '[data-testid="cadastrar"]';
        this.MENSAGEM_ERRO_EMAIL = '#email:invalid, input[type="email"]:invalid';
    }

    async clicarCadastrar() {
        await this.page.click(this.CADASTRAR);
    }

    async preencherCadastro(nome, email, senha) {
        await this.page.fill(this.USER_NAME, nome);
        await this.page.fill(this.DIGITE_EMAIL, email);
        await this.page.fill(this.DIGITE_SENHA, senha);
    }
    
    
    async getValidationMessage() {
        // Captura a mensagem de validação HTML5 do campo de email
        return await this.page.locator(this.DIGITE_EMAIL).evaluate(el => el.validationMessage);
    }

    async preencherCadastroSemSenha(nome, email) {
        await this.page.fill(this.USER_NAME, nome);
        await this.page.fill(this.DIGITE_EMAIL, email);
    }
}
