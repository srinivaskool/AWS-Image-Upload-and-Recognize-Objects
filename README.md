# AWS-Image-Upload-and-Recognize-Objects

Sends automatic mail by SES and Lambda when the S3 bucket is modified. Also recognizes the objects in the image uploaded.     
<br>

<p align="center">
  <img  src="README-IMAGES\res3.PNG" >  
</p>

Deployed on Amplify - [Live Demo](https://master.d1i2p3fuorz4wv.amplifyapp.com/)

AWS S3 file Upload URL -
https://dvp1syfwe3.execute-api.eu-west-1.amazonaws.com/dev/image-upload


### Table of Contents

- [Description](#description)
- [Process](#analysis)
- [Results](#results)
- [Project Layout](#project-layout)
- [References](#references)
- [Author Info](#author-info)

---

## Description

<br>

Using AWS services, I built a serverless portal in which we can upload an image and the image will be store in an S3 bucket and showed on the portal page, Also the admin will get the mail which includes the image attachment along with the 3 things detected in the image with confidence level and also the details of image upload like name of the image, time of upload, Ip address.  

### Services Used

- AWS Lambda
- AWS S3
- AWS SES
- rekognition
- AWS Amplify

### For Execution
You need an AWS account. Then clone the repository and create lambda and s3 buckets with the same names given in the code. Then run the react app using npm start to upload the image.

---

## Process

The image is uploaded to the S3 bucket through the react website, the trigger will call the lambda function, and using SES we send a mail to admin with image attachment and top 3 objects detected in that image.
<br>

<p align="center">
  <img  src="README-IMAGES\Process-1.png" >  
</p>

---

## Results
### Example 1
When you upload this image
<p align="center">
  <img  src="README-IMAGES\photo.jpg" >  
</p>
The mail is 
<p align="center">
  <img  src="README-IMAGES\res2.PNG" >  
</p>
<br>

### Example 2
When you upload this image
<p align="center">
  <img  src="README-IMAGES\pexels-photo-5082572.jpeg" >  
</p>
The mail is 
<p align="center">
  <img  src="README-IMAGES\res1.PNG" >  
</p>

### Example 3
When you delete above image from the S3 bucket
<p align="center">
  <img  src="README-IMAGES\delete_result.PNG" >  
</p>


#### [Back To The Top](#AWS-Image-Upload-and-Recognize-Objects)

---

## Project Layout

```
AWS-Image-Upload-and-Recognize-Objects
├─ .git
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ main
│  │     └─ remotes
│  │        └─ origin
│  │           └─ HEAD
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-452e51429bee301a3b29efcb25c066f1bdae522f.idx
│  │     └─ pack-452e51429bee301a3b29efcb25c066f1bdae522f.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ create_email_recognize.py
├─ delete_email.py
├─ lambdas
│  ├─ common
│  │  └─ S3.js
│  └─ endpoints
│     ├─ imageUpload.js
│     └─ sendEmail.js
├─ package-lock.json
├─ package.json
├─ README-IMAGES
│  ├─ pexels-photo-5082572.jpeg
│  ├─ photo.jpg
│  ├─ res1.PNG
│  ├─ res2.PNG
│  └─ res3.PNG
├─ README.md
├─ serverless.yml
└─ webpack.config.js

```

---

## References

- [AWS](https://aws.amazon.com/)

---

## Author Info

- LinkedIn - [Srinivas K](https://www.linkedin.com/in/srinivas-konduri/)
- Github - [Srinivas K](https://github.com/srinivaskool)

#### [Back To The Top](#AWS-Image-Upload-and-Recognize-Objects)


