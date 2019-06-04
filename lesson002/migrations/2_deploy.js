const Lesson = artifacts.require("./Lesson.sol");

module.exports = (deployer) => {
  deployer.deploy(Lesson, "this is lesson002");
}