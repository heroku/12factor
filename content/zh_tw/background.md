背景
==========

本文的貢獻者者參與過數以百計的應用程序開發和部署，並通過 [Heroku](http://www.heroku.com/) 平台間接見證了數十萬應用程序的開發，運作以及擴展的過程。

本文綜合了我們關於 SaaS 應用幾乎所有的經驗和智慧，是開發此類應用的理想實踐標準，並特別關註於應用程序如何保持良性成長，開發者之間如何進行有效的代碼協作，以及如何 [避免軟件汙染](http://blog.heroku.com/archives/2011/6/28/the_new_heroku_4_erosion_resistance_explicit_contracts/) 。

我們的初衷是分享在現代軟件開發過程中發現的一些系統性問題，並加深對這些問題的認識。我們提供了討論這些問題時所需的共享詞匯，同時使用相關術語給出一套針對這些問題的廣義解決方案。本文格式的靈感來自於 Martin Fowler 的書籍： *[Patterns of Enterprise Application Architecture](http://books.google.com/books/about/Patterns_of_enterprise_application_archi.html?id=FyWZt5DdvFkC)* ， *[Refactoring](http://books.google.com/books/about/Refactoring.html?id=1MsETFPD3I0C)* 。

