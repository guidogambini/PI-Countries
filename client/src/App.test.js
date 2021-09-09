import React from "react";
import { configure, mount } from "enzyme";
/* import Adapter from "enzyme-adapter-react-16"; */
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { App } from "./App";
import Home from "../src/components/Home/Home";
import Form from "../src/components/Form/Form";
import LandingPage from "./components/LandingPage/LandingPage";



describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('El componente Home debe renderizar en "/home".', () => {
    it('Debería renderizarse en la ruta "/home"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(1);
    });
    it('No debería renderizarse en la ruta "/otraRuta"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/otraRuta"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Home)).toHaveLength(0);
    });
  });

  it('El componente Form debe renderizar en la ruta "/activity"', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/activity"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Home)).toHaveLength(0);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(LandingPage)).toHaveLength(0);
  });

  it("El componente LandingPage debe renderizar solo en la ruta '/'.", () => {
    const container = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(container.find(LandingPage)).toHaveLength(1);
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(Form)).toHaveLength(0);
  });

  it('No debería renderizarse en la ruta "/Ruta"', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/Ruta"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(0);
  });
});