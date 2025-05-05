package repository

import (
	"disney-clone/internal/user/models" // Import the user model
)

// UserRepository defines the interface for user data operations.
type UserRepository interface {
	// We'll add methods here as needed, e.g., CreateUser, GetUserByUsername, GetUserByID
	CreateUser(user *models.User) error
	FindByUsername(username string) (*models.User, error)
	FindByID(id uint) (*models.User, error)
	// Add other methods like UpdateUser, DeleteUser etc. later
}
