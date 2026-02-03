# Valentine's Day API Backend

This is the backend API for the Valentine's Day proposal application.

## Setup

1. Install PHP dependencies:
```bash
composer install
```

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Run migrations:
```bash
php artisan migrate
```

5. Start the development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /api/proposal/respond` - Handle proposal response
- `GET /api/proposal/responses` - Get all responses
