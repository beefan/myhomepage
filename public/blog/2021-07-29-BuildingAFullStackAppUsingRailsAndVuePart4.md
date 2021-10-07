:desc Part 4 of the full stack rails/vue tutorial series kicks of the frontend development with Vue. It goes through using BootstrapVue to quickly create sharp and responsive user interfaces. 
:tags bootstrap, full-stack, web development, code, vue, javascript

# Part 4: Building a Login Page

In the last post, we implemented a simple API for login and signup. In this post, we will build the login page which eventually connects to that API.

## Contents

| Part                                                         | Topic                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1                                                            | [Intro and Setup](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart1.md) |
| 2                                                            | [Migrations, Models, and RSpec](https://brandonfannin.com/blog/post/2021-07-15-BuildingAFullStackAppUsingRailsAndVuePart2.md) |
| 3                                                            | [Defining the Rails API](https://brandonfannin.com/blog/post/2021-07-23-BuildingAFullStackAppUsingRailsAndVuePart3.md) |
| 4 <mark style="background-color: lightblue">(this post)</mark> | [Creating a Login and Signup Page](https://brandonfannin.com/blog/post/2021-07-29-BuildingAFullStackAppUsingRailsAndVuePart4.md) |
| 5                                                            | [Connecting the Login to the API](https://brandonfannin.com/blog/post/2021-08-02-BuildingAFullStackAppUsingRailsAndVuePart5.md) |

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

```vue
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

```vue
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

[The commit](https://github.com/beefan/full-stack-starter-pack/commit/f04f1c7b3a3a9abdc6d67798256c20636ccb892a) which adds the sign up form also adds the javascript necessary for that responsive login page to function properly.

Now we have a responsive component that keeps track of whether or not we are logged in and shows the sign up flow when appropriate! Next post, we will finish off the tutorial by connecting our frontend to our backend. 

