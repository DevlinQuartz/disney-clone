package service

import (
	"disney-clone/internal/user/models"
)

// UserService defines the interface for user business logic.
type UserService interface {
	// RegisterUser handles the logic for creating a new user, including password hashing.
	RegisterUser(username, password string) (*models.User, error)

	// LoginUser handles user authentication logic.
	// It will likely return a token (e.g., JWT) in a real application, but let's start simple.
	LoginUser(username, password string) (*models.User, error) // We might change the return type later

	// GetUserByID retrieves a user by their ID.
	GetUserByID(id uint) (*models.User, error)
}
