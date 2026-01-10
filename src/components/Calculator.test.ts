import { mount } from "@vue/test-utils";
import Calculator from "./CalculatorComponent.vue";
import type { VueWrapper } from "@vue/test-utils";

describe("Calculator", () => {
  const calculate = async (wrapper: VueWrapper, expr: string) => {
    for (const ch of expr) {
      await wrapper.find(`[data-testid="${ch}"]`).trigger("click");
    }
    await wrapper.find('[data-testid="="]').trigger("click");
  };

  it("adds two numbers", async () => {
    const wrapper = mount(Calculator);
    const display = wrapper.find('[data-testid="display"]');

    await calculate(wrapper, "12+3");

    expect(display.text()).toContain("15");
  });

  it("handles division by zero", async () => {
    const wrapper = mount(Calculator);

    const display = wrapper.find('[data-testid="display"]');

    await calculate(wrapper, "12/0");

    expect(display.text()).toContain("0");
  });

  it("subtracts two numbers", async () => {
    const wrapper = mount(Calculator);
    const display = wrapper.find('[data-testid="display"]');

    await calculate(wrapper, "12-3");

    expect(display.text()).toContain("9");
  });

  it("multiplies two numbers", async () => {
    const wrapper = mount(Calculator);
    const display = wrapper.find('[data-testid="display"]');

    await calculate(wrapper, "12*3");

    expect(display.text()).toContain("36");
  });

  it("updates result when inputs change", async () => {
    const wrapper = mount(Calculator);
    const display = wrapper.find('[data-testid="display"]');

    await calculate(wrapper, "12-2");
    expect(display.text()).toContain("10");
    await wrapper.find('[data-testid="clear"]').trigger("click");

    await calculate(wrapper, "5+2");
    expect(display.text()).toContain("7");
  });
});
