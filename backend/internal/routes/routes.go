package routes

import (
	"github.com/gin-contrib/cors" // Add this import
	"github.com/gin-gonic/gin"
	"gorm.io/gorm" // Need DB for dependency injection

	// Import handlers, services, repositories
	userHandler "disney-clone/internal/user/handler"
	userRepo "disney-clone/internal/user/repository"
	userService "disney-clone/internal/user/service"
	// Import other handlers as they are created
)

// SetupRoutes configures the main application router.
func SetupRoutes(db *gorm.DB) *gin.Engine {
	router := gin.Default() // Starts with default middleware (logger, recovery)

	// Add CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Vite's default port
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "UP"})
	})

	// API v1 Group
	apiV1 := router.Group("/api/v1")

	// --- Dependency Injection ---
	// User
	userRepository := userRepo.NewUserRepository(db)
	userSvc := userService.NewUserService(userRepository)
	userHdlr := userHandler.NewUserHandler(userSvc)

	// --- Route Setup ---
	userHdlr.SetupUserRoutes(apiV1) // Setup routes like /api/v1/users/register

	// Add other route setups here...
	// e.g., movieHandler.SetupMovieRoutes(apiV1)

	return router
}
