const testVRTEditProfileName = require("./tests/testVRTEditProfileName");
const testVRTNewPost = require("./tests/testVRTNewPost");
const testVRTNewPostWithTag = require("./tests/testVRTNewPostWithTag");

(async () => {
  await testVRTNewPost();
  await testVRTNewPostWithTag();
  await testVRTEditProfileName();
})();
