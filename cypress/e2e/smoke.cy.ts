describe("Smoke test", () => {
  it("loads the app", () => {
    cy.visit("/");
    cy.contains("Calculator");
  });
});
