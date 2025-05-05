package handler

import (
	"net/http"

	"github.com/gin-gonic/gin" // We'll need to add this dependency

	// Use our custom errors

	"disney-clone/internal/user/service"
)

// UserHandler handles HTTP requests related to users.
type UserHandler struct {
	userService service.UserService
}

// NewUserHandler creates a new instance of UserHandler.
func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

// RegisterRequest defines the expected JSON body for user registration.
type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// LoginRequest defines the expected JSON body for user login.
type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// UserResponse defines the user data returned in responses (excluding sensitive info).
type UserResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	// Add other fields like CreatedAt if needed
}

// Register handles the POST /users/register endpoint.
func (h *UserHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
		return
	}

	user, err := h.userService.RegisterUser(req.Username, req.Password)
	if err != nil {
		// Handle specific errors, e.g., username taken
		if err.Error() == "username already taken" { // Improve error handling later
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		// Handle other potential service errors
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"}) // Avoid exposing internal errors
		return
	}

	// Return the created user details (without password)
	resp := UserResponse{
		ID:       user.ID,
		Username: user.Username,
	}
	c.JSON(http.StatusCreated, resp)
}

// Login handles the POST /users/login endpoint.
func (h *UserHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body: " + err.Error()})
		return
	}

	user, err := h.userService.LoginUser(req.Username, req.Password)
	if err != nil {
		// Check for specific "invalid credentials" error from the service
		// Note: We defined ErrInvalidCredentials in the service layer
		if err.Error() == "invalid username or password" { // Improve error checking later
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		// Handle other potential service/database errors
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Login failed"}) // Avoid exposing internal errors
		return
	}

	// Login successful. Return user info (without password).
	// Later, we'll generate and return a JWT token here instead.
	resp := UserResponse{
		ID:       user.ID,
		Username: user.Username,
	}
	c.JSON(http.StatusOK, resp)
}

// Add GetUserByID handler here later...

// SetupUserRoutes configures the user-related routes for the Gin engine.
func (h *UserHandler) SetupUserRoutes(router *gin.RouterGroup) {
	userRoutes := router.Group("/users")
	{
		userRoutes.POST("/register", h.Register)
		userRoutes.POST("/login", h.Login) // Uncommented this line
		// userRoutes.GET("/:id", h.GetUserByID) // Requires auth middleware later
	}
}
