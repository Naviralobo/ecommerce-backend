output "service_name" {
  description = "Name of the deployed Render service."
  value       = render_service.backend.name
}

output "service_url" {
  description = "Public URL of the deployed Render service."
  value       = render_service.backend.url
}