// jest.setup.js
import '@testing-library/jest-dom'

if (!window.matchMedia) {
  window.matchMedia = function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {}, // deprecated
      removeListener: function () {}, // deprecated
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () { return false; },
    };
  };
}

jest.mock("next/router", () => ({
  // Simulasi hook useRouter (bisa lebih kompleks kalau perlu)
  useRouter() {
    return {
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
      beforePopState: jest.fn(),
      isFallback: false,
    };
  },
}));
