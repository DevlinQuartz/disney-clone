package models

// We might need gorm.io/gorm for gorm.Model or DeletedAt if we add them later

// User represents the structure of the 'users' table in the database.
type User struct {
	// We use uint for ID as it's common for auto-incrementing primary keys in GORM.
	// GORM handles the mapping to INT IDENTITY in SQL Server.
	ID       uint   `gorm:"primaryKey;autoIncrement"`
	Username string `gorm:"type:varchar(100);not null;unique"`
	Password string `gorm:"type:varchar(255);not null"`

	// Optional: Add GORM's standard fields if needed later
	// gorm.Model // Includes ID, CreatedAt, UpdatedAt, DeletedAt
	// Or just specific ones:
	// CreatedAt time.Time
	// UpdatedAt time.Time
	// DeletedAt gorm.DeletedAt `gorm:"index"`
}

// TableName explicitly sets the table name for GORM.
// Although GORM can often infer it, being explicit avoids potential issues.
func (User) TableName() string {
	return "users"
}
