import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createActivity } from "../actions";
import configureStore from "redux-mock-store";
import FormDefault from "../components/Form/Form";
import Form from "../components/Form/Form";
import thunk from 'redux-thunk';


configure({ adapter: new Adapter() });

describe("<Form />", () => {
  describe("Estructura", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Form />);
    });
    it("Renderiza un <form>", () => {
      expect(wrapper.find("form")).toHaveLength(1);
    });

    it('Renderiza un label con el texto igual a "Estimated duration in hours"', () => {
      
      expect(wrapper.find("label").at(0).text()).toEqual("Estimated duration in hours");
    });

    it('Renderiza un input con la propiedad "name" igual a "name"', () => {
      expect(wrapper.find('input[name="name"]')).toHaveLength(1);
    });

    it('Renderiza otro input con la propiedad "name" igual a "difficulty"', () => {
      expect(wrapper.find('input[name="difficulty"]')).toHaveLength(1);
    });

    it('Renderiza un select con la propiedad "name" igual a "duration"', () => {
      
    expect(wrapper.find('select[name="duration"]')).toHaveLength(1);

    });

    it('Renderiza otro select con la propiedad "name" igual a "country"', () => {
      
        expect(wrapper.find('select[name="country"]')).toHaveLength(1);
    
        });

    it('Renderiza un boton con el "type" "submit"', () => {
      expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
    });

  });

  describe("Manejo de inputs con estado", () => {
    let wrapper, useState, useStateSpy;
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init) => [init, useState]);
      wrapper = shallow(<Form />);
    });

    describe("Name input", () => {
      it("El form deberia cambiar de estado cuando escriban en el input de name", () => {
    
        wrapper
          .find('input[name="name"]')
          .simulate("change", {
            target: { name: "name", value: "New activity example" },
          });
        expect(useState).toHaveBeenCalledWith({
          name: "New activity example",
          difficulty: "",
          duration: "",
          season: "",
          country: []
        });
      });
    });

    describe("difficulty input", () => {
      it('deberia cambiar de estado cuando escriban en el input de "difficulty"', () => {
        
        wrapper
          .find('input[name="difficulty"]')
          .simulate("change", {
            target: { name: "difficulty", value: "5" },
          });
        expect(useState).toHaveBeenCalledWith({
            name: "New activity example",
            difficulty: "5",
            duration: "",
            season: "",
            country: []
        });
      });
    });

    describe("Duration select", () => {
      it('deberia cambiar de estado cuando seleccionan una "duration"', () => {
        wrapper
          .find('select[name="duration"]')
          .simulate("change", { target: { name: "duration", value: "3hs" } });
        expect(useState).toHaveBeenCalledWith({
            name: "New activity example",
            difficulty: "5",
            duration: "3hs",
            season: "",
            country: []
        });
      });
    });

    describe("Summer input", () => {
        it('deberia cambiar de estado cuando seleccionan una "season"', () => {
          wrapper
            .find('input[name="summer"]')
            .simulate("change", { target: { name: "season", value: "summer" } });
          expect(useState).toHaveBeenCalledWith({
              name: "New activity example",
              difficulty: "5",
              duration: "3hs",
              season: "summer",
              country: []
          });
        });
      });

    describe("Country select", () => {
      it('deberia cambiar de estado cuando seleccionan un nuevo "country"', () => {
        wrapper
          .find('select[name="country"]')
          .simulate("change", { target: { name: "country", value: "Argentina" } });
        expect(useState).toHaveBeenCalledWith({
            name: "New activity example",
            difficulty: "5",
            duration: "3hs",
            season: "summer",
            country: ["Argentina"]
        });
      });
    });
  });

  describe("Dispatch to store", () => {
    var wrapper;
    let store;
    const middlewares = [thunk];
    beforeEach(() => {
      const mockStore = configureStore(middlewares);
      store = mockStore([], createActivity);
      store.clearActions();
      wrapper = mount(<FormDefault store={store} />);
    });

    it('deberia hacer un dispatch al store de la action "createActivity" con los datos del local state cuando se hace un Submit', () => {
      wrapper = mount(<FormDefault store={store} />);
      wrapper
        .find('input[name="name"]')
        .simulate("change", { target: { name: "name", value: "Boxing" }})
        .find('input[name="difficulty"]')
        .simulate("change", { target: { name: "difficulty", value: "5" }})
        .find('select[name="duration"]')
        .simulate("change", { target: { name: "duration", value: "3hs" } })
        .find('input[name="season"]')
        .simulate("change", { target: { name: "season", value: "summer" } })
        .find('select[name="country"]')
        .simulate("change", { target: { name: "country", value: "Argentina" } })
        .find('[type="submit"]')
        .simulate("submit", { preventDefault() {} });
      const expectedAction = [
        {
          payload: {
            name: "Boxing",
            difficulty: "5",
            duration: "3hs",
            season: "summer",
            country: ["Argentina"]
          },
          type: 'CREATE_ACTIVITY',
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
    });

    it("deberia llamar al evento `preventDefault()` para evitar que se refresque la pagina al hacer un submit", () => {
      wrapper = mount(<FormDefault store={store} />);
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      wrapper.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});