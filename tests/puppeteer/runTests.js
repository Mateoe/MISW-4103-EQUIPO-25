const testDeleteMember = require("./tests/deleteMember");
const testDeleteTag = require("./tests/deleteTag");
const testEditTag = require("./tests/editTag");
const testNewMember = require("./tests/newMember");
const testNewTag = require("./tests/newTag");

(async () => {
  //await testNewTag();
  //await testEditTag();
  //await testDeleteTag();
  await testNewMember();
  await testDeleteMember();
})();