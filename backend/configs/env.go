package configs

// EnvConfig holds the application's configuration loaded from environment variables.
type EnvConfig struct {
	AppPort     string `mapstructure:"APP_PORT"`
	Environment string `mapstructure:"ENVIRONMENT"`
	JWTSecret   string `mapstructure:"JWT_SECRET"`
	DBUsername  string `mapstructure:"DB_USERNAME"`
	DBPassword  string `mapstructure:"DB_PASSWORD"`
	DBServer    string `mapstructure:"DB_SERVER"`
	DBName      string `mapstructure:"DB_NAME"`
}
