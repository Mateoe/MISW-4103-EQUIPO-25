const testEditProfileLocation = require("./tests/editProfileLocation");
const testEditProfileName = require("./tests/editProfileName");
const testNewPost = require("./tests/newPost");
const testNewTier = require("./tests/newTier");
const faker = require("faker");

// const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";
const url = "http://localhost:2368/ghost/#/signin";

const data = {
  edit_profile_name_success: faker.name.findName(),
  edit_profile_name_blank: "   ",
  edit_profile_name_error: "",
  edit_profile_location_success: faker.address.city(),
  edit_profile_location_blank: "",
  edit_profile_location_error: faker.lorem.slug(40),
  new_tier_subscription_type_success: faker.commerce.product(),
  new_tier_subscription_type_blank: "    ",
  new_tier_subscription_type_empty: "",
  new_tier_price_month_success: faker.datatype.number({ min: 5, max: 10 }),
  new_tier_price_month_error_cero: faker.datatype.number({ min: 0, max: 0 }),
  new_tier_price_month_error_greater: faker.datatype.number({
    min: 100000000,
    max: 999999999,
  }),
  new_tier_price_year_success: faker.datatype.number({ min: 50, max: 80 }),
  new_tier_price_year_error_cero: faker.datatype.number({ min: 0, max: 0 }),
  new_tier_price_year_error_greater: faker.datatype.number({
    min: 100000000,
    max: 999999999,
  }),
  new_post_title_success: faker.name.title(),
  new_post_title_error: "",
};

(async () => {
  // Edit profile name tests
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre válido\n",
    url,
    "aleatorios_edit_profile_name_success",
    data.profile_name_success
  );
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre con espacios vacíos\n",
    url,
    "aleatorios_edit_profile_name_blank",
    data.edit_profile_name_blank
  );
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre vacio\n",
    url,
    "aleatorios_edit_profile_name_error",
    data.edit_profile_name_error
  );

  // Edit profile location tests
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación válida\n",
    url,
    "aleatorios_edit_profile_location_success",
    data.edit_profile_location_success
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación vacía\n",
    url,
    "aleatorios_edit_profile_location_blank",
    data.edit_profile_location_blank
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación con error de más de 150 caracteres \n",
    url,
    "aleatorios_edit_profile_location_error",
    data.edit_profile_location_error
  );

  // New tier tests
  await testNewTier(
    "\nTest de crear una membresía válida\n",
    url,
    "aleatorios_new_tier_success",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_success,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre con espacios en blanco\n",
    url,
    "aleatorios_new_tier_name_blank",
    data.new_tier_subscription_type_blank,
    data.new_tier_price_month_success,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre vacío\n",
    url,
    "aleatorios_new_tier_name_empty",
    data.new_tier_subscription_type_empty,
    data.new_tier_price_month_success,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual igual a 0\n",
    url,
    "aleatorios_new_tier_price_month_error_cero",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_error_cero,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual mayor a 99,999,999 \n",
    url,
    "aleatorios_new_tier_price_month_error_greater",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_error_greater,
    data.new_tier_price_year_success
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual igual a 0\n",
    url,
    "aleatorios_new_tier_price_year_error_cero",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_success,
    data.new_tier_price_year_error_cero
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual mayor a 99,999,999 \n",
    url,
    "aleatorios_new_tier_price_year_error_greater",
    data.new_tier_subscription_type_success,
    data.new_tier_price_month_success,
    data.new_tier_price_year_error_greater
  );

  // New post tests
  await testNewPost(
    "\nTest de crear un post válido\n",
    url,
    "aleatorios_new_post_title_success",
    data.new_post_title_success
  );

  await testNewPost(
    "\nTest de crear un post No válido\n",
    url,
    "aleatorios_new_post_title_error",
    data.new_post_title_error
  );
})();
