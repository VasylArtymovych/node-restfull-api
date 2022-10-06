FROM node
WORKDIR /app
COPY . .
RUN yarn 
EXPOSE 3030
CMD ["node", "app"]