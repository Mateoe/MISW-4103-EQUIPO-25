
const testNewMember = require("./tests/newMember");
const testNewTag = require("./tests/newTag");
const axios = require('axios');


async function getTagsMembersData() {
  const response = await axios.get("https://my.api.mockaroo.com/tags_members.json?key=bf7d5d10")
  return response.data
}

const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";

(async () => {
  const dataTagsMembers = await getTagsMembersData();
  
  //Tag tests
  await testNewTag(
    "\nTest de crear tag con todos los campos en blanco\n",
    url,
    "pseudo_aleatorio_tag_blank",
    dataTagsMembers.blank_tag_tag,
    dataTagsMembers.blank_tag_slug,
    dataTagsMembers.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con nombre valido y los demás campos en blanco\n",
    url,
    "pseudo_aleatorio_tag_name_success",
    dataTagsMembers.success_tag_tag,
    dataTagsMembers.blank_tag_slug,
    dataTagsMembers.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con nombre invalido y demás campos en blanco\n",
    url,
    "pseudo_aleatorio_tag_name_error",
    dataTagsMembers.error_tag_tag,
    dataTagsMembers.blank_tag_slug,
    dataTagsMembers.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con slug valido y decripción en blanco\n",
    url,
    "pseudo_aleatorio_tag_slug_success",
    dataTagsMembers.success_tag_tag,
    dataTagsMembers.success_tag_slug,
    dataTagsMembers.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con slug erroneo y decripción en blanco\n",
    url,
    "pseudo_aleatorio_tag_slug_error",
    dataTagsMembers.success_tag_tag,
    dataTagsMembers.error_tag_slug,
    dataTagsMembers.blank_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con descripción valida\n",
    url,
    "pseudo_aleatorio_tag_description_success",
    dataTagsMembers.success_tag_tag,
    dataTagsMembers.success_tag_slug,
    dataTagsMembers.success_tag_description
  );
  await testNewTag(
    "\nTest de crear tag con descripción erronea\n",
    url,
    "pseudo_aleatorio_tag_description_error",
    dataTagsMembers.success_tag_tag,
    dataTagsMembers.success_tag_slug,
    dataTagsMembers.error_tag_description
  );

  //Member tests
  await testNewMember(
    "\nTest de crear miembro con todos los campos en blanco\n",
    url,
    "pseudo_aleatorio_member_blank",
    dataTagsMembers.blank_member_name,
    dataTagsMembers.blank_member_email,
    [dataTagsMembers.blank_member_label],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email valido y demás campos en blanco\n",
    url,
    "pseudo_aleatorio_member_email_success",
    dataTagsMembers.blank_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.blank_member_label],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email invalido y demás campos en blanco\n",
    url,
    "pseudo_aleatorio_member_email_error",
    dataTagsMembers.blank_member_name,
    dataTagsMembers.invalid_member_email,
    [dataTagsMembers.blank_member_label],
    dataTagsMembers.blank_member_note
  ); 
  await testNewMember(
    "\nTest de crear miembro con email y label validos\n",
    url,
    "pseudo_aleatorio_member_label_success",
    dataTagsMembers.blank_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.valid_member_label],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email valido y label invalido\n",
    url,
    "pseudo_aleatorio_member_label_error",
    dataTagsMembers.blank_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.invalid_member_tags],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email, label y nombre validos\n",
    url,
    "pseudo_aleatorio_member_name_success",
    dataTagsMembers.valid_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.valid_member_label],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email y label validos, y nombre invalido\n",
    url,
    "pseudo_aleatorio_member_name_error",
    dataTagsMembers.invalid_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.valid_member_label],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email y nombre validos, y label invalido\n",
    url,
    "pseudo_aleatorio_member_label_issue",
    dataTagsMembers.valid_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.invalid_member_tags],
    dataTagsMembers.blank_member_note
  );
  await testNewMember(
    "\nTest de crear miembro con email, nombre, label y notas validas\n",
    url,
    "pseudo_aleatorio_member_note_success",
    dataTagsMembers.valid_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.valid_member_label],
    dataTagsMembers.valid_member_note
  );
 
  await testNewMember(
    "\nTest de crear miembro con email, nombre y label validos, y notas invalidas\n",
    url,
    "pseudo_aleatorio_member_note_error",
    dataTagsMembers.valid_member_name,
    dataTagsMembers.valid_member_email,
    [dataTagsMembers.valid_member_label],
    dataTagsMembers.invalid_membeer_note
  );
})();
