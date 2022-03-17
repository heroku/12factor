FROM ruby:2.5.3

RUN curl https://cli-assets.heroku.com/install.sh | sh

WORKDIR /usr/src/app

COPY Gemfile /usr/src/app/Gemfile
COPY Gemfile.lock /usr/src/app/Gemfile.lock
RUN bundle install

ADD . /usr/src/app

EXPOSE 5000
CMD heroku local:start -p 5000
