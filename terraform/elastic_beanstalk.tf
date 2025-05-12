resource "aws_elastic_beanstalk_application" "application" {
  name = "RemindRX"
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "RemindRX-env"
  cname_prefix        = "dddictionaryRemindRX"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.5.1 running Python 3.12"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}
