FROM ruby:2.5.1

WORKDIR /app
EXPOSE 5000

COPY Gemfile Gemfile.lock ./

RUN bundle install --binstubs

COPY . .

CMD [ "bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "5000" ]
