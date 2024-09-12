FROM node:20.17.0-alpine3.20
RUN addgroup apiuser && adduser -S -G apiuser apiuser
USER apiuser
WORKDIR /app/
# RUN mkdir datos
COPY  --chown=apiuser package*.json .
RUN npm install
COPY  --chown=apiuser . . 
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "dev"]
