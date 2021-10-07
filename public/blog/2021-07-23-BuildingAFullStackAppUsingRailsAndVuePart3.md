:desc Part 3 of the full stack rails/vue tutorial series covers creating the controllers, wiring up controller methods to routes, and testing the api using PostMan.
:tags ruby, rails, full-stack, web development, rest api, code, controller, routes

# Part 3: Defining the API

In the last post, we did some migrations and created some active records models. Now, in order to get a working API, we need to create some controllers and routes. This post introduces rails controller route mapping magic, gives some examples, and also shows you how to create a custom route. Finally, we'll do some testing of our API with Postman. 

## Contents

| Part                                                         | Topic                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1                                                            | [Intro and Setup](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart1.md) |
| 2                                                            | [Migrations, Models, and RSpec](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart2.md) |
| 3 <mark style="background-color: lightblue">(this post)</mark> | [Defining the Rails API](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart3.md) |
| 4                                                            | [Creating a Login and Signup Page](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart4.md) |
| 5                                                            | [Connecting the Login to the API](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart5.md) |

## Create the Controllers

A simplistic way to think about controllers is that they intercept your traffic and direct it to the right methods to run. For instance, on login you want send the request parameters to an authentiation method of some sort.

Rails does some cool stuff with controllers that make them seem a little magical which I also kind of hate. In our controller files, we use controller actions which map to an HTTP request a client might make.

If you define a method in your `WidgetsController`, it'll respond to GET requests to `/widgets`. Here's a table that shows the rest of these http request to controller action mappings.

| HTTP request path   | Controller Action |
| ------------------- | ----------------- |
| GET /widgets        | index             |
| POST /widgets       | create            |
| GET /widgets/:id    | show              |
| PUT /widgets/:id    | update            |
| DELETE /widgets/:id | destroy           |

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

## Create Routes

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

## Test the Routes

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

That's it for Part 3! Next post, we'll start building the front end. 
