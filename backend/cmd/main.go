package main

import (
	"fmt"
	"log"

	"disney-clone/configs"
	"disney-clone/internal/routes"
	"disney-clone/pkg/database"
)

func main() {
	// Load configuration from the parent directory ("..") relative to cmd/
	cfg, err := configs.LoadConfig("..") // Changed path to ".."
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database
	db, err := database.ConnectDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto-migrate schema (optional, good for development)
	log.Println("Running database migrations...")
	// err = db.AutoMigrate(&userModels.User{}) // Requires import
	// if err != nil {
	// 	log.Fatalf("Failed to migrate database: %v", err)
	// }
	log.Println("Database migration check complete (AutoMigrate commented out for now).")

	// Setup routes
	router := routes.SetupRoutes(db) // Pass the DB connection

	// Start server
	serverAddr := fmt.Sprintf(":%s", cfg.AppPort)
	log.Printf("Starting server on %s\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
