import { mount } from "@vue/test-utils";
import Calculator from "./Calculator.vue";

describe("Calculator", () => {
  it("adds two numbers", async () => {
    const wrapper = mount(Calculator);

    const inputs = wrapper.findAll("input");
    await inputs[0].setValue(2);
    await inputs[1].setValue(3);

    await wrapper.find("button:nth-child(1)").trigger("click");

    expect(wrapper.get('[data-testid="result"]').text()).toContain("5");
  });

  it("handles division by zero", async () => {
    const wrapper = mount(Calculator);

    const inputs = wrapper.findAll("input");
    await inputs[0].setValue(10);
    await inputs[1].setValue(0);

    await wrapper.find("button:nth-child(4)").trigger("click");

    expect(wrapper.text()).toContain("0");
  });
});
