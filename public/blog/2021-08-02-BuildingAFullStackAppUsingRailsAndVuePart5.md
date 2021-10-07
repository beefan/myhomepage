:desc Part 5 is the final part of the full stack rails/vue tutorial series. It goes through connecting the login and signup user interface to the rails backend using Vuex. We'll also outline the steps for creating an interactive widgets page.
:tags ruby, rails, bootstrap, full-stack, web development, rest api, code, vue, javascript, vuex

# Part 5: Connect Login and Signup to Rails API

We built the login and sign up pages in Vue.js in the last post. Now, we are coming to a close on the Full Stack Web App in Rails and Vue tutorial. This final post connects the login user interface to the rails api we built in part 3. Though it is overkill for such a simple project, we will introduce Vuex as a state management tool for your web apps. And finally, we outline some steps for expanding the project. 

## Contents

| Part                                                         | Topic                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1                                                            | [Intro and Setup](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart1.md) |
| 2                                                            | [Migrations, Models, and RSpec](https://brandonfannin.com/blog/post/2021-07-15-BuildingAFullStackAppUsingRailsAndVuePart2.md) |
| 3                                                            | [Defining the Rails API](https://brandonfannin.com/blog/post/2021-07-23-BuildingAFullStackAppUsingRailsAndVuePart3.md) |
| 4                                                            | [Creating a Login and Signup Page](https://brandonfannin.com/blog/post/2021-07-29-BuildingAFullStackAppUsingRailsAndVuePart4.md) |
| 5 <mark style="background-color: lightblue">(this post)</mark> | [Connecting the Login to the API](https://brandonfannin.com/blog/post/2021-08-02-BuildingAFullStackAppUsingRailsAndVuePart5.md) |



## Connect the Login page to the Rails API

Finally, we are ready to connect the backend to our vue application! The design used for this simple application is to put all api requests behind the vuex store. Then, in our login component, we make vuex action calls to perform the api request There are three steps we need to perform to get this right:

### 1. Create a simple fetch utility that helps us make api requests

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

### 2. Create login, signup, and logout actions in the vuex store
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

### 3. Call the vuex actions from the login/signup component

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

## Add Interactive Widgets Page

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
