---
layout: project
name: Fawazahmed0 Exchange Api
slug: fawazahmed0-exchange-api
category: API - Documentation
image: https://github.com/fawazahmed0/exchange-api/actions/workflows/run.yml/badge.svg
repo_url: https://github.com/fawazahmed0/exchange-api
indexed_content: 'Free Currency Exchange Rates API [](https://github.com/fawazahmed0/exchange-api/actions/workflows/run.yml)
  #### Features: - Free & Blazing Fast response - No Rate limits - 200+ Currencies,
  Including Common Cryptocurrencies & Metals - Daily Updated #### URL Structure: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}`
  #### Formats: `date` The date should either be `latest` or in `YYYY-MM-DD` format
  The Endpoints Supports HTTP GET Method and returns the data in two formats: `/{endpoint}.json`
  `/{endpoint}.min.json` #### Endpoints: - `/currencies` > Lists all the available
  currencies in prettified json format: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json
  > Get a minified version of it: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json
  - `/currencies/{currencyCode}` > Get the currency list with EUR as base currency:
  https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json
  > Get the currency list with EUR as base currency on date 2024-03-06: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json
  > Get the currency list with BTC as base currency: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.json
  > Get the currency list with BTC as base currency in minified format: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.min.json
  #### Additional Fallback URL on Cloudflare: `https://{date}.currency-api.pages.dev/{apiVersion}/{endpoint}`
  > Get the currency list with EUR as base currency: https://latest.currency-api.pages.dev/v1/currencies/eur.json
  > Get the currency list with EUR as base currency on date 2024-03-06: https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json
  **Warning:** Please include [Fallback mechanism](https://github.com/fawazahmed0/exchange-api/issues/90#issue-2168885277)
  in your code, for example if `cdn.jsdelivr.net` link fails, fetch from `currency-api.pages.dev`
  **Migrating from Previous Currency API:** [Read this](https://github.com/fawazahmed0/exchange-api/blob/main/MIGRATION.md)'
---
{% raw %}
<h1 align="center">Free Currency Exchange Rates API</h1> 

<p align="center">
  <img width="460" height="300" src="https://github.com/fawazahmed0/exchange-api/raw/main/money.jpg">
</p>

[![Publish-Currencies](https://github.com/fawazahmed0/exchange-api/actions/workflows/run.yml/badge.svg)](https://github.com/fawazahmed0/exchange-api/actions/workflows/run.yml)


#### Features:
- Free & Blazing Fast response
- No Rate limits
- 200+ Currencies, Including Common Cryptocurrencies & Metals
- Daily Updated


#### URL Structure:

`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}`

#### Formats:

`date`

The date should either be `latest` or in `YYYY-MM-DD` format <br>

The Endpoints Supports HTTP GET Method and returns the data in two formats:

`/{endpoint}.json`

`/{endpoint}.min.json`


#### Endpoints:

- `/currencies`<br>
> Lists all the available currencies in prettified json format:<br>
 https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json <br>

> Get a minified version of it:<br>
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json <br>

- `/currencies/{currencyCode}`<br>
> Get the currency list with EUR as base currency:<br>
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json <br>

> Get the currency list with EUR as base currency on date 2024-03-06:<br>
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json <br>

> Get the currency list with BTC as base currency:<br>
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.json <br>

> Get the currency list with BTC as base currency in minified format:<br>
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/btc.min.json <br>

#### Additional Fallback URL on Cloudflare: 

`https://{date}.currency-api.pages.dev/{apiVersion}/{endpoint}`

> Get the currency list with EUR as base currency:<br>
https://latest.currency-api.pages.dev/v1/currencies/eur.json

> Get the currency list with EUR as base currency on date 2024-03-06:<br>
https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json

**Warning:** Please include [Fallback mechanism](https://github.com/fawazahmed0/exchange-api/issues/90#issue-2168885277) in your code, for example if `cdn.jsdelivr.net` link fails, fetch from `currency-api.pages.dev`

**Migrating from Previous Currency API:** [Read this](https://github.com/fawazahmed0/exchange-api/blob/main/MIGRATION.md)



{% endraw %}