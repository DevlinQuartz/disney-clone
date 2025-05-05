package database

import (
	"fmt"
	"log"
	"time"

	"gorm.io/driver/sqlserver" // We'll need to add this dependency
	"gorm.io/gorm"             // And this one
	"gorm.io/gorm/logger"

	"disney-clone/configs" // Import the config package
)

// DB is the global database connection instance.
var DB *gorm.DB

// ConnectDB initializes the database connection using the provided configuration.
func ConnectDB(config configs.EnvConfig) (*gorm.DB, error) {
	var err error

	dsn := fmt.Sprintf("sqlserver://%s:%s@%s?database=%s&encrypt=disable", // Added encrypt=disable for potentially easier local setup
		config.DBUsername,
		config.DBPassword,
		config.DBServer,
		config.DBName,
	)

	// Configure GORM logger
	newLogger := logger.New(
		log.New(log.Writer(), "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second, // Slow SQL threshold
			LogLevel:                  logger.Info, // Log level (Silent, Error, Warn, Info)
			IgnoreRecordNotFoundError: true,        // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,        // Disable color
		},
	)

	DB, err = gorm.Open(sqlserver.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})

	if err != nil {
		log.Printf("Failed to connect to database: %v\n", err)
		return nil, fmt.Errorf("failed to connect database: %w", err)
	}

	log.Println("Database connection successfully established.")

	// Optional: Configure connection pool settings
	sqlDB, err := DB.DB()
	if err != nil {
		log.Printf("Failed to get underlying sql.DB: %v\n", err)
		return nil, fmt.Errorf("failed to get underlying sql.DB: %w", err)
	}
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	return DB, nil
}
