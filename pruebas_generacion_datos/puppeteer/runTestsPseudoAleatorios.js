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

function readJsonFile() { 
  const filePath = './data/priori_data.json'; 
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(fileData); 
  const randomIndex = Math.floor(Math.random() * jsonData.length); 
  const randomObject = jsonData[randomIndex]; 
  return randomObject; }

const randomObject = readJsonFile(); console.log(randomObject);


/* (async () => {
  await testNewTag();
})();
 */