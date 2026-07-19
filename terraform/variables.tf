variable "render_api_key" {
  description = "Render API key. Set this securely using TF_VAR_render_api_key or a terraform.tfvars file."
  type        = string
  sensitive   = true
}

variable "service_name" {
  description = "Name of the Render web service."
  type        = string
  default     = "ecommerce-node-api"
}

variable "github_repo" {
  description = "GitHub repository in the format owner/repo."
  type        = string
}

variable "github_branch" {
  description = "Branch to deploy from."
  type        = string
  default     = "main"
}

variable "render_region" {
  description = "Render region for deployment."
  type        = string
  default     = "ohio"
}

variable "render_plan" {
  description = "Render plan. Use free for portfolio/demo projects."
  type        = string
  default     = "free"
}

variable "build_command" {
  description = "Build command for your Node.js app."
  type        = string
  default     = "npm install"
}

variable "start_command" {
  description = "Start command for your Node.js app. Change this if your app uses a different entry point."
  type        = string
  default     = "npm start"
}

variable "health_check_path" {
  description = "Health check endpoint used by Render."
  type        = string
  default     = "/"
}