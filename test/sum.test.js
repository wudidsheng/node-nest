const { add } = require("../src/untils/sum");
describe("jest until 测试", () => {
  it("add function test", () => {
    expect(add(1, 2)).toEqual(3);
  });
});
