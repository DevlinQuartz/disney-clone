package service

import (
	"errors" // Import standard errors package

	"gorm.io/gorm" // Import gorm for ErrRecordNotFound

	"disney-clone/internal/user/models"
	"disney-clone/internal/user/repository"
	"disney-clone/internal/utils"
)

// Predefined service errors
var (
	ErrInvalidCredentials = errors.New("invalid username or password")
	// Add other user-service specific errors here if needed
)

// userService implements the UserService interface.
type userService struct {
	userRepo repository.UserRepository
	// Add other dependencies like JWT secret or logger if needed later
}

// NewUserService creates a new instance of UserService.
func NewUserService(userRepo repository.UserRepository) UserService {
	return &userService{userRepo: userRepo}
}

// RegisterUser handles user creation, including password hashing.
func (s *userService) RegisterUser(username, password string) (*models.User, error) {
	// Basic validation (can be expanded)
	if username == "" || password == "" {
		return nil, errors.New("username and password cannot be empty")
	}

	// Check if username already exists (optional, depends on desired error handling)
	_, err := s.userRepo.FindByUsername(username)
	if err == nil {
		// User found, username already exists
		return nil, errors.New("username already taken")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		// An unexpected database error occurred
		return nil, err
	}
	// If err is gorm.ErrRecordNotFound, it's safe to proceed

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		// Log the error internally?
		return nil, errors.New("failed to hash password") // Avoid exposing internal details
	}

	user := &models.User{
		Username: username,
		Password: hashedPassword,
	}

	err = s.userRepo.CreateUser(user)
	if err != nil {
		// Log the error internally?
		return nil, errors.New("failed to create user") // Avoid exposing internal details
	}

	// Don't return the password hash in the response model usually.
	// We might create a DTO (Data Transfer Object) later for responses.
	// For now, returning the created user model (including hash).
	return user, nil
}

// LoginUser authenticates a user based on username and password.
func (s *userService) LoginUser(username, password string) (*models.User, error) {
	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrInvalidCredentials // Use the locally defined error
		}
		// Log the internal error?
		return nil, errors.New("database error during login") // Generic error
	}

	if !utils.CheckPasswordHash(password, user.Password) {
		return nil, ErrInvalidCredentials // Use the locally defined error
	}

	// Login successful
	// Again, consider returning a DTO without the password hash.
	return user, nil
}

// GetUserByID retrieves a user by their ID.
func (s *userService) GetUserByID(id uint) (*models.User, error) {
	user, err := s.userRepo.FindByID(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Consider returning a specific "not found" error from this layer too
			return nil, errors.New("user not found")
		}
		// Log internal error?
		return nil, errors.New("database error retrieving user")
	}
	// Consider returning a DTO without the password hash.
	return user, nil
}
