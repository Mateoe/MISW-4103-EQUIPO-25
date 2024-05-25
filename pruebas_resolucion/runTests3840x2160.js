const testEditProfileLocation = require("./tests/editProfileLocation");
const testEditProfileName = require("./tests/editProfileName");
const testNewMember = require("./tests/newMember");
const testNewPost = require("./tests/newPost");
const testNewTag = require("./tests/newTag");
const testNewTier = require("./tests/newTier");
const faker = require("faker");

const url = "https://ghost-b3tr.onrender.com/ghost/#/signin";
const width = 3840;
const height = 2160;

(async () => {
  // Edit profile name tests
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre válido\n",
    url,
    "aleatorio_edit_profile_name_success",
    faker.name.findName(),
    width, 
    height
  );
   await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre con espacios vacíos\n",
    url,
    "aleatorio_edit_profile_name_blank",
    "   ",
    width, 
    height
  );
  await testEditProfileName(
    "\nTest de editar el nombre del perfil con nombre vacio\n",
    url,
    "aleatorio_edit_profile_name_empty",
    "",
    width, 
    height
  );
  // Edit profile location tests
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación válida\n",
    url,
    "aleatorio_edit_profile_location_success",
    faker.address.city(),
    width, 
    height
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación vacía\n",
    url,
    "aleatorio_edit_profile_location_empty",
    "",
    width, 
    height
  );
  await testEditProfileLocation(
    "\nTest de editar la ubicación del perfil con ubicación con error de más de 150 caracteres \n",
    url,
    "aleatorio_edit_profile_location_error",
    faker.lorem.slug(40),
    width, 
    height
  );

  // New tier tests
  await testNewTier(
    "\nTest de crear una membresía válida\n",
    url,
    "aleatorio_new_tier_success",
    faker.commerce.product(),
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 50, max: 80 }),
    width, 
    height
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre con espacios en blanco\n",
    url,
    "aleatorio_new_tier_name_blank",
    "    ",
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 50, max: 80 }),
    width, 
    height
  );
  await testNewTier(
    "\nTest de crear una membresía con nombre vacío\n",
    url,
    "aleatorio_new_tier_name_empty",
    "",
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 50, max: 80 }),
    width, 
    height
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual igual a 0\n",
    url,
    "aleatorio_new_tier_price_month_error_cero",
    faker.commerce.product(),
    faker.datatype.number({ min: 0, max: 0 }),
    faker.datatype.number({ min: 50, max: 80 }),
    width, 
    height
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Mensual mayor a 99,999,999 \n",
    url,
    "aleatorio_new_tier_price_month_error_greater",
    faker.commerce.product(),
    faker.datatype.number({
      min: 100000000,
      max: 999999999,
    }),
    faker.datatype.number({ min: 50, max: 80 }),
    width, 
    height
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual igual a 0\n",
    url,
    "aleatorio_new_tier_price_year_error_cero",
    faker.commerce.product(),
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({ min: 0, max: 0 }),
    width, 
    height
  );
  await testNewTier(
    "\nTest de crear una membresía con precio Anual mayor a 99,999,999 \n",
    url,
    "aleatorio_new_tier_price_year_error_greater",
    faker.commerce.product(),
    faker.datatype.number({ min: 5, max: 10 }),
    faker.datatype.number({
      min: 100000000,
      max: 999999999,
    }),
    width, 
    height
  );

  // New post tests
  await testNewPost(
    "\nTest de crear un post válido\n",
    url,
    "aleatorio_new_post_title_success",
    faker.name.title(),
    width, 
    height
  );

  await testNewPost(
    "\nTest de crear un post No válido\n",
    url,
    "aleatorio_new_post_title_empty",
    "",
    width, 
    height
  );

  //Tag tests
  await testNewTag(
    "\nTest de crear tag con todos los campos en blanco\n",
    url,
    "aleatorio_tag_blank",
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewTag(
    "\nTest de crear tag con nombre valido y los demás campos en blanco\n",
    url,
    "aleatorio_tag_name_success",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewTag(
    "\nTest de crear tag con nombre invalido y demás campos en blanco\n",
    url,
    "aleatorio_tag_name_error",
    faker.random.alphaNumeric(faker.datatype.number({ min: 192, max: 200 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewTag(
    "\nTest de crear tag con slug valido y decripción en blanco\n",
    url,
    "aleatorio_tag_slug_success",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewTag(
    "\nTest de crear tag con slug erroneo y decripción en blanco\n",
    url,
    "aleatorio_tag_slug_error",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 192, max: 200 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewTag(
    "\nTest de crear tag con descripción valida\n",
    url,
    "aleatorio_tag_description_success",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewTag(
    "\nTest de crear tag con descripción erronea\n",
    url,
    "aleatorio_tag_description_error",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 501, max: 600 })),
    width, 
    height
  );

  //Member tests
  await testNewMember(
    "\nTest de crear miembro con todos los campos en blanco\n",
    url,
    "aleatorio_member_blank",
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    [" ".repeat(faker.datatype.number({ min: 1, max: 191 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email valido y demás campos en blanco\n",
    url,
    "aleatorio_member_email_success",
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [" ".repeat(faker.datatype.number({ min: 1, max: 191 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email invalido y demás campos en blanco\n",
    url,
    "aleatorio_member_email_error",
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    [" ".repeat(faker.datatype.number({ min: 1, max: 191 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email y label validos\n",
    url,
    "aleatorio_member_label_success",
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email valido y label invalido\n",
    url,
    "aleatorio_member_label_error",
    " ".repeat(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 192, max: 200 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email, label y nombre validos\n",
    url,
    "aleatorio_member_name_success",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email y label validos, y nombre invalido\n",
    url,
    "aleatorio_member_name_error",
    faker.random.alphaNumeric(faker.datatype.number({ min: 192, max: 200 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email y nombre validos, y label invalido\n",
    url,
    "aleatorio_member_label_issue",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 192, max: 200 }))],
    " ".repeat(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email, nombre, label y notas validas\n",
    url,
    "aleatorio_member_note_success",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 }))],
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 500 })),
    width, 
    height
  );
  await testNewMember(
    "\nTest de crear miembro con email, nombre y label validos, y notas invalidas\n",
    url,
    "aleatorio_member_note_error",
    faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 })),
    faker.internet.email(),
    [faker.random.alphaNumeric(faker.datatype.number({ min: 1, max: 191 }))],
    faker.random.alphaNumeric(faker.datatype.number({ min: 500, max: 600 })),
    width, 
    height
  ); 
})();
