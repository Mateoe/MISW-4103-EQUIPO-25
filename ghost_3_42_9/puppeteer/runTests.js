const testDeleteTag = require("./tests/deleteTag");
const testEditTag = require("./tests/editTag");
const testNewTag = require("./tests/newTag");
const testNewPost = require("./tests/newPost");
const testNewPostWithTag = require("./tests/newPostWithTag");
const testEditProfileName = require("./tests/editProfileName");
const testEditProfileLocation = require("./tests/editProfileLocation");

(async () => {
  await testNewTag();
  await testEditTag();
  await testDeleteTag();
  //await testEditProfileLocation();
  //await testEditProfileName();
  //await testNewPost();
  //await testNewPostWithTag();
  //Crear página
  //Borrar página
})();
