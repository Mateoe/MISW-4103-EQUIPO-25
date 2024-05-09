const testDeleteMember = require("./tests/deleteMember");
const testDeleteTag = require("./tests/deleteTag");
const testEditTag = require("./tests/editTag");
const testNewMember = require("./tests/newMember");
const testNewTag = require("./tests/newTag");
const testNewTier = require("./tests/newTier");
const testNewPost = require("./tests/newPost");
const testNewPremiumPost = require("./tests/newPremiumPost");
const testNewPostWithTag = require("./tests/newPostWithTag");
const testNewOffer = require("./tests/newOffer");
const testEditProfileName = require("./tests/editProfileName");
const testEditProfileLocation = require("./tests/editProfileLocation");

(async () => {
  // await testDeleteTag();
  await testEditProfileLocation();
  await testEditProfileName();
  // await testEditTag();
  await testNewPost();
  await testNewPostWithTag();
  // await testNewTag();
  // //Crear página
  // //Borrar página
  // await testNewMember();
  // await testDeleteMember();
  // await testNewTier();
  // await testNewPremiumPost();
  // await testNewOffer();
})();
