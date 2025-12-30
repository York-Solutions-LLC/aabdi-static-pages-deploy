describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const calculate = (a, b, operator, expected) => {
    cy.get("input").eq(0).clear().type(a);
    cy.get("input").eq(1).clear().type(b);

    cy.contains(operator).click();

    cy.get('[data-testid="result"]').should("contain", expected);
  };

  it("adds two numbers", () => {
    calculate("2", "3", "+", "5");
  });

  it("subtracts two numbers", () => {
    calculate("10", "2", "-", "8");
  });

  it("divides two numbers", () => {
    calculate("10", "2", "/", "5");
  });

  it("multiplies two numbers", () => {
    calculate("20", "4", "*", "80");
  });

  it("updates result when inputs change", () => {
    calculate("2", "3", "+", "5");
  });
});
