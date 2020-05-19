import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import { shallow } from "enzyme";
import HomePage from "../components/HomePage";

test("Testing HomePage to render correctly", () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<HomePage />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
