terraform {
  backend "s3" {
    bucket = "terraform-state-remindrx-ishmamf"
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}