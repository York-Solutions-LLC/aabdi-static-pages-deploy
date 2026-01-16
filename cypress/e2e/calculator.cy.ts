describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const buttonMap = {
    "-": "−",
    "+": "+",
    "*": "*",
    "/": "/",
  };

  const calculate = (expr, expected) => {
    expr.split("").forEach((el) => cy.contains(buttonMap[el] || el).click());
    cy.contains("=").click();
    cy.get('[data-testid="display"]').should("contain", expected);
    cy.contains("Clear").click();
  };

  it("adds two numbers", () => {
    calculate("12+3", 15);
  });

  it("subtracts two numbers", () => {
    calculate("10-2", 8);
  });

  it("divides two numbers", () => {
    calculate("10/2", 5);
  });

  it("Multiplies two numbers", () => {
    calculate("10*2", 20);
  });
  it("Multiplies two numbers using parentheses", () => {
    calculate("10(2)", 20);
  });
  it("gets the percent of", () => {
    calculate("10%20", 2);
  });

  it("squares a number", () => {
    cy.contains("3").click();
    cy.contains("x²").click();

    cy.get('[data-testid="display"]').should("contain", 9);
  });

  it("cubes a number", () => {
    cy.contains("3").click();
    cy.contains("x³").click();

    cy.get('[data-testid="display"]').should("contain", 27);
  });

  it("deletes one digit using backspace", () => {
    cy.contains("1").click().click();
    cy.contains("3").click();

    cy.contains("⌫").click();

    cy.get('[data-testid="display"]').should("contain", 11);
  });

  it("clears the expression", () => {
    cy.contains("1").click().click();
    cy.contains("Clear").click();

    cy.get('[data-testid="display"]').should("contain", "");
  });

  it("Tests history", () => {
    cy.get('[data-testid="1"]').click();
    cy.get('[data-testid="+"]').click();
    cy.get('[data-testid="1"]').click();
    cy.get('[data-testid="="]').click();

    cy.get('[data-testid="history-item"]').should("contain", "1+1 = 2");
  });
});
