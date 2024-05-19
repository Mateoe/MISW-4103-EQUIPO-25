
const testNewMember = require("./tests/newMember");
const testNewTag = require("./tests/newTag");
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
    "\nTest de crear tag con todos los campos en blanco\n",
    url,
    "a_priori_tag_blank",
    data.blank_tag_tag,
    data.blank_tag_slug,
    data.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con nombre valido y los demás campos en blanco\n",
    url,
    "a_priori_tag_name_success",
    data.success_tag_tag,
    data.blank_tag_slug,
    data.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con nombre invalido y demás campos en blanco\n",
    url,
    "a_priori_tag_name_error",
    data.error_tag_tag,
    data.blank_tag_slug,
    data.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con slug valido y decripción en blanco\n",
    url,
    "a_priori_tag_slug_success",
    data.success_tag_tag,
    data.success_tag_slug,
    data.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con slug erroneo y decripción en blanco\n",
    url,
    "a_priori_tag_slug_error",
    data.success_tag_tag,
    data.error_tag_slug,
    data.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con descripción valida\n",
    url,
    "a_priori_tag_description_success",
    data.success_tag_tag,
    data.success_tag_slug,
    data.success_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con descripción erronea\n",
    url,
    "a_priori_tag_description_error",
    data.success_tag_tag,
    data.success_tag_slug,
    data.error_tag_description
  );

  //Member tests
  await testNewMember(
    "\nTest de crear miembro con todos los campos en blanco\n",
    url,
    "a_priori_member_blank",
    data.blank_member_name,
    data.blank_member_email,
    [data.blank_member_label],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email valido y demás campos en blanco\n",
    url,
    "a_priori_member_email_success",
    data.blank_member_name,
    data.valid_member_email,
    [data.blank_member_label],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email invalido y demás campos en blanco\n",
    url,
    "a_priori_member_email_error",
    data.blank_member_name,
    data.invalid_member_email,
    [data.blank_member_label],
    data.blank_member_note
  ); 
  await testNewMember(
    "\nTest de crear miembro con email y label validos\n",
    url,
    "a_priori_member_label_success",
    data.blank_member_name,
    data.valid_member_email,
    [data.valid_member_label],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email valido y label invalido\n",
    url,
    "a_priori_member_label_error",
    data.blank_member_name,
    data.valid_member_email,
    [data.invalid_member_tags],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email, label y nombre validos\n",
    url,
    "a_priori_member_name_success",
    data.valid_member_name,
    data.valid_member_email,
    [data.valid_member_label],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email y label validos, y nombre invalido\n",
    url,
    "a_priori_member_name_error",
    data.invalid_member_name,
    data.valid_member_email,
    [data.valid_member_label],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email y nombre validos, y label invalido\n",
    url,
    "a_priori_member_label_issue",
    data.valid_member_name,
    data.valid_member_email,
    [data.invalid_member_tags],
    data.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email, nombre, label y notas validas\n",
    url,
    "a_priori_member_note_success",
    data.valid_member_name,
    data.valid_member_email,
    [data.valid_member_label],
    data.valid_member_note
  );
 
  await testNewMember(
    "\nTest de crear miembro con email, nombre y label validos, y notas invalidas\n",
    url,
    "a_priori_member_note_error",
    data.valid_member_name,
    data.valid_member_email,
    [data.valid_member_label],
    data.invalid_membeer_note
  );

  
})();
