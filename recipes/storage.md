# Overview

Do you want to add file uploads? What about image uploads? Do this shit!

# Locally

 1. Add new `.env_sample` and `.env` entries
    ```yaml
    AWS_S3_ENDPOINT_URL=http://host.docker.internal:9000/
    AWS_ACCESS_KEY_ID=minioadmin
    AWS_SECRET_ACCESS_KEY=minioadmin
    AWS_STORAGE_BUCKET_NAME=bucket
    ```
 1. Add `minio` and `createbuckets` to your `docker-compose.yml` under `services`
    ```yaml
      minio:
        image: minio/minio:RELEASE.2021-06-14T01-29-23Z
        entrypoint: sh
        command: -c 'minio server /storage'
        env_file: .env
        environment:
          MINIO_ROOT_USER: "${AWS_ACCESS_KEY_ID}"
          MINIO_ROOT_PASSWORD: "${AWS_SECRET_ACCESS_KEY}"
        volumes:
          - ./volumes/minio:/storage
        ports:
          - 9000:9000
          - 9001:9001

      create_buckets:
        image: minio/mc
        depends_on:
          - minio
        env_file: .env
        entrypoint: >
          /bin/sh -c "
              # keep trying to login until we're ready
              until (mc config host add myminio http://minio:9000 $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY) do
                echo '...waiting...' && sleep 1;
              done;

              # create bucket and set perms to public..
              mc mb myminio/$AWS_STORAGE_BUCKET_NAME
              mc anonymous set upload myminio/$AWS_STORAGE_BUCKET_NAME
              mc anonymous set download myminio/$AWS_STORAGE_BUCKET_NAME
              mc anonymous set public myminio/$AWS_STORAGE_BUCKET_NAME

              exit 0
          "
    ```
 1. add `django-storages[boto3]==1.13.2` to `requirements.txt`
 1. for image uploads also add `pillow==9.4.0` to `requirements.txt`
 1. add `storages` to `INSTALLED_APPS`
 1. set default storage and AWS settings
    ```python
    # in base.py
    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3boto3.S3Boto3Storage"
        },
    }
    
    # =============================================================================
    # AWS
    # =============================================================================
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', "minioadmin")
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY', "minioadmin")
    AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME', "bucket")
    AWS_S3_REGION_NAME = os.environ.get("AWS_S3_REGION_NAME", None)
    AWS_DEFAULT_ACL = os.environ.get('AWS_DEFAULT_ACL', None)
    AWS_S3_ENDPOINT_URL = os.environ.get('AWS_S3_ENDPOINT_URL', None)
    AWS_QUERYSTRING_AUTH = False
    AWS_S3_SIGNATURE_VERSION = "s3v4"
    AWS_S3_FILE_OVERWRITE = False
    ```

# On AWS

1. Allow public access to your bucket.
2. Set your s3 bucket policy to something like the below. Replace `<BUCKET NAME>` and `<USER ARN>` from your IAM page.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "<USER ARN>"
                },
                "Action": [
                    "s3:PutObject",
                    "s3:GetObjectAcl",
                    "s3:GetObject",
                    "s3:ListBucket",
                    "s3:DeleteObject",
                    "s3:PutObjectAcl"
                ],
                "Resource": [
                    "arn:aws:s3:::<BUCKET NAME>/*",
                    "arn:aws:s3:::<BUCKET NAME>"
                ]
            }
        ]
    }
    ```
    
# Let's make sure things are working!
1. You should be able to head over to `http://localhost:9000/minio/` and login using `minioadmin` and `minioadmin`.
2. If you can get to this screen you're all set up! 

<img width="1087" alt="image" src="https://github.com/ckc-org/skeletor/assets/15066160/90b5a76a-ccf1-4333-86c9-b903936d40c0">


