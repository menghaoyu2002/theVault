# The Vault
An NFT storing service. Maybe an NFT Musuem.

Honestly, I'm just learning to store some files and pixels in the backend.

# Running
To install dependencies run `npm install`

To compile the TypeScript to JavaScript run `npm run build` or `npm run clean` for a clean build.

To start the server for production run `npm run start`. You need to build to run this command.

To start the server for development run `npm run dev`

# Deployment
I deployed this on Heroku <s>but I didn't know that Heroku didn't give you an actual hard-drive/filesystem. This means that although this API may run, it will refuse to upload and allow viewing of the images. I will probably need to use some third part object/image storage like Cloundinary or S3 buckets.</s> Done! Image storage done with cloudinary.
