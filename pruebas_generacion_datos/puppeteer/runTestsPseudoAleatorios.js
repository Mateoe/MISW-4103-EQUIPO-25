const testEditProfileLocation = require("./tests/editProfileLocation");
const testEditProfileName = require("./tests/editProfileName");
const testNewPost = require("./tests/newPost");
const testNewMember = require("./tests/newMember");
const testNewTag = require("./tests/newTag");
const axios = require("axios");
const testNewTier = require("./tests/newTier");

async function getTagsMembersData() {
  const response = await axios.get(
    "https://my.api.mockaroo.com/tags_members.json?key=bf7d5d10"
  );
  return response.data;
}

async function getProfileTierPostsData() {
  const response = await axios.get(
    "https://my.api.mockaroo.com/profile_tier_posts.json?key=29d4a6a0"
  );
  return response.data;
}

const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";

(async () => {
  const dataTagsMembers = await getTagsMembersData();

  const dataProfileTierPosts = await getProfileTierPostsData();

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

  // Edit profile name tests
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre válido\n",
    url,
    "pseudo_aleatorio_edit_profile_name_success",
    dataProfileTierPosts.edit_profile_name_success
  );

  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre con espacios vacíos\n",
    url,
    "pseudo_aleatorio_edit_profile_name_blank",
    dataProfileTierPosts.edit_profile_name_blank
  );

  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre vacio\n",
    url,
    "pseudo_aleatorio_edit_profile_name_empty",
    dataProfileTierPosts.edit_profile_name_empty
  );

  // Edit profile location tests
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación válida\n",
    url,
    "pseudo_aleatorio_edit_profile_location_success",
    dataProfileTierPosts.edit_profile_location_success
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación vacía\n",
    url,
    "pseudo_aleatorio_edit_profile_location_empty",
    dataProfileTierPosts.edit_profile_location_empty
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación con error de más de 150 caracteres \n",
    url,
    "pseudo_aleatorio_edit_profile_location_error",
    dataProfileTierPosts.edit_profile_location_error
  );

  // New tier tests
  await testNewTier(
    "\nTest de crear una membresía válida\n",
    url,
    "pseudo_aleatorio_new_tier_success",
    dataProfileTierPosts.new_tier_subscription_type_success,
    dataProfileTierPosts.new_tier_price_month_success,
    dataProfileTierPosts.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre con espacios en blanco\n",
    url,
    "pseudo_aleatorio_new_tier_name_blank",
    dataProfileTierPosts.new_tier_subscription_type_blank,
    dataProfileTierPosts.new_tier_price_month_success,
    dataProfileTierPosts.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre vacío\n",
    url,
    "pseudo_aleatorio_new_tier_name_empty",
    dataProfileTierPosts.new_tier_subscription_type_empty,
    dataProfileTierPosts.new_tier_price_month_success,
    dataProfileTierPosts.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual igual a 0\n",
    url,
    "pseudo_aleatorio_new_tier_price_month_error_cero",
    dataProfileTierPosts.new_tier_subscription_type_success,
    dataProfileTierPosts.new_tier_price_month_error_cero,
    dataProfileTierPosts.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual mayor a 99,999,999 \n",
    url,
    "pseudo_aleatorio_new_tier_price_month_error_greater",
    dataProfileTierPosts.new_tier_subscription_type_success,
    dataProfileTierPosts.new_tier_price_month_error_greater,
    dataProfileTierPosts.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual igual a 0\n",
    url,
    "pseudo_aleatorio_new_tier_price_year_error_cero",
    dataProfileTierPosts.new_tier_subscription_type_success,
    dataProfileTierPosts.new_tier_price_month_success,
    dataProfileTierPosts.new_tier_price_year_error_cero
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual mayor a 99,999,999 \n",
    url,
    "pseudo_aleatorio_new_tier_price_year_error_greater",
    dataProfileTierPosts.new_tier_subscription_type_success,
    dataProfileTierPosts.new_tier_price_month_success,
    dataProfileTierPosts.new_tier_price_year_error_greater
  );

  // New post tests
  await testNewPost(
    "\nTest de crear un post válido\n",
    url,
    "pseudo_aleatorio_new_post_title_success",
    dataProfileTierPosts.new_post_title_success
  );

  await testNewPost(
    "\nTest de crear un post No válido\n",
    url,
    "pseudo_aleatorio_new_post_title_empty",
    dataProfileTierPosts.new_post_title_empty
  );
})();
