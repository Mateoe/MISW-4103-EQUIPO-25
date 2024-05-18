const testEditProfileLocation = require("./tests/editProfileLocation");
const testEditProfileName = require("./tests/editProfileName");
const testNewPost = require("./tests/newPost");
const testNewTier = require("./tests/newTier");
const faker = require("faker");

// const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";
const url = "http://localhost:2368/ghost/#/signin";

(async () => {
  // Edit profile name tests
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre válido\n",
    url,
    "aleatorios_edit_profile_name_success",
    faker.name.findName()
  );
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre con espacios vacíos\n",
    url,
    "aleatorios_edit_profile_name_blank",
    "   "
  );
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre vacio\n",
    url,
    "aleatorios_edit_profile_name_error",
    ""
  );

  // Edit profile location tests
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación válida\n",
    url,
    "aleatorios_edit_profile_location_success",
    faker.address.city()
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación vacía\n",
    url,
    "aleatorios_edit_profile_location_blank",
    ""
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación con error de más de 150 caracteres \n",
    url,
    "aleatorios_edit_profile_location_error",
    faker.lorem.slug(40)
  );

  // New tier tests
  await testNewTier(
    "\nTest de crear una membresía válida\n",
    url,
    "aleatorios_new_tier_success",
    faker.commerce.product(),
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 50, max: 80 })
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre con espacios en blanco\n",
    url,
    "aleatorios_new_tier_name_blank",
    "    ",
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 50, max: 80 })
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre vacío\n",
    url,
    "aleatorios_new_tier_name_empty",
    "",
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 50, max: 80 })
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual igual a 0\n",
    url,
    "aleatorios_new_tier_price_month_error_cero",
    faker.commerce.product(),
    faker.datatype.number({ min: 0, max: 0 }),
    faker.datatype.number({ min: 50, max: 80 })
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual mayor a 99,999,999 \n",
    url,
    "aleatorios_new_tier_price_month_error_greater",
    faker.commerce.product(),
    faker.datatype.number({
      min: 100000000,
      max: 999999999,
    }),
    faker.datatype.number({ min: 50, max: 80 })
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual igual a 0\n",
    url,
    "aleatorios_new_tier_price_year_error_cero",
    faker.commerce.product(),
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 0, max: 0 })
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual mayor a 99,999,999 \n",
    url,
    "aleatorios_new_tier_price_year_error_greater",
    faker.commerce.product(),
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({
      min: 100000000,
      max: 999999999,
    })
  );

  // New post tests
  await testNewPost(
    "\nTest de crear un post válido\n",
    url,
    "aleatorios_new_post_title_success",
    faker.name.title()
  );

  await testNewPost(
    "\nTest de crear un post No válido\n",
    url,
    "aleatorios_new_post_title_error",
    ""
  );
})();
