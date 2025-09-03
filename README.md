# API Movie Directors

## Deskripsi
Project ini adalah implementasi **API CRUD sederhana** menggunakan Node.js dan Express.  
Tugas ini mencakup dua resource utama:
- **Movies** (id, title, year, directorId)
- **Directors** (id, name, birthYear)

## Fitur CRUD
- **Movies**
  - GET `/movies` → ambil semua data film
  - GET `/movies/:id` → ambil detail film
  - POST `/movies` → tambah film baru
  - PUT `/movies/:id` → update film
  - DELETE `/movies/:id` → hapus film

- **Directors**
  - GET `/directors` → ambil semua sutradara
  - GET `/directors/:id` → ambil detail sutradara
  - POST `/directors` → tambah sutradara baru
  - PUT `/directors/:id` → update sutradara
  - DELETE `/directors/:id` → hapus sutradara

## Cara Menjalankan
1. Clone repository:
   ```bash
   git clone https://github.com/USERNAME/api-movies-directors.git
   cd api-movies-directors
