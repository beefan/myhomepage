:desc Part 2 of the full-stack rails/vue tutorial series goes through running migrations, creating models, and testing with rspec.
:tags ruby, rails, full-stack, web development, code, rspec, database migrations

# Part 2: Migrations, Models, and RSpec

In the last post, we introduced the project and installed the main dependencies. In this post, we'll upgrade our testing suite to RSpec, create some database migrations, and finally add some models and tests. 

## Contents

| Part                                                         | Topic                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1                                                            | [Intro and Setup](https://brandonfannin.com/blog/post/2021-07-09-BuildingAFullStackAppUsingRailsAndVuePart1.md) |
| 2 <mark style="background-color: lightblue">(this post)</mark> | [Migrations, Models, and RSpec](https://brandonfannin.com/blog/post/2021-07-15-BuildingAFullStackAppUsingRailsAndVuePart2.md) |
| 3                                                            | [Defining the Rails API](https://brandonfannin.com/blog/post/2021-07-23-BuildingAFullStackAppUsingRailsAndVuePart3.md) |
| 4                                                            | [Creating a Login and Signup Page](https://brandonfannin.com/blog/post/2021-07-29-BuildingAFullStackAppUsingRailsAndVuePart4.md) |
| 5                                                            | [Connecting the Login to the API](https://brandonfannin.com/blog/post/2021-08-02-BuildingAFullStackAppUsingRailsAndVuePart5.md) |

### Upgrade to Rspec

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

### Create Migrations and Models

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

That's it for part 2! Now would be a good time to check in with [my github repo](https://github.com/beefan/full-stack-starter-pack/) for this project, where I have a commit by commit breakdown of every step. Happy Hacking! 

