# You can change this file if you need but read this first
# https://github.com/matilda-applicants/common-tasks-instructions/wiki/Docker-on-your-task
FROM node:16-alpine

WORKDIR /usr/src/app

# This will export the PORT environment variable to your application.
# It has 12345 as default value, but when running the container we might pass
# any other port. You shouldn't change this unless you really know what you are doing.
ENV PORT 12345

# Avoid changing this too; it will expose the port so
# other containers can connect to your app.
EXPOSE $PORT

RUN yarn global add serve

# Copy just the needed files to install your dependencies.
# This is an optimization since these files change very little,
# so by copying just these files initially we'll be able to
# "cache" the layer that creates the node_modules, greatly increasing
# the speed of your build.
# If you are using `yarn` you might want to change this to
# COPY package.json yarn.lock ./
COPY package.json package-lock.json ./

# Now install dependencies. If you want to use yarn, change to
# RUN yarn
RUN npm install

# Copy all the rest of the code
COPY . .

# Build the app. If you want to use yarn, change to
# RUN yarn build
RUN npm run build

# Serve your app on the provided port
CMD serve -n -l $PORT build
