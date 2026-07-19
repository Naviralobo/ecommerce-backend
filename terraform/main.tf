# This creates a Render web service for your Node.js backend.
# For a portfolio project, the free plan is a good starting point.
resource "render_service" "backend" {
  name              = var.service_name
  type              = "web_service"
  env               = "production"
  region            = var.render_region
  plan              = var.render_plan
  repo              = var.github_repo
  branch            = var.github_branch
  build_command     = var.build_command
  start_command     = var.start_command
  auto_deploy       = true
  health_check_path = var.health_check_path

  # Important note:
  # Add your runtime environment variables in Render after deployment
  # (for example: NODE_ENV, PORT, JWT_SECRET, MONGO_URI, etc.).
}

