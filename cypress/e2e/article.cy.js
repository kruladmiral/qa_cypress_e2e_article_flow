describe('Conduit article', () => {
  let article = {};
  let user = {};
  beforeEach(() => {
    cy.visit('https://conduit.mate.academy/');
    cy.task('generateUser').then((newUser) => {
      user = newUser;
    });
    cy.task('generateArticle').then((newArticle) => {
      article = newArticle;
    });
  });

  it('should be able to create a new article', () => {
    cy.signUp(user.email, user.username, user.password);
    cy.reload();
    cy.get('.navbar')
      .should('contain', user.username.toLowerCase());
    cy.createArticle(article.title, article.description, article.body);
    cy.contains('a', user.username.toLowerCase())
      .click();
    cy.reload();
    cy.get('.row')
      .should('contain', article.title);
    cy.get('.row')
      .should('contain', article.description);
  });
  it('should create an article and delete it', () => {
    cy.signUp(user.email, user.username, user.password);
    cy.reload();
    cy.get('.navbar')
      .should('contain', user.username.toLowerCase());
    cy.createArticle(article.title, article.description, article.body);
    cy.contains('a', user.username.toLowerCase())
      .click();
    cy.reload();
    cy.get('.row')
      .should('contain', article.title);
    cy.get('.row')
      .should('contain', article.description);
    cy.deleteArticle();
    cy.reload();
    cy.get('.row')
      .should('not.contain', article.title);
  });
});
