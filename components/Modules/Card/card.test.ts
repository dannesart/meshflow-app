import { mount } from "@vue/test-utils";
import { CardMock, CardErrorMock } from "./card.mock";
import Card from "./Index.vue";

describe("Card", () => {
  it("Should render a card component if provided with title and body", () => {
    const component = mount(Card, {
      props: CardMock,
    });

    expect(component.find("[data-title]").text()).toContain(CardMock.title);
    expect(component.find("[data-body]").text()).toContain(CardMock.body);
  });

  it("Should be incorrect due to missing properties", () => {
    const component = mount(Card, {
      props: CardErrorMock,
    });

    expect(component.find("[data-title]").text()).not.toContain(CardMock.title);
    expect(component.find("[data-body]").text()).toContain(CardMock.body);
  });
});
