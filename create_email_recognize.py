import boto3
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication

def lambda_handler(event, context):
    
    ses = boto3.client("ses")
    s3 = boto3.client("s3")
    client = boto3.client("rekognition")

    for i in event["Records"]:
        action = i["eventName"]
        ip = i["requestParameters"]["sourceIPAddress"]
        bucket_name = i["s3"]["bucket"]["name"]
        object = i["s3"]["object"]["key"]
        
    res = client.detect_labels(Image = {"S3Object" : {"Bucket" : bucket_name, "Name": object}},MaxLabels = 3,MinConfidence = 80)
    
    a = res.get('Labels')[0].get('Name') + ' with confidence ' + str(res.get('Labels')[0].get('Confidence'))
    b = res.get('Labels')[1].get('Name') + ' with confidence ' + str(res.get('Labels')[1].get('Confidence'))
    c = res.get('Labels')[2].get('Name') + ' with confidence ' + str(res.get('Labels')[2].get('Confidence'))

    fileObj = s3.get_object(Bucket = bucket_name, Key = object)
    file_content = fileObj["Body"].read()

    sender = "ajachintu@gmail.com"
    to = "ajachintu@gmail.com"
    to_to = "srinivask.bits@gmail.com"
    subject = str(action) + 'Event from ' + bucket_name
    body = """
        <br>
        This email is to notify you regarding {} event.
        The object {} is uploaded.
        Source IP: {}
        <br>
        Here identification of image : 
        <br>
        {}
        <br>
        {}
        <br>
        {}
    """.format(action, object, ip, a,b,c)

    msg = MIMEMultipart()
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = to

    body_txt = MIMEText(body, "html")

    attachment = MIMEApplication(file_content)
    attachment.add_header("Content-Disposition", "attachment", filename=object)

    msg.attach(body_txt)
    msg.attach(attachment)

    response = ses.send_raw_email(Source = sender, Destinations = [to,to_to], RawMessage = {"Data": msg.as_string()})
    
    return "Thanks"