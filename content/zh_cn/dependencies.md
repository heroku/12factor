## II. 依赖
### 显式声明依赖关系（ *dependency* ）

大多数编程语言都会提供一个打包系统，用来为各个类库提供打包服务，就像 Perl 的 [CPAN](http://www.cpan.org/) 或是 Ruby 的 [Rubygems](http://rubygems.org/) 。通过打包系统安装的类库可以是系统级的（称之为 "site packages"），或仅供某个应用程序使用，部署在相应的目录中（称之为 "vendoring" 或 "bundling"）。

**12-Factor规则下的应用程序不会隐式依赖系统级的类库。** 它一定通过 *依赖清单* ，确切地声明所有依赖项。此外，在运行过程中通过 *依赖隔离* 工具来确保程序不会调用系统中存在但清单中未声明的依赖项。这一做法会统一应用到生产和开发环境。

例如， Ruby 的 [Bundler](https://bundler.io/) 使用 `Gemfile` 作为依赖项声明清单，使用 `bundle exec` 来进行依赖隔离。Python 中则可分别使用两种工具 -- [Pip](http://www.pip-installer.org/en/latest/) 用作依赖声明， [Virtualenv](http://www.virtualenv.org/en/latest/) 用作依赖隔离。甚至 C 语言也有类似工具， [Autoconf](http://www.gnu.org/s/autoconf/) 用作依赖声明，静态链接库用作依赖隔离。无论用什么工具，依赖声明和依赖隔离必须一起使用，否则无法满足 12-Factor 规范。

显式声明依赖的优点之一是为新进开发者简化了环境配置流程。新进开发者可以检出应用程序的基准代码，安装编程语言环境和它对应的依赖管理工具，只需通过一个 *构建命令* 来安装所有的依赖项，即可开始工作。例如，Ruby/Bundler 下使用 `bundle install`，而 Clojure/[Leiningen](https://github.com/technomancy/leiningen#readme) 则是 `lein deps`。

12-Factor 应用同样不会隐式依赖某些系统工具，如 ImageMagick 或是`curl`。即使这些工具存在于几乎所有系统，但终究无法保证所有未来的系统都能支持应用顺利运行，或是能够和应用兼容。如果应用必须使用到某些系统工具，那么这些工具应该被包含在应用之中。
