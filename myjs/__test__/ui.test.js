//#region jest setup
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");

const indexFile = fs.readFileSync(path.join("index.html"), {
  encoding: "utf-8"
});

let window;
let document;
let virtualDOM;

beforeEach(() => {
  const resourceLoader = new jsdom.ResourceLoader({
    userAgent: "jsDom"
  });

  virtualDOM = new jsdom.JSDOM(indexFile, {
    runScripts: "dangerously",
    resources: resourceLoader
  });

  window = virtualDOM.window;
  document = window.document;
});

//#endregion

const { getByLabelText, getByText } = require("@testing-library/dom");
const userEvent = require("@testing-library/user-event").default;

describe("Todo App", () => {
  test("Should render correctly", () => {
    expect(getByLabelText (document, "Search")).not.toBeNull();
    expect(getByLabelText (document, "Todo Task")).not.toBeNull();
    expect(getByLabelText (document, "Submit Task")).not.toBeNull();
    expect(getByText(document, "Reset")).not.toBeNull();
    expect(getByText(document, "Submit")).not.toBeNull();
  });


  it("Should Prompt when User Wants to Delete", () => {
    confirm = jest.fn();
    const deleteBtn = getByText(document, "Delete");

    userEvent.click(deleteBtn);

    expect(confirm).toHaveBeenCalledTimes(1);
    expect(confirm).toHaveBeenCalledWith("Are you Sure you want to Delete");
  });

  // test("It displays username when entered", () => {
  //   const usernameInput = getByLabelText(document, "Username");
  //   const usernameBtn = getByText(document, /Print Username/);

  //   userEvent.type(usernameInput, "example");
  //   userEvent.click(usernameBtn);

  //   expect(getByText(document, /Your username is example/)).not.toBeNull();
  // });
});
