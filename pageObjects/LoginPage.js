class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
        this.errorMsg=page.locator("[aria-label='Incorrect email or password.']", {
            timeout: 5000,
          });
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

   async getTitle()
   {
       const title = await this.page.title();
       return title;
   }
    async validLogin(username,passsword)
    {
        await this.email.fill(username);
        await this.password.fill(passsword);
        await this.loginBtn.click();
    }

    async errorValidation()
    {
        // await this.errorMsg("[aria-label='Incorrect email or password.']", {
        //     timeout: 5000,
        //   });
          const erMsg = await this.page.textContent(
            "[aria-label='Incorrect email or password.']"
          );
          return erMsg;
    }
}

module.exports = {LoginPage}