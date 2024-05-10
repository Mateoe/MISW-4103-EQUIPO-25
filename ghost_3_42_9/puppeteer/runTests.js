const testDeleteTag = require("./tests/deleteTag");
const testEditTag = require("./tests/editTag");
const testNewTag = require("./tests/newTag");
const testNewPost = require("./tests/newPost");
const testNewPostWithTag = require("./tests/newPostWithTag");
const testEditProfileName = require("./tests/editProfileName");
const testEditProfileLocation = require("./tests/editProfileLocation");
const testNewPage = require("./tests/newPage");
const testDeletePage = require("./tests/deletePage");

(async () => {
  await testNewPage()
  await testDeletePage()
  await testNewTag();
  await testEditTag();
  await testDeleteTag();
  await testEditProfileLocation();
  await testEditProfileName();
  await testNewPost();
  await testNewPostWithTag();
})();
