# Codebase Structure 


- ### /actions
  - Backend server actions usually for filling form data or for tightly coupled together functions with the frontend

- ## /App 
  File structure within the app directory shows up as routing in the website. 
  
  For example: Content at /app/heart/page.tsx shows up at /heart when deployed. 
  want to know more about the app router [click here](https://nextjs.org/docs/app) 

    - ### /(protected)/  
        Includes all client side protected routes. Need to be signed in to access
        
        - /[model]
            Generic route for a model retrived from database 
            For example, /brain goes to [model] where model = "brain"
        - /admin
            Only admin access allowed for any route in here
            - addModel
                - Handles logic for uploading new models. Accepts a .obj, .mtl and a .txt file
        - /settings
            Landing page after auth where all the models user can access are displayed   
    
    - ### /api/ 
        - Backend routes that couldnt be converted into server actions
          - /auth/[...nextauth] 
               Handles Authjs events
          - / models
               Handles GET and POST requests to /api/models
            - [id]
              - Handles GET, PUT and DELETE requests to individuals within the Models collection
    - ### /auth/
        - Handles custom auth login
          - signin
          - register
          - verify email
          - password reset
    - ### /components/
        - Custom component library
          - /three
            Custom components abstracting away three.js use
          -/auth
            Custom components used throughout auth routes
           - /ui
            Custom buttons and form components to use with react-hook-form   
    - ### /data 
        Utils to abstract prisma use 
    
    - ### /lib
        Misc utils
        - db.ts - create prisma object [Singleton]
        - mail.ts - create mail utils with Resend API
        - token.ts - generate and grab tokens using email and the token header
    - ### /models
      - All models are stored here in development
      - TO be moved to a file server in production
    - ### /prisma
        - Define prisma schema
    - ### /schema
        - Define custom typescript types 
    - ### middleware.ts
        - Defining middlewares to be run between frontend and backend and implementing route protection. See routes.ts
    - ### routes.ts
        - Defining public, auth and adminonly routes. Be cautious editing this file. 


# Important files

- /lib/db.ts - Contains prisma instance of db. Used to manage all calls to the db

- /prisma/schema.prisma - Contains prisma Schema of the mySQL database
- schema/index.js - Contains all form schemas and zod validation logic
- auth.ts - auth config
- auth.config.ts - Prisma can't handle edge services so all edge functionality is handled here
- 