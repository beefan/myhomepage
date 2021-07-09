:desc Everytime I start a new project, I wish I had a fork-ready repository to jump start development. Finally, I built one. Here's a tutorial walking through my process.
:tags ruby, rails, bootstrap, full-stack, web development, rest api, code, vue, javascript

# Project Summary
Frequently, I get ideas about some cool web application I might build. Often, I get lost in the sauce of building out the thing and lose steam before I finish a proof of concept. This leaves me wishing that I had some mechanism of building proof of concepts easier.

I've been thinking about this for a while and I realized that I should not only build myself a `Full Stack Starter Pack`, but I should make a tutorial going through each step in the process. I make heavy use of tutorials whenever I learn a new language or framework and tutorials were absolutely crucial when I was first starting development. 

Well, through a program called "Hack Days" my employer, Root Inc. granted me the time to finally build out this project and share a little of what I have learned so far as a Junior software developer.

![full stack starter pack](../../images/full_stack_starter_pack.png)

# The 'Stack'

- Postgres for data storage
- Ruby on Rails to build the REST api
- Rspec for testing the server side
- Vue.js to build the frontend
- Bootstrap to make "good enough" design easy

---

# This tutorial will teach you how to:

- Build a very basic REST API in rails with user authentication and two data tables, `Widget` and `Sale`. 
- Test the API using Rspec.
- Build a simple consumer of that API in Vue.js with a fully implemented login page and a basic Widgets page. 

This tutorial is not all the code you will need to begin a full stack application, but will hopefully make for a good launching pad into building out useful application features.

For this project, I used Mac OSx, VSCode, and the built in Terminal application. It's likely this tutorial will at least mostly translate to Linux and Windows, but there may be difficulties with the setup that this tutorial will not cover.

---

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

Now let's make our first commit.
```
git add .
git commit -m "Installed rails api with session middleware"
```

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
---

# Part 2: Build out the API

### 1. Upgrade to Rspec
By default, rails comes with minitest installed. I use Rspec at work so I'm using Rspec for this project. I don't know that it's better. It's just what I'm most familiar with. 

Add `rspec-rails` to your `Gemfile`. I'm using v.4.1.0.
```
gem 'rspec-rails', '~> 4.1.0'
```

Now bundle and generate rspec setup
```
bundle install
rails generate rspec:install
```
This should create a `spec_helper.rb` file and a `rails_helper.rb` file. When we make a test file, we will put `require 'rails_helper'` at the top of the file to include these test helpers.

We are pretty much ready to Rspec, but I like to put a little snippet in `spec_helper.rb` that deletes database objects created after during test. Add it inside the `Rspec.configure do |config|` block:
```ruby
# delete database objects created during test
config.after :all do
  ApplicationRecord.subclasses.each(&:delete_all)
end
```
Cool. We should be ready to rock. I made another commit here to mark the rspec install
```
git add .
git commit -m "Install rspec"
```

### 2. Create Migrations and Models

The modeling for this application is extremely basic. We have Users. Users have Widgets. Widgets have Sales. It's not meant to be the perfect modeling for an actual widget store, but some simple models to use as building blocks for your own. Let's start with `User.rb`. First, we'll need to create a migration to make the table:
```
rails g migration create_users
```
This should generate a migration file in `server/db/migrate/`. That file should look something like this: 
```ruby
class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
    end
  end
end
```

Inside the `create_table` block we want to add the columns for our users table: username, email, password_digest (a column bcyrpt uses for login), and timestamps:
```ruby
      t.string :username
      t.string :email
      t.string :password_digest
      t.timestamps
```

Next, we need to create the `User` model. Make a new file `user.rb` under `server/app/models` that looks like this:
```ruby
class User < ApplicationRecord
  validates :username, :email, presence: true
  validates :username, :email, uniqueness: true
  has_secure_password
  has_many :widgets
end
```
The user class inherits from `ApplicationRecord` and utilizes two rails validations to ensure that username and email are both unique and present. To enable bcrypt authentication magic, add `has_secure_password`. The last line in the class denotes a relationships between our user class and the (soon to be created) widgets class. *One* user can have *many* widgets. This is how you denote a 1-many relationship in rails. 

Now, to generate the actual table, run:
```
rails db:migrate
```

You should now have a users table! Let's write some tests for it.

Inside `server/spec/models`, create a file called `user_spec.rb`. We start our spec files with by requring the spec helpers and opening up a describe block on our target class:
```
require 'rails_helper'

describe User do
end
```
This is a valid rspec test. To run, I use a VSCode extension called `vscode-run-rspec-file`. Just search in the marketplace and install. This allows you to click the test block you want to run and bind a keyboard shorcut to start the tests. 

At the begining of the test, I like to use `subject` to create a variable for what we want to test. `User` is a relatively simple model so we will only test validations. The approach to this test is to "new up" a `User` class, and see if we can save it to the database. To do this, I'll stub out a few more variables using Rspec's `let`. These are shared variables that will be helpful to have available for each test.

```ruby
describe User do
  subject(:user) { described_class.new(user_params) }

  let(:username) { "giant_whale" }
  let(:email) { "giant_whale@ocean.org" }
  let(:password) { "secure" }
  let(:user_params) { { :email => email, :username => username, :password => password } }

```

Okay so what do we actually want to test? In this case, only validations. And what contexts related to validations should we test?
- username not provided
- email not provided
- password not provided
- all required params are provided

Here's the rest of the test 
```ruby

  describe "validations: " do
    context "username must be present" do
      let(:user_params) do { :email => email, :password => password } end

      it "user not valid when username isn't present" do
        expect(user.save).to eq(false)
      end
    end

    # These contexts are very similar to the above
    # For brevity, I won't replicate them here
    # context "email must be present"
    # context "password required to create a user"

    context "when all required params are present" do
      it "user is valid and saves" do
        expect do
          expect(user.save).to eq(true)
        end.to change { User.count }.by(1)
      end
    end
  end
end
```

That is an example of how you might create an rspec test for a model class in rails. Once you have that done, I'd consider that commit worthy!
```
git add . 
git commit -m "Add User model"
```

I won't go over the remaining models in great detail. Following the prodecures outlined above,
- generate the migration
- create the model
- run the migration
- test the model 
- make a commit

Truly, you can have fun and create whatever ActiveRecord models you want here. My simple example uses `Widget` and `Sale`. Here's some notes that may be helpful:
- `Widget`
  - has columns: name, value_in_cents, and quantity
  - belongs to a user
    - in the migration, if you use `t.belongs_to :user` it will generate a table with a foreign key column, `user_id` that links to the users table
    - In the model, you can define the relationship with `belongs_to :user`
- `Sale`
  - has columns: quantity
  - `belongs_to :widget`
  - I also added a convenience method here for determing the total value of the sale. Because of the relationship to widget, you can reference it directly:
  ```ruby
  def total_in_cents
    widget.value_in_cents * quantity
  end
  ```

  Now would be a good time to check in with [my github repo](https://github.com/beefan/full-stack-starter-pack/) for this project if you're having trouble. 

### 3. Create Controllers

A simplistic way to think about controllers is that they intercept your traffic and direct it to the right methods to run. For instance, on login you want send the request parameters to an authentiation method of some sort.

Rails does some cool stuff with controllers that make them seem a little magical which I also kind of hate. In our controller files, we use controller actions which map to an HTTP request a client might make. 

If you define a method in your `WidgetsController`, it'll respond to GET requests to `/widgets`. Here's a table that shows the rest of these http request to controller action mappings.

| HTTP request path | Controller Action |
| :---------------: | :---------------: |
| GET /widgets      | index             |
| POST /widgets     | create            |
| GET /widgets/:id  | show              |
| PUT /widgets/:id  | update            |
| DELETE /widgets/:id | destroy         |

If you understand this mapping, it makes defining the controller actions a lot simpler. Of course, you can also define your own methods and connect them to custom routes. We'll do that too.

Here's `sessions_controller.rb` which we will use for logging in. Create this file in `server/app/controllers/`
```ruby
class SessionsController < ApplicationController
  def create
    @user = User.find_by_username(_user_params[:username])
    if @user&.authenticate(_user_params[:password])
      session[:user_id] = @user.id
      render json: @user
    else
      render json: { error: "Login Failed." }
    end
  end

  def logout 
    # Not a default controller action
    # We will map this route manually later
    session.clear if logged_in?
    render json: { success: true }
  end

  private 

  def _user_params
    params.require(:userDetails).permit(:username, :password)
  end
end
```

You might notice in the logout method, we are calling the inheriting from a base class `ApplicationController`. For the ease of managing login, it is helpful to have a class with helper methods to make it easier to confirm user state. 

In `SessionsController` you can see in the logout method, we call one of these methods `logged_in?` to decided whether or not we need to clear the session.

Here's what the `ApplicationController`:
```ruby
class ApplicationController < ActionController::API
  def logged_in?
    !!current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
```

The remaining controllers will more or less map to objects models your application is dependent on. In the case of this sample application, we have controllers for sales, sign ups (users), and widgets. 

In sales and widgets, we also inherit `ApplicationController` and use a call `logged_in?` to determine if a route is authorized or not. I won't reproduce these controllers here, but you can find them in the [github repository](https://github.com/beefan/full-stack-starter-pack). 

Just as we did for models, keeping things organized by specific commit is always a good idea. I tried to set a good example of this organization style in my github repository. I didn't outline testing controllers here, but the github repo also has rspec tests for each controller.


### 4. Create Routes and Test with your REST API
Open up the `server/config/routes.rb` file. This is the file that maps all routes for your application. It's where we will define which rails controller actions should be accesible for each of our models. This is also the place we will define custom routes such as our logout function in `SessionsController`.

Our finished `routes.rb` file should look like this:
```ruby
Rails.application.routes.draw do
  scope '/api' do
    resources :widgets, only: [:index, :show, :create, :update, :destroy]
    resources :sales, only: [:index, :show, :create, :destroy]
  end

  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#logout'
  post '/signup', to: 'sign_ups#create'
end
```

We first define which resources should be available on widgets and sales. We want them to be accessible through the `/api/` route on our domain.

Then we create the custom routes. This allows our users to access login page at `our_domain/login` instead of `our_domain/sessions` and allows `our_domain/logout` to properly resolve to a controller action.

Now that we have our routes defined, the next thing we should do is give them a test. For this, I use Postman, but there are many other applications you could use. First launch your rails server using the command `rails server` then open Postman.

Let's test the widget route:
![unauthorized route](../../images/unauthorized_widget_request.png)

Oops. Unauthorized! This is good though. That means our route protection is working. Let's sign up for an account and then try again. First we test a POST request to the signup route with the proper userDetails body:

![sign_up_request](../../images/sign_up_request.png)

Next, we POST to /login in with the same user details.
![login request](../../images/login_request.png)

Now that we are logged in, lets try that same POST to /widgets:
![authorized widget request](../../images/authorized_widget_request.png)

Woohoo! It works! Take a small moment to celebrate and then go through each of the remaining routes you've enabled in `routes.rb` and make sure that each one produces the results you would expect. 

Working out any problems with your assumption of how the route works and how it actually does is important because it will make implementing the view much smoother.

---

# Part 3: Implement the View

### 1. Install Bootstrap, Vue Router, and Vuex Store
  At the beginning of this tutorial, we inititalized the a vue application in `/client/`. Navigate back to that folder to begin work on the frontend of this full stack application.

  The first thing we should do is install and set up our dependencies. I like to use Bootstrap, Vue Router, and Vuex in my frontend applications. Boostrap is for style, Vue Router enables regular routing in a single page application, and Vuex is a state management tool. 

  For vuex and vue router, it's actually really easy to add these to your project with the vue cli:
  ```
  vue add router
  ```
  Check out the changes this creates in git version control to understand what exactly this is adding to your project. Probably a good idea to put these changes in their own commit. 
  ```
  vue add vuex
  ```
  Same recommendations as above. Vue CLI makes adding these things completely frictionless, but it's still a good idea to have some understanding of what was done automagically. Specifically, take a look at the `index.js` file in `/store/`.

  At the time of writing this, I've discovered that adding bootstrap is just as easy:
  ```
  vue add bootstrap
  ```
  But in the past, I've always followed [bootstrap vue's docs](https://bootstrap-vue.org/docs). Besides installation instructions, there's a wealth of information here that will be helpful as you build UI features.

### 2. Add Login Form with validations
To add a login form to our frontened, we are going to create a login component which we'll instatiate in the parent component, `App.vue`.

First, add `Login.vue` to the `/client/src/components` folder. Here's what it should look like: 
```html
<template>
  <b-container>
    <b-form>
      <b-form-group label="Username: " label-for="username-input">
        <b-form-input
          id="username-input"
          v-model="form.username"
          type="text"
          :state="usernameValidation"
        />
        <b-form-invalid-feedback :state="usernameValidation">
          Username must be letters and numbers, 5-20 characters long
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Password: " label-for="password-input">
        <b-form-input
          id="password-input"
          v-model="form.password"
          type="password"
          :state="passwordValidation"
        />
        <b-form-invalid-feedback :state="passwordValidation">
          Password must be greater than or equal to 12 characters long
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        v-if="!showLogin"
        label="Confirm Password: "
        label-for="confirm-password-input"
      >
        <b-form-input
          id="confirm-password-input"
          v-model="form.confirmPassword"
          :state="confirmPasswordValidation"
          type="password"
        />
        <b-form-invalid-feedback :state="confirmPasswordValidation">
          Passwords must match
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button
        @click="loginOrSignUp"
        variant="dark"
        :disabled="disableButton"
        >{{ showLogin ? "Login" : "Create User" }}</b-button
      >
      <p>
        {{ showLogin ? "not yet signed up?" : "already signed up?" }}
        <a @click="showLogin = !showLogin">
          {{ showLogin ? "create an account" : "login" }}
        </a>
      </p></b-form
    >
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // Perform Login
      console.log("login");
    },
  },
  computed: {
    usernameValidation() {
      if (this.form.username == "") return null;
      return (
        this.form.username.length > 4 &&
        this.form.username.length < 20 &&
        /^[a-z0-9]+$/i.test(this.form.username)
      );
    },
    passwordValidation() {
      if (this.form.password == "") return null;
      return this.form.password.length >= 12;
    },
    confirmPasswordValidation() {
      if (this.form.confirmPassword == "") return null;
      return this.form.password === this.form.confirmPassword;
    },
    emailValidation() {
      if (this.form.email == "") return null;
      return (
        this.form.email.indexOf("@") > -1 &&
        this.form.email.indexOf(".") > -1 &&
        this.form.email.split("@")[1].length > 3
      );
    },
    disableButton() {
      if (this.showLogin) {
        return !(this.usernameValidation && this.passwordValidation);
      }
      return !(
        this.usernameValidation &&
        this.passwordValidation &&
        this.emailValidation &&
        this.confirmPasswordValidation
      );
    },
  },
};
</script>

<style>
</style>
```

Vue components have three main parts:
1. Template - the html part 
2. Script - the javascript stuff
3. Style - the css part

To keep the example simple, we are skimping on the style section for now. But we are doing quite a bit in the script and template sections! Let's take a look at some of these.

`<b-container>, <b-form>, <b-form-group>`
- These tags correspond to bootstrap-vue components. Take a look at [the documentation for building forms](https://bootstrap-vue.org/docs/components/form) for more information.

`:state` and `:disabled` 
  - More boostrap attributes. These allow you to specify a function to determine state of a particular component. We are using them to disable login button until we have a valid state in our login form.

`v-model` and `v-if` 
- `v-model` is a vue attribute that binds a particular field to a data attribute in the script section. In our case, we are using it to bind the username and password input fields to variables to use in our javascript.
- `v-if` is a vue attribute that allows us to specifiy a condition under which we want some html to show up. Here we are using it to determine if we should show the login component or not.

`@click`
- vue action attribute that allows us to easily connect functions we want to run on click to the button in the html
- there are others built into vue. We can also create our own custom actions, but won't do so here.

`data()`
- This holds the variables that we want to be accesible to our template and script

`methods:`
- the methods section contains and methods we might want to call
- for example, we've included a filler method here that will eventually contain the code to run when the user clicks login

`computed:`
- computed properties to be used in our template and script
- in the above example, these properties are used with boostrap components to determine valid state and whether or not we should disable the login button


### 3. Add Signup Form

After creating the login form, we want to make it response so if a user doesn't have an account, they can navigate easily to a sign up form. We'll start by adding another form group to allow users to enter their email to create an account.
```html
      <b-form-group v-if="!showLogin" label="Email: " label-for="email-input">
        <b-form-input
          id="email-input"
          v-model="form.email"
          type="text"
          :state="emailValidation"
        />
        <b-form-invalid-feedback :state="emailValidation">
          Email must be valid.
        </b-form-invalid-feedback>
      </b-form-group>
```

As you can see from the code above, and from the github repository, I added some sign up form functionality to the login component already. For instance, the responsive button which will show different text depending on whether or not a user is logged in. 

The commit which adds the sign up form also adds the javascript necessary for that responsive login page to function properly. 

Now we have a responsive component that keeps track of whether or not we are logged in and shows the sign up flow when appropriate.

### 4. Connect Login and Signup to Rails API

Finally, we are ready to connect the backend to our vue application! The design used for this simple application is to put all api requests behind the vuex store. Then, in our login component, we make vuex action calls to perform the api request There are three steps we need to perform to get this right:
1. Create a simple fetch utility that helps us make api requests
```javascript
// client/src/store/fetch-util.js
async function postData(url = '', data = {}) {
  const response = await (fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }));
  return response;
}

async function getData(url = '') {
  const response = await (fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  }));
  return response;
}

module.exports = {
  postData,
  getData
}
```
2. Create login, signup, and logout actions in the vuex store
```javascript
// client/src/store/index.js
import Vue from "vue";
import Vuex from "vuex";
import fetchUtil from "./fetch-util";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    lastServerResponse: ""
  },
  getters: {
    currentUser: state => {
      return state.currentUser
    },
    lastServerResponse: state => {
      return state.lastServerResponse
    }
  },
  mutations: {
    login(state, body) {
      if (body && body != undefined) state.currentUser = body
    },
    logout(state) {
      state.currentUser = null
    },
    updateServerResponse(state, body) {
      state.lastServerResponse = body
    }
  },
  actions: {
    async loginUser(_, loginParams) {
      const data = {
        userDetails: {
          username: loginParams.username,
          password: loginParams.password
        }
      }

      const res = await fetchUtil.postData(`${process.env.VUE_APP_API_HOST}/login`, data);
      const body = await res.json();
      this.commit('updateServerResponse', body);

      if (body.username) this.commit('login', body);
    },
    async signUpUser(_, signUpParams) {
      const data = {
        userDetails: {
          username: signUpParams.username,
          password: signUpParams.password,
          email: signUpParams.username
        }
      }

      const res = await fetchUtil.postData(`${process.env.VUE_APP_API_HOST}/signup`, data);
      const body = await res.json();
      this.commit('updateServerResponse', body);
    },
    async logoutUser() {
      const res = await fetchUtil.getData(`${process.env.VUE_APP_API_HOST}/logout`);
      const body = await res.json();
      this.commit('updateServerResponse', body);

      if (res.status == 200) this.commit('logout');
    }
  },
  modules: {},
});
```

In the vuex store file, 
- **state** contains the data you want the vue application to keep track of
- **getters** define access to parameters of state. We use this on the view side of things to fetch state. 
- **mutations** are ways to alter state. We are calling them from our actions to set state.
- **actions** are asynchronous methods. We are using them to make our api requests.

One thing you'll note by reading through this file is our use of `process.env.VUE_APP_API_HOST`. This will be the url of our server. We put in an in environment variable just to keep things as secure as possible. Create or edit the `.env.local` file and add the following: 
```
VUE_APP_API_HOST=http://localhost:3000
```

3. Call the vuex actions from the login/signup component

To the computed section in your Login component, add some methods to take advantage of the vuex getters:
```javascript
currentUser() {
  return this.$store.state.currentUser;
},
lastServerResponse() {
  return this.$store.state.lastServerResponse;
},
```
This syntax allows us to access the state with `this.currentUser` or `this.lastServerResponse`.

Next, add the login and sign up methods to the methods section:
```javascript
async login() {
  await this.$store.dispatch("loginUser", this.form);
  if (this.currentUser != null) {
    this.$bvToast.toast(`Welcome, ${this.currentUser.username}!`, {
      title: "Login Success",
      variant: "success",
      toaster: "b-toaster-top-center",
      autoHideDelay: 1500,
    });
  } else {
    this.$bvToast.toast(this.lastServerResponse, {
      title: "Login Failed",
      variant: "danger",
      toaster: "b-toaster-top-center",
    });
  }
},
async signup() {
  await this.$store.dispatch("signUpUser", this.form);
  if (this.lastServerResponse.username) {
    this.$bvToast.toast("Success!", {
      title: "User Successfully created.",
      variant: "success",
      toaster: "b-toaster-top-center",
    });
    this.showLogin = true;
    this.form.password = "";
    this.form.confirmPassword = "";
  } else {
    this.$bvToast.toast(this.lastServerResponse, {
      title: "User Creation Failed",
      variant: "danger",
      toaster: "b-toaster-top-center",
    });
  }
```

In both of these method, we call the action from the vuex store using `this.$store.dispatch`. Then, we check the state of the last server response and display a toast notification indicating success of failure. These toast notifications are another awesome feature of bootstrap vue. 

Let's test our connection!
First startup the server. Then navigate back to the client folder and run
```
npm run serve
```

Try to create a user and login:
![signup success](../../images/signup_success.png)

### 5. Add Interactive Widgets Page

Now we have a basic full stack web application with login functionality enabled all the way through. That's cool, but our app doesn't actually do anything. To finish this tutorial and give you a good framework from which to launch into your own personal project, let's build an interactive widgets page.

I won't reproduce any code here, but I'll outline the steps to flesh out the widgets page:
- Add a new view, `Widgets.vue`
- Wire up this view to the vue router in `App.vue` and `router/index.js`. Be sure to make it only available for logged in users. 
- Add some new fetch util wrappers to for put and delete http requests. This is necessary to update or delete our widgets.
- Create getters and mutators in `store/index.js`
- Also in `store/index.js`, create actions for creating, updating, deleting, and reloading the widgets in 
- Build out the component with computed properties to fetch widget state, methods that map to vuex actions, and a user interface that displays a list of widget and has form elements for creating new widgets, editing, or deleting

Once you get a basic widget page functioning, add functionality to record sales.
- Add actions to `store/index/js` that call the proper api to create sales
- In `Widgets.vue`, add a cute little cash icon on each widget and add a method to be called on click that prompt the user for quantity sold and calls to the vuex action.

In the end, you should have something that looks like this:
![widget page](../../images/widget_page.png)

---


# Last Steps & Final Notes
Congratulations, you now have a fully functioning, albeit barebones, full-stack web application! To practice extending this project, create a sales dashboard that allows you to edit sales data and calculate sales over certain periods of time. This project has a lot of existensibility to play around with and further develop your skill set.

If you made it this far, thanks for following along! I am still very new in my career and don't claim this tutorial to be perfect by any means. Still, I hope that something you found here was helpful. I learned a lot making it! 

You can find the repository with all of the code on [my github page](https://github.com/beefan/full-stack-starter-pack). Fork it or go through the commits one by one and use it as a guide to build your own project! 🙏



