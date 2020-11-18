## III. Configuration
### Store configuration in the environment

An application's *configuration* is everything that is likely to vary between [deploys](./codebase) (staging, production, developer environments, etc).  This includes:

* Resource handles to the database, Memcached, and other [backing services](./backing-services)
* Credentials to external services such as Amazon S3 or Twitter
* Per-deploy values such as the canonical hostname for the deploy

Applications sometimes store configuration as constants in the code.  This is a violation of twelve-factor, which requires **strict separation of configuration from code**.  Configuration varies substantially across deploys, code does not.

A litmus test for whether an application has all configuration correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.

Note that this definition of "configuration" does **not** include internal application configuration, such as `configuration/routes.rb` in Rails, or how [code modules are connected](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/beans.html) in [Spring](http://spring.io/).  This type of configuration does not vary between deploys, and so is best done in the code.

Another approach to configuration is the use of configuration files which are not checked into revision control, such as `config/database.yml` in Rails.  This is a huge improvement over using constants which are checked into the code repo, but still has weaknesses: it's easy to mistakenly check in a configuration file to the repo; there is a tendency for configuration files to be scattered about in different places and different formats, making it hard to see and manage all the configuration in one place.  Further, these formats tend to be language- or framework-specific.

**The twelve-factor application stores configuration in *environment variables*** (often shortened to *env vars* or *env*).  Environment variables are easy to change between deploys without changing any code; unlike configuration files, there is little chance of them being checked into the code repo accidentally; and unlike custom configuration files, or other config mechanisms such as Java System Properties, they are a language- and OS-agnostic standard.

Another aspect of configuration management is grouping.  Sometimes applications batch configuration into named groups (often called "environments") named after specific deploys, such as the `development`, `test`, and `production` environments in Rails.  This method does not scale cleanly: as more deploys of the app are created, new environment names are necessary, such as `staging` or `qa`.  As the project grows further, developers may add their own special environments like `joes-staging`, resulting in a combinatorial explosion of configuration which makes managing deploys of the app very brittle.

In a twelve-factor application, environment variable are granular controls, each fully orthogonal to other env vars.  They are never grouped together as "environments", but instead are independently managed for each deploy.  This is a model that scales up smoothly as the application naturally expands into more deploys over its lifetime.
