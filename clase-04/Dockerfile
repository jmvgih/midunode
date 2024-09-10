FROM node:20.17.0-alpine3.20
RUN addgroup apiuser && adduser -S -G apiuser apiuser
USER apiuser
WORKDIR /app/
RUN mkdir datos
COPY  --chown=apiuser package*.json .
RUN npm install
COPY  --chown=apiuser . . 
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "run", "dev"]
