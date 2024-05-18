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
const testNewPage = require("./tests/newPage");
const testDeletePage = require("./tests/deletePage");
const fs = require('fs');

const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";

function readJsonFile() {
  const filePath = './data/priori_data.json';
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(fileData);
  const randomIndex = Math.floor(Math.random() * jsonData.length);
  const randomObject = jsonData[randomIndex];
  return randomObject;
}

const data = readJsonFile();

(async () => {
  //Tag tests
  await testNewTag(
    "\nTest de crear tag con nombre valido y demás campos en blanco\n",
    url,
    "tag_name_success",
    data.success_tag,
    data.blank_slug,
    data.blank_description
  );
  await testNewTag(
    "\nTest de crear tag con nombre invalido y demás campos en blanco\n",
    url,
    "tag_name_error",
    data.error_tag,
    data.blank_slug,
    data.blank_description
  );
  await testNewTag(
    "\nTest de crear tag con slug valido y decripción en blanco\n",
    url,
    "tag_slug_success",
    data.success_tag,
    data.success_slug,
    data.blank_description
  );
  await testNewTag(
    "\nTest de crear tag con slug erroneo y decripción en blanco\n",
    url,
    "tag_slug_error",
    data.success_tag,
    data.error_slug,
    data.blank_description
  );
  await testNewTag(
    "\nTest de crear tag con descripción valida\n",
    url,
    "tag_description_success",
    data.success_tag,
    data.success_slug,
    data.success_description
  );
  await testNewTag(
    "\nTest de crear tag con descripción erronea\n",
    url,
    "tag_description_error",
    data.success_tag,
    data.success_slug,
    data.error_description
  );

  
})();
