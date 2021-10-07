:desc Everytime I start a new project, I wish I had a fork-ready repository to jump start development. Finally, I built one. This post marks the start of a short tutorial series walking through its creation.
:tags ruby, rails, bootstrap, full-stack, web development, rest api, code, vue, javascript

# Introduction

Frequently, I get ideas about some cool web application I might build. Often, I get lost in the sauce of building out the thing and lose steam before I finish a proof of concept. This leaves me wishing that I had some mechanism of building proof of concepts easier.

I've been thinking about this for a while and I realized that I should not only build myself a `Full Stack Starter Pack`, but I should make a tutorial going through each step in the process. I make heavy use of tutorials whenever I learn a new language or framework and tutorials were absolutely crucial when I was first starting development. 

Well, through a program called "Hack Days" my employer, Root Inc. granted me the time to finally build out this project and share a little of what I have learned so far as a Junior software developer.

![full stack starter pack](../../images/full_stack_starter_pack.png)

## Contents

Part | Topic
--- | ---
 1 <mark style="background-color: lightblue">(this post)</mark> | [Intro and Setup](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart1.md)            
 2       | [Migrations, Models, and RSpec](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart2.md)            
 3       | [Defining the Rails API](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart3.md)            
 4       | [Creating a Login and Signup Page](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart4.md)            
 5		| [Connecting the Login to the API](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart5.md)            

# The 'Stack'

- Postgres for data storage
- Ruby on Rails to build the REST api
- Rspec for testing the server side
- Vue.js to build the frontend
- Bootstrap to make "good enough" design easy

# This tutorial will teach you how to:

- Build a very basic REST API in rails with user authentication and two data tables, `Widget` and `Sale`. 
- Test the API using Rspec.
- Build a simple consumer of that API in Vue.js with a fully implemented login page and a basic Widgets page. 

This tutorial is not all the code you will need to begin a full stack application, but will hopefully make for a good launching pad into building out useful application features.

For this project, I used Mac OSx, VSCode, and the built in Terminal application. It's likely this tutorial will at least mostly translate to Linux and Windows, but there may be difficulties with the setup that this tutorial will not cover.

# Part 1: Setup the Project Directories

### 1. Setup the Rails portion

To start, you will need to have Ruby and Rails installed. Unfortunately this tutorial will not go through that process. If you are on MacOSX, [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-macos) will be helpful.

In your terminal, make a new directory for your application and initialize a git repository. 

```
mkdir full-stack-starter-pack
cd full-stack-starter-pack
git init
```

Within that directory, create a `server` directory and install a boiler plate rails project there:

```
mkdir server
cd server

rails new --api --database=postgresql
```

By default, rails gives us a lot of good stuff. Some of this stuff is in the form of stubbed out packages that we may want to use. In the `Gemfile`, uncomment the `# gem bycrpt` and 

```
bundle install
```

This will install the bycrpt Gem which we will use to quickly build out a secure login for our application. 

Because rails gives us so much by default, we used the `--api` flag to give us a more minimal install. A side effect of this is that we need to add some middleware in the `application.rb` file. In `application.rb` add the following lines underneath `config.api_only = true`:

```ruby
config.middleware.use Rack::MethodOverride

config.middleware.use ActionDispatch::Flash

config.middleware.use ActionDispatch::Cookies

config.middleware.use ActionDispatch::Session::CookieStore
```

You can learn more about Rails on Rack and these what each of these middlewares with [this guide](https://guides.rubyonrails.org/rails_on_rack.html). 

The last thing I like to do is bring my `.gitignore` file to the root project directory. Rails will have auto-generated this file when you created the new rails project. Because we are building one git repository which contains both our frontend and backend code, we'll use one `.gitignore` file in the root directory to tell git what files we don't want to track in source control. 

Inside the `server` folder run:

```
mv .gitignore ../
```

Now open up the `.gitignore` file with your editor of choice and, because our rails project is in the `server` folder, we need to add `/server/` to the beginning of every line.

### 2. Setup the Vue js portion

Just as we won't cover installing ruby and rails here, we also won't cover installing vue. This tutorial takes advantage of the Vue CLI. Vuejs has a [great tutorial]( https://cli.vuejs.org/guide/installation.html) for installing it. 

Now that we have installed the server side of our application, let's navigate back to our project root directory and create a vue application within it.

```
cd ../
vue create client
```

When prompted, choose "basic vue app" and let the magic happen.

Just like with the rails app, we need to move the auto-generated `.gitignore` file out of the vue project and into the root directory. Open `client/.gitignore` with your editor, copy everything within, paste into `full-stack-starter-pack/.gitignore`, and prepend the newly pasted lines with `/client/`. Finally, delete the `.ignore` file from the `client` folder. 

In the end, your `.gitignore` file should look something like this:

```
# RAILS
# Ignore bundler config.
/server/.bundle

# Ignore all logfiles and tempfiles.
/server/log/*
/server/tmp/*
/server/!/log/.keep
!/tmp/.keep

# Ignore pidfiles, but keep the directory.
/server//tmp/pids/*
/server/!/tmp/pids/
/server/!/tmp/pids/.keep

# Ignore uploaded files in development.
/server/storage/*
/server/!/storage/.keep
/server/.byebug_history

# Ignore master key for decrypting credentials and more.
/server/config/master.key

# VUE
/client/.DS_Store
/client/node_modules
/client/dist


# local env files
/client/.env.local
/client/.env.*.local

# Log files
/client/npm-debug.log*
/client/yarn-debug.log*
/client/yarn-error.log*
/client/pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```
