## II. 依賴
### 顯式聲明依賴關系（ *dependency* ）

大多數程式語言都會提供一個打包系統，用來為各個類庫提供打包服務，就像 Perl 的 [CPAN](http://www.cpan.org/) 或是 Ruby 的 [Rubygems](http://rubygems.org/) 。通過打包系統安裝的類庫可以是系統級的（稱之為 "site packages"），或僅供某個應用程序使用，部署在相應的目錄中（稱之為 "vendoring" 或 "bunding"）。

**12-Factor規則下的應用程序不會隱式依賴系統級的類庫。** 它一定通過 *依賴清單* ，確切地聲明所有依賴項。此外，在運行過程中通過 *依賴隔離* 工具來確保程序不會調用系統中存在但清單中未聲明的依賴項。這一做法能統一應用的生產和開發環境。

例如， Ruby 的 [Bundler](https://bundler.io/) 使用 `Gemfile` 作為依賴項聲明清單，使用 `bundle exec` 來進行依賴隔離。Python 中則可分別使用兩種工具 -- [Pip](http://www.pip-installer.org/en/latest/) 用作依賴聲明， [Virtualenv](http://www.virtualenv.org/en/latest/) 用作依賴隔離。甚至 C 語言也有類似工具， [Autoconf](http://www.gnu.org/s/autoconf/) 用作依賴聲明，靜態鏈接庫用作依賴隔離。無論用什麽工具，依賴聲明和依賴隔離必須一起使用，否則無法滿足 12-Factor 規範。

顯式聲明依賴的優點之一是為新進開發者簡化了環境配置流程。新進開發者可以檢出應用程序的基準代碼，安裝程式語言環境和它對應的依賴管理工具，只需通過一個 *構建命令* 來安裝所有的依賴項，即可開始工作。例如，Ruby/Bundler 下使用 `bundle install`，而 Clojure/[Leiningen](https://github.com/technomancy/leiningen#readme) 則是 `lein deps`。

12-Factor 應用同樣不會隱式依賴某些系統工具，如 ImageMagick 或是`curl`。即使這些工具存在於幾乎所有系統，但終究無法保證所有未來的系統都能支持應用順利運行，或是能夠和應用兼容。如果應用必須使用到某些系統工具，那麽這些工具應該被包含在應用之中。
