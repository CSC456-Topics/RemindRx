resource "aws_elastic_beanstalk_application" "application" {
  name = "nextapp"
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "nextapp-environment"
  cname_prefix        = "nextappIvanC112"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.5.1 running Node.js 22"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}
