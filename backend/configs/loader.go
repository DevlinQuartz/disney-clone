package configs

import (
	"log"

	"github.com/spf13/viper"
)

// LoadConfig loads configuration from .env file and environment variables using Viper.
func LoadConfig(path string) (config EnvConfig, err error) {
	log.Printf("Attempting to load configuration from path: %s\n", path)

	viper.AddConfigPath(path)   // Set the path to look for the config file in
	viper.SetConfigName(".env") // Set the name of the config file (without extension)
	viper.SetConfigType("env")  // Set the type of the config file

	viper.AutomaticEnv() // Read in environment variables that match

	// Attempt to read the config file
	err = viper.ReadInConfig()
	if err != nil {
		// Handle errors reading the config file
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// Config file not found; ignore error if desired and rely only on ENV vars
			log.Println("Warning: .env file not found. Relying on environment variables.")
			err = nil // Reset error if file not found is acceptable
		} else {
			// Config file was found but another error was produced
			log.Printf("Error reading config file: %s\n", err)
			// Return the error if reading the file is critical
			// return
		}
	} else {
		log.Println("Successfully loaded .env file using Viper.")
	}

	// Bind environment variables to the struct fields
	// Viper automatically binds struct fields if they match the env var name (case-insensitive)
	// or the mapstructure tag. Explicit BindEnv calls are often redundant if using AutomaticEnv
	// and matching names/tags, but can be useful for clarity or specific overrides.
	// Let's rely on AutomaticEnv and mapstructure tags for simplicity here.

	// Unmarshal the configuration into the EnvConfig struct
	err = viper.Unmarshal(&config)
	if err != nil {
		log.Fatalf("Unable to decode into struct, %v", err)
		return
	}

	// Log the loaded configuration for debugging
	log.Printf("Viper loaded config: %+v\n", config)

	// Basic validation (optional, add more as needed)
	if config.AppPort == "" {
		config.AppPort = "8080" // Default port if not set
	}
	if config.DBServer == "" || config.DBName == "" || config.DBUsername == "" {
		log.Fatalf("Database configuration (DB_SERVER, DB_NAME, DB_USERNAME) is missing")
		// Note: DB_PASSWORD can be empty for some auth methods, so not checking it here.
	}
	if config.JWTSecret == "" {
		log.Fatalf("JWT_SECRET is missing")
	}

	return
}
