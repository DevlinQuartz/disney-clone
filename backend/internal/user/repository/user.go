package repository

import (
	"errors"

	"gorm.io/gorm"

	"disney-clone/internal/user/models"
)

// userRepository implements the UserRepository interface.
type userRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new instance of UserRepository.
func NewUserRepository(db *gorm.DB) UserRepository {
	return &userRepository{db: db}
}

// CreateUser inserts a new user record into the database.
func (r *userRepository) CreateUser(user *models.User) error {
	// Consider adding password hashing here before saving
	result := r.db.Create(user)
	return result.Error
}

// FindByUsername retrieves a user by their username.
// Returns gorm.ErrRecordNotFound if the user is not found.
func (r *userRepository) FindByUsername(username string) (*models.User, error) {
	var user models.User
	result := r.db.Where("username = ?", username).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, gorm.ErrRecordNotFound // Return specific error for not found
		}
		return nil, result.Error // Return other DB errors
	}
	return &user, nil
}

// FindByID retrieves a user by their ID.
// Returns gorm.ErrRecordNotFound if the user is not found.
func (r *userRepository) FindByID(id uint) (*models.User, error) {
	var user models.User
	result := r.db.First(&user, id) // GORM's shorthand for finding by primary key
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, gorm.ErrRecordNotFound
		}
		return nil, result.Error
	}
	return &user, nil
}
