import React from "react";
import { render } from "@testing-library/react";

import Calculator from "./index";

describe("Unit Calculator", () => {
  test("renders the calculator component", () => {
    render(<Calculator conversions={[
        {title: "KGTOM", unitFrom: "KG", unitTo: "M", factor: 1.3}
    ]} />);
  });
});
