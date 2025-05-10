resource "aws_elastic_beanstalk_application" "application" {
  name = "frontend"
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "frontend-env"
  cname_prefix        = "frontendishmamf"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.5.1 running Node.js 22"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}
