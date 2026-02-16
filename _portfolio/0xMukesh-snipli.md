---
layout: project
name: 0xmukesh Snipli
slug: 0xMukesh-snipli
category: CLI TOOLS
image: https://user-images.githubusercontent.com/90365542/166135580-7483919c-c44e-45be-bdf0-3b259292f341.png
repo_url: https://github.com/dirm02/mystars/tree/master/starred-readmes/0xMukesh-snipli
indexed_content: "# \U0001F984 snipli ✨ A command-line interface for quickly sharing
  code snippets for your local files - [Usage](#usage) - [Commands](#commands) # Usage
  ```bash $ npm install -g snipli $ snipli COMMAND Running command... $ snipli (--version)
  snipli/1.0.0 win32-x64 node-v16.13.0 $ snipli --help [COMMAND] USAGE $ snipli COMMAND
  ... ``` # Commands - [`snipli create`](#snipli-create) - [`snipli delete`](#snipli-delete)
  - [`snipli edit`](#snipli-edit) - [`snipli help [COMMAND]`](#snipli-help-command)
  - [`snipli id`](#snipli-id) - [`snipli login`](#snipli-login) - [`snipli logout`](#snipli-logout)
  - [`snipli read`](#snipli-read) - [`snipli whoami`](#snipli-whoami) ## `snipli create`
  \U0001F984 Create a new snippet of your local file on gist.github.com ``` USAGE
  $ snipli create -f -d [-p] FLAGS -d, --description= (required) Description of the
  gist -f, --file= (required) Path to the file of which you want to create a gist
  -p, --[no-]public Whether the gist should be public or not DESCRIPTION \U0001F984
  Create a new snippet of your local file on gist.github.com EXAMPLES $ snipli create
  --file=code.ts --description='Need help at line 59 of file code.ts' --public ```
  ## `snipli delete` \U0001F69A Delete a gist ``` USAGE $ snipli delete -i FLAGS -i,
  --id= (required) ID of the gist which is to be deleted DESCRIPTION \U0001F69A Delete
  a gist EXAMPLES $ snipli delete --id=bfce776b3ad1145f764d89c296fec605 ``` ## `snipli
  edit` ✏ Edit an existing gist ``` USAGE $ snipli edit -i -f -d [-p] FLAGS -d, --description=
  (required) The description of the Gist -f, --file= (required) The path of the file
  which has the edited content -i, --id= (required) ID of the Gist which you are going
  to edit -p, --[no-]public Whether the Gist is public or not DESCRIPTION ✏ Edit an
  existing gist EXAMPLES $ snipli edit --id=ca22a324f761cd241ace4c9a35286496 --file=updated-code.ts
  --description='Updated the code' --public ``` ## `snipli help [COMMAND]` Display
  help for snipli. ``` USAGE $ snipli help [COMMAND] [-n] ARGUMENTS COMMAND Command
  to show help for. FLAGS -n, --nested-commands Include all nested commands in the
  output. DESCRIPTION Display help for snipli. ``` ## `snipli id` \U0001F4A1 Get the
  ID of a gist from it's link ``` USAGE $ snipli id -l FLAGS -l, --link= (required)
  Link of the gist DESCRIPTION \U0001F4A1 Get the ID of a gist from it's link EXAMPLES
  $ snipli id --link=https://gist.github.com/Kira272921/bfce776b3ad1145f764d89c296fec605
  ``` ## `snipli login` \U0001F511 Login into snipli via GitHub ``` USAGE $ snipli
  login DESCRIPTION \U0001F511 Login into snipli via GitHub EXAMPLES $ snipli login
  ``` ## `snipli logout` \U0001F4E4 Logout from snipli ``` USAGE $ snipli logout DESCRIPTION
  \U0001F4E4 Logout from snipli EXAMPLES $ snipli logout ``` ## `snipli read` \U0001F4D6
  Read a gist locally using the configured editor ``` USAGE $ snipli read -i FLAGS
  -i, --id= (required) ID of the Gist DESCRIPTION \U0001F4D6 Read a gist locally using
  the configured editor EXAMPLES $ snipli read --id=ca22a324f761cd241ace4c9a35286496
  ``` ## `snipli whoami` \U0001F440 Get the info about the logged in user ``` USAGE
  $ snipli whoami DESCRIPTION \U0001F440 Get the info about the logged in user EXAMPLES
  $ snipli whoami ``` ## Authors ### Mukesh - Twitter: [@0xMukesh](https://twitter.com/0xMukesh)
  ### Avneesh Agarwal - Website: https://www.avneesh.tech/ - Twitter: [@avneesh0612](https://twitter.com/avneesh0612)
  - Github: [@avneesh0612](https://github.com/avneesh0612) - LinkedIn: [@avneesh0612](https://www.linkedin.com/in/avneesh0612)"
---
{% raw %}
# 🦄 snipli

![](https://user-images.githubusercontent.com/90365542/166135580-7483919c-c44e-45be-bdf0-3b259292f341.png)

<a href="https://www.producthunt.com/posts/snipli?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-snipli" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=344997&theme=dark" alt="Snipli - Convert&#0032;your&#0032;local&#0032;files&#0032;into&#0032;a&#0032;gist&#0032;in&#0032;just&#0032;a&#0032;snap | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a> <a href="https://www.producthunt.com/posts/snipli?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-snipli" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=344997&theme=dark&period=daily" alt="Snipli - Convert&#0032;your&#0032;local&#0032;files&#0032;into&#0032;a&#0032;gist&#0032;in&#0032;just&#0032;a&#0032;snap | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

✨ A command-line interface for quickly sharing code snippets for your local files

- [Usage](#usage)
- [Commands](#commands)

# Usage

```bash
$ npm install -g snipli
$ snipli COMMAND
Running command...
$ snipli (--version)
snipli/1.0.0 win32-x64 node-v16.13.0
$ snipli --help [COMMAND]
USAGE
  $ snipli COMMAND
...
```

# Commands

- [`snipli create`](#snipli-create)
- [`snipli delete`](#snipli-delete)
- [`snipli edit`](#snipli-edit)
- [`snipli help [COMMAND]`](#snipli-help-command)
- [`snipli id`](#snipli-id)
- [`snipli login`](#snipli-login)
- [`snipli logout`](#snipli-logout)
- [`snipli read`](#snipli-read)
- [`snipli whoami`](#snipli-whoami)

## `snipli create`

🦄 Create a new snippet of your local file on gist.github.com

```
USAGE
  $ snipli create -f <value> -d <value> [-p]

FLAGS
  -d, --description=<value>  (required) Description of the gist
  -f, --file=<value>         (required) Path to the file of which you want to create a gist
  -p, --[no-]public          Whether the gist should be public or not

DESCRIPTION
  🦄 Create a new snippet of your local file on gist.github.com

EXAMPLES
  $ snipli create --file=code.ts --description='Need help at line 59 of file code.ts' --public
```

## `snipli delete`

🚚 Delete a gist

```
USAGE
  $ snipli delete -i <value>

FLAGS
  -i, --id=<value>  (required) ID of the gist which is to be deleted

DESCRIPTION
  🚚 Delete a gist

EXAMPLES
  $ snipli delete --id=bfce776b3ad1145f764d89c296fec605
```

## `snipli edit`

✏ Edit an existing gist

```
USAGE
  $ snipli edit -i <value> -f <value> -d <value> [-p]

FLAGS
  -d, --description=<value>  (required) The description of the Gist
  -f, --file=<value>         (required) The path of the file which has the edited content
  -i, --id=<value>           (required) ID of the Gist which you are going to edit
  -p, --[no-]public          Whether the Gist is public or not

DESCRIPTION
  ✏ Edit an existing gist

EXAMPLES
  $ snipli edit --id=ca22a324f761cd241ace4c9a35286496 --file=updated-code.ts --description='Updated the code' --public
```

## `snipli help [COMMAND]`

Display help for snipli.

```
USAGE
  $ snipli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for snipli.
```

## `snipli id`

💡 Get the ID of a gist from it's link

```
USAGE
  $ snipli id -l <value>

FLAGS
  -l, --link=<value>  (required) Link of the gist

DESCRIPTION
  💡 Get the ID of a gist from it's link

EXAMPLES
  $ snipli id --link=https://gist.github.com/Kira272921/bfce776b3ad1145f764d89c296fec605
```

## `snipli login`

🔑 Login into snipli via GitHub

```
USAGE
  $ snipli login

DESCRIPTION
  🔑 Login into snipli via GitHub

EXAMPLES
  $ snipli login
```

## `snipli logout`

📤 Logout from snipli

```
USAGE
  $ snipli logout

DESCRIPTION
  📤 Logout from snipli

EXAMPLES
  $ snipli logout
```

## `snipli read`

📖 Read a gist locally using the configured editor 

```
USAGE
  $ snipli read -i <value>

FLAGS
  -i, --id=<value>  (required) ID of the Gist

DESCRIPTION
  📖 Read a gist locally using the configured editor 

EXAMPLES
  $ snipli read --id=ca22a324f761cd241ace4c9a35286496
```

## `snipli whoami`

👀 Get the info about the logged in user

```
USAGE
  $ snipli whoami

DESCRIPTION
  👀 Get the info about the logged in user

EXAMPLES
  $ snipli whoami
```

## Authors

### Mukesh

- Twitter: [@0xMukesh](https://twitter.com/0xMukesh)

### Avneesh Agarwal

- Website: https://www.avneesh.tech/
- Twitter: [@avneesh0612](https://twitter.com/avneesh0612)
- Github: [@avneesh0612](https://github.com/avneesh0612)
- LinkedIn: [@avneesh0612](https://www.linkedin.com/in/avneesh0612)

{% endraw %}