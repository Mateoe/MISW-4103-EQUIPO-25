const testNewMember = require("./tests/newMember");
const testNewTag = require("./tests/newTag");
const testEditProfileName = require("./tests/editProfileName");
const testEditProfileLocation = require("./tests/editProfileLocation");
const testNewPost = require("./tests/newPost");
const testNewTier = require("./tests/newTier");

const fs = require("fs");
const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";

function readJsonFile() {
  const filePath = "./data/priori_data.json";
  const fileData = fs.readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileData);
  const randomIndex = Math.floor(Math.random() * jsonData.length);
  const randomObject = jsonData[randomIndex];
  return randomObject;
}

const data = readJsonFile();

(async () => {
  // //Tag tests
  // await testNewTag(
  //   "\nTest de crear tag con todos los campos en blanco\n",
  //   url,
  //   "a_priori_tag_blank",
  //   data.blank_tag_tag,
  //   data.blank_tag_slug,
  //   data.blank_tag_description
  // );
  // await testNewTag(
  //   "\nTest de crear tag con nombre valido y los demás campos en blanco\n",
  //   url,
  //   "a_priori_tag_name_success",
  //   data.success_tag_tag,
  //   data.blank_tag_slug,
  //   data.blank_tag_description
  // );
  // await testNewTag(
  //   "\nTest de crear tag con nombre invalido y demás campos en blanco\n",
  //   url,
  //   "a_priori_tag_name_error",
  //   data.error_tag_tag,
  //   data.blank_tag_slug,
  //   data.blank_tag_description
  // );
  // await testNewTag(
  //   "\nTest de crear tag con slug valido y decripción en blanco\n",
  //   url,
  //   "a_priori_tag_slug_success",
  //   data.success_tag_tag,
  //   data.success_tag_slug,
  //   data.blank_tag_description
  // );
  // await testNewTag(
  //   "\nTest de crear tag con slug erroneo y decripción en blanco\n",
  //   url,
  //   "a_priori_tag_slug_error",
  //   data.success_tag_tag,
  //   data.error_tag_slug,
  //   data.blank_tag_description
  // );
  // await testNewTag(
  //   "\nTest de crear tag con descripción valida\n",
  //   url,
  //   "a_priori_tag_description_success",
  //   data.success_tag_tag,
  //   data.success_tag_slug,
  //   data.success_tag_description
  // );
  // await testNewTag(
  //   "\nTest de crear tag con descripción erronea\n",
  //   url,
  //   "a_priori_tag_description_error",
  //   data.success_tag_tag,
  //   data.success_tag_slug,
  //   data.error_tag_description
  // );

  // //Member tests
  // await testNewMember(
  //   "\nTest de crear miembro con todos los campos en blanco\n",
  //   url,
  //   "a_priori_member_blank",
  //   data.blank_member_name,
  //   data.blank_member_email,
  //   [data.blank_member_label],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email valido y demás campos en blanco\n",
  //   url,
  //   "a_priori_member_email_success",
  //   data.blank_member_name,
  //   data.valid_member_email,
  //   [data.blank_member_label],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email invalido y demás campos en blanco\n",
  //   url,
  //   "a_priori_member_email_error",
  //   data.blank_member_name,
  //   data.invalid_member_email,
  //   [data.blank_member_label],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email y label validos\n",
  //   url,
  //   "a_priori_member_label_success",
  //   data.blank_member_name,
  //   data.valid_member_email,
  //   [data.valid_member_label],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email valido y label invalido\n",
  //   url,
  //   "a_priori_member_label_error",
  //   data.blank_member_name,
  //   data.valid_member_email,
  //   [data.invalid_member_tags],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email, label y nombre validos\n",
  //   url,
  //   "a_priori_member_name_success",
  //   data.valid_member_name,
  //   data.valid_member_email,
  //   [data.valid_member_label],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email y label validos, y nombre invalido\n",
  //   url,
  //   "a_priori_member_name_error",
  //   data.invalid_member_name,
  //   data.valid_member_email,
  //   [data.valid_member_label],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email y nombre validos, y label invalido\n",
  //   url,
  //   "a_priori_member_label_issue",
  //   data.valid_member_name,
  //   data.valid_member_email,
  //   [data.invalid_member_tags],
  //   data.blank_member_note
  // );
  // await testNewMember(
  //   "\nTest de crear miembro con email, nombre, label y notas validas\n",
  //   url,
  //   "a_priori_member_note_success",
  //   data.valid_member_name,
  //   data.valid_member_email,
  //   [data.valid_member_label],
  //   data.valid_member_note
  // );

  // await testNewMember(
  //   "\nTest de crear miembro con email, nombre y label validos, y notas invalidas\n",
  //   url,
  //   "a_priori_member_note_error",
  //   data.valid_member_name,
  //   data.valid_member_email,
  //   [data.valid_member_label],
  //   data.invalid_membeer_note
  // );

  // Edit profile name tests
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre válido\n",
    url,
    "a_priori_edit_profile_name_success",
    data.edit_profile_name_success
  );

  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre con espacios vacíos\n",
    url,
    "a_priori_edit_profile_name_blank",
    data.edit_profile_name_blank
  );

  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre vacio\n",
    url,
    "a_priori_edit_profile_name_empty",
    data.edit_profile_name_empty
  );

  // Edit profile location tests
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación válida\n",
    url,
    "a_priori_edit_profile_location_success",
    data.edit_profile_location_success
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación vacía\n",
    url,
    "a_priori_edit_profile_location_empty",
    data.edit_profile_location_empty
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación con error de más de 150 caracteres \n",
    url,
    "a_priori_edit_profile_location_error",
    data.edit_profile_location_error
  );

  // New tier tests
  await testNewTier(
    "\nTest de crear una membresía válida\n",
    url,
    "a_priori_new_tier_success",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_success,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre con espacios en blanco\n",
    url,
    "a_priori_new_tier_name_blank",
    data.new_tier_subscription_type_blank,
    data.new_tier_price_month_success,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre vacío\n",
    url,
    "a_priori_new_tier_name_empty",
    data.new_tier_subscription_type_empty,
    data.new_tier_price_month_success,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual igual a 0\n",
    url,
    "a_priori_new_tier_price_month_error_cero",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_error_cero,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual mayor a 99,999,999 \n",
    url,
    "a_priori_new_tier_price_month_error_greater",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_error_greater,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual igual a 0\n",
    url,
    "a_priori_new_tier_price_year_error_cero",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_success,
    data.new_tier_price_year_error_cero
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual mayor a 99,999,999 \n",
    url,
    "a_priori_new_tier_price_year_error_greater",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_success,
    data.new_tier_price_year_error_greater
  );

  // New post tests
  await testNewPost(
    "\nTest de crear un post válido\n",
    url,
    "a_priori_new_post_title_success",
    data.new_post_title_success
  );

  await testNewPost(
    "\nTest de crear un post No válido\n",
    url,
    "a_priori_new_post_title_empty",
    data.new_post_title_empty
  );
})();
