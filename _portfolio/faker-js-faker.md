---
layout: project
name: Faker Js Faker
slug: faker-js-faker
category: Uncategorized
image: https://badgen.net/npm/v/@faker-js/faker
repo_url: https://github.com/faker-js/faker
indexed_content: "Faker Generate massive amounts of fake (but realistic) data for
  testing and development. [](https://www.npmjs.com/package/@faker-js/faker) [](https://www.npmjs.com/package/@faker-js/faker)
  [](https://github.com/faker-js/faker/actions/workflows/ci.yml) [](https://codecov.io/gh/faker-js/faker)
  [](https://chat.fakerjs.dev) [](https://opencollective.com/fakerjs#section-contributors)
  [](https://opencollective.com/fakerjs) ## ⚡️ Try it Online [Open in StackBlitz](https://fakerjs.dev/new)
  ## \U0001F4D9 API Documentation ⚠️ You are reading the docs for the next branch
  ⚠️ Please proceed to the [Getting Started Guide](https://fakerjs.dev/guide/) for
  the **stable** release of Faker. For detailed API documentation, please select the
  version of the documentation you are looking for. | Version | Website | | :----------:
  | :------------------------ | | v10 (next) | https://next.fakerjs.dev/ | | v10 (stable)
  | https://fakerjs.dev/ | | v9 (old) | https://v9.fakerjs.dev/ | --- ## \U0001F680
  Features - \U0001F9CD Person - Generate Names, Genders, Bios, Job titles, and more.
  - \U0001F4CD Location - Generate Addresses, Zip Codes, Street Names, States, and
  Countries! - ⏰ Date - Past, present, future, recent, soon... whenever! - \U0001F4B8
  Finance - Create stubbed out Account Details, Transactions, and Crypto Addresses.
  - \U0001F460 Commerce - Generate Prices, Product Names, Adjectives, and Descriptions.
  - \U0001F47E Hacker - “Try to reboot the SQL bus, maybe it will bypass the virtual
  application!” - \U0001F522 Number and String - Of course, we can also generate random
  numbers and strings. - \U0001F30F Localization - Pick from over 70 locales to generate
  realistic looking Names, Addresses, and Phone Numbers. > **Note**: Faker tries to
  generate realistic data and not obvious fake data. > The generated names, addresses,
  emails, phone numbers, and/or other data might be coincidentally valid information.
  > Please do not send any of your messages/calls to them from your test setup. ##
  \U0001F4E6 Install ```bash npm install --save-dev @faker-js/faker ``` ## \U0001FA84
  Usage ```ts // ESM import { faker } from '@faker-js/faker'; // CJS const { faker
  } = require('@faker-js/faker'); export function createRandomUser() { return { userId:
  faker.string.uuid(), username: faker.internet.username(), email: faker.internet.email(),
  avatar: faker.image.avatar(), password: faker.internet.password(), birthdate: faker.date.birthdate(),
  registeredAt: faker.date.past(), }; } export const users = faker.helpers.multiple(createRandomUser,
  { count: 5, }); ``` ## \U0001F48E Modules An in-depth overview of the API methods
  is available in the documentation for [v10 (stable)](https://fakerjs.dev/api/) and
  [v10.\\* (next)](https://next.fakerjs.dev/api/). ### Templates Faker contains a
  generator method `faker.helpers.fake` for combining faker API methods using a mustache
  string format. ```ts console.log( faker.helpers.fake( 'Hello {{person.prefix}} {{person.lastName}},
  how are you today?' ) ); ``` ## \U0001F30F Localization Faker has support for multiple
  locales. The main `faker` instance uses the English locale. But you can also import
  instances using other locales. ```ts // ESM import { fakerDE as faker } from '@faker-js/faker';
  // CJS const { fakerDE: faker } = require('@faker-js/faker'); ``` See our documentation
  for a list of [provided languages](https://fakerjs.dev/guide/localization.html#available-locales).
  Please note: Not every locale provides data for every module. In our pre-made faker
  instances, we fall back to English in such a case as this is the most complete and
  most commonly used language. If you don't want that or prefer a different fallback,
  you can also build your own instances. ```ts import { de, de_CH, Faker } from '@faker-js/faker';
  export const faker = new Faker({ locale: [de_CH, de], }); ``` ## ⚙️ Setting a randomness
  seed If you want consistent results, you can set your own seed. If you are using
  `faker.date` methods, there are additional considerations. See [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results).
  ```ts faker.seed(123); const firstRandom = faker.number.int(); // Setting the seed
  again resets the sequence. faker.seed(123); const secondRandom = faker.number.int();
  console.log(firstRandom === secondRandom); ``` ## \U0001F91D Sponsors Faker is an
  MIT-licensed open source project with its ongoing development made possible entirely
  by the support of these awesome backers ### Sponsors ### Backers ## ✨ Contributing
  Please make sure to read the [Contributing Guide](https://github.com/faker-js/faker/blob/next/CONTRIBUTING.md)
  before making a pull request. ## \U0001F4D8 Credits Thanks to all the people who
  already contributed to Faker! The [fakerjs.dev](https://fakerjs.dev) website is
  generously hosted by [Netlify](https://www.netlify.com/), with search functionality
  powered by [Algolia](https://www.algolia.com/). ## \U0001F4DD Changelog Detailed
  changes for each release are documented in the [release notes](https://github.com/faker-js/faker/blob/next/CHANGELOG.md).
  ## \U0001F4DC What happened to the original faker.js? Read the [team update](https://fakerjs"
---
{% raw %}
<div align="center">
  <img src="https://raw.githubusercontent.com/dirm02/mystars/master/starred-readmes/faker-js-faker/docs/public/logo.svg" width="200"/>
  <h1>Faker</h1>
  <p>Generate massive amounts of fake (but realistic) data for testing and development.</p>
  
  [![npm version](https://badgen.net/npm/v/@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker)
  [![npm downloads](https://badgen.net/npm/dm/@faker-js/faker)](https://www.npmjs.com/package/@faker-js/faker)
  [![Continuous Integration](https://github.com/faker-js/faker/actions/workflows/ci.yml/badge.svg)](https://github.com/faker-js/faker/actions/workflows/ci.yml)
  [![codecov](https://codecov.io/gh/faker-js/faker/branch/next/graph/badge.svg?token=N61U168G08)](https://codecov.io/gh/faker-js/faker)
  [![Chat on Discord](https://img.shields.io/badge/chat-discord-blue?style=flat&logo=discord)](https://chat.fakerjs.dev)
  [![Open Collective](https://img.shields.io/opencollective/backers/fakerjs)](https://opencollective.com/fakerjs#section-contributors)
  [![sponsor](https://img.shields.io/opencollective/all/fakerjs?label=sponsors)](https://opencollective.com/fakerjs)
</div>

## ⚡️ Try it Online

[Open in StackBlitz](https://fakerjs.dev/new)

## 📙 API Documentation

<h1>⚠️ You are reading the docs for the <a href="https://github.com/faker-js/faker/tree/next">next</a> branch ⚠️</h1>

Please proceed to the [Getting Started Guide](https://fakerjs.dev/guide/) for the **stable** release of Faker.

For detailed API documentation, please select the version of the documentation you are looking for.

|   Version    | Website                   |
| :----------: | :------------------------ |
|  v10 (next)  | https://next.fakerjs.dev/ |
| v10 (stable) | https://fakerjs.dev/      |
|   v9 (old)   | https://v9.fakerjs.dev/   |

---

## 🚀 Features

- 🧍 Person - Generate Names, Genders, Bios, Job titles, and more.
- 📍 Location - Generate Addresses, Zip Codes, Street Names, States, and Countries!
- ⏰ Date - Past, present, future, recent, soon... whenever!
- 💸 Finance - Create stubbed out Account Details, Transactions, and Crypto Addresses.
- 👠 Commerce - Generate Prices, Product Names, Adjectives, and Descriptions.
- 👾 Hacker - “Try to reboot the SQL bus, maybe it will bypass the virtual application!”
- 🔢 Number and String - Of course, we can also generate random numbers and strings.
- 🌏 Localization - Pick from over 70 locales to generate realistic looking Names, Addresses, and Phone Numbers.

> **Note**: Faker tries to generate realistic data and not obvious fake data.
> The generated names, addresses, emails, phone numbers, and/or other data might be coincidentally valid information.
> Please do not send any of your messages/calls to them from your test setup.

## 📦 Install

```bash
npm install --save-dev @faker-js/faker
```

## 🪄 Usage

```ts
// ESM
import { faker } from '@faker-js/faker';

// CJS
const { faker } = require('@faker-js/faker');

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
```

## 💎 Modules

An in-depth overview of the API methods is available in the documentation for [v10 (stable)](https://fakerjs.dev/api/) and [v10.\* (next)](https://next.fakerjs.dev/api/).

### Templates

Faker contains a generator method `faker.helpers.fake` for combining faker API methods using a mustache string format.

```ts
console.log(
  faker.helpers.fake(
    'Hello {{person.prefix}} {{person.lastName}}, how are you today?'
  )
);
```

## 🌏 Localization

Faker has support for multiple locales.

The main `faker` instance uses the English locale.
But you can also import instances using other locales.

```ts
// ESM
import { fakerDE as faker } from '@faker-js/faker';

// CJS
const { fakerDE: faker } = require('@faker-js/faker');
```

See our documentation for a list of [provided languages](https://fakerjs.dev/guide/localization.html#available-locales).

Please note: Not every locale provides data for every module. In our pre-made faker instances,
we fall back to English in such a case as this is the most complete and most commonly used language.
If you don't want that or prefer a different fallback, you can also build your own instances.

```ts
import { de, de_CH, Faker } from '@faker-js/faker';

export const faker = new Faker({
  locale: [de_CH, de],
});
```

## ⚙️ Setting a randomness seed

If you want consistent results, you can set your own seed. If you are using `faker.date` methods, there are additional considerations. See [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results).

```ts
faker.seed(123);

const firstRandom = faker.number.int();

// Setting the seed again resets the sequence.
faker.seed(123);

const secondRandom = faker.number.int();

console.log(firstRandom === secondRandom);
```

## 🤝 Sponsors

Faker is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome backers

### Sponsors

![](https://opencollective.com/fakerjs/organizations.svg)

### Backers

![](https://opencollective.com/fakerjs/individuals.svg)

## ✨ Contributing

Please make sure to read the [Contributing Guide](https://github.com/faker-js/faker/blob/next/CONTRIBUTING.md) before making a pull request.

## 📘 Credits

Thanks to all the people who already contributed to Faker!

<a href="https://github.com/faker-js/faker/graphs/contributors"><img src="https://opencollective.com/fakerjs/contributors.svg?width=800" /></a>

The [fakerjs.dev](https://fakerjs.dev) website is generously hosted by [Netlify](https://www.netlify.com/), with search functionality powered by [Algolia](https://www.algolia.com/).

## 📝 Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/faker-js/faker/blob/next/CHANGELOG.md).

## 📜 What happened to the original faker.js?

Read the [team update](https://fakerjs.dev/update.html) (January 14th, 2022).

## 🔑 License

[MIT](https://github.com/faker-js/faker/blob/next/LICENSE)

{% endraw %}