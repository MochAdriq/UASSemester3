# User_events API

### Create acara baru API

POST /api/events

Headers : 
- Authorization : token

Request Body :

```json
{
  "username": "nama_pengguna",
  "event_name": "Nama Acara Baru",
  "event_date": "2024-02-01T14:30:00",  // Format ISO 8601
  "location": "Lokasi Acara"
}
```

Response Body :

```json
{
  "event_id": 1,
  "username": "nama_pengguna",
  "event_name": "Nama Acara Baru",
  "event_date": "2024-02-01T14:30:00",
  "location": "Lokasi Acara"
}
```

Response Body Error:

```json
{
  "error": "InvalidInput",
  "message": "Data acara tidak valid. Pastikan semua field diisi dengan benar."
}
```

### Get acara dengan pengguna tertentu API

GET /api/events/:username

Headers : 
- Authorization : token

Request Body Succes:

```json
{
    "event_id": 1,
    "username": "nama_pengguna",
    "event_name": "Nama Acara 1",
    "event_date": "2024-02-01T14:30:00",
    "location": "Lokasi Acara 1"
  }
```

Request Body Error:
```json 
{
  "error": "UserNotFound",
  "message": "Pengguna dengan nama pengguna 'nama_pengguna' tidak ditemukan."
}

```

### Get detail acara API

GET /api/events/:event_id

Headers : 
- Authorization : token

Response Body Succes :

```json
{
  "event_id": 1,
  "username": "nama_pengguna",
  "event_name": "Nama Acara Baru",
  "event_date": "2024-02-01T14:30:00",
  "location": "Lokasi Acara"
}

```

Response Body Error :
```json
{
  "error": "EventNotFound",
  "message": "Acara dengan ID tersebut tidak ditemukan."
}

```

### Update Acara tertentu API

PUT /api/events/:event_id

Headers : 
- Authorization : token

Request Body :

```json
{
  "event_name": "Nama Acara yang Diperbarui",
  "event_date": "2024-02-15T16:00:00",
  "location": "Lokasi Acara yang Diperbarui"
}

```

Response Body Succes :

```json
{
  "event_id": 1,
  "username": "nama_pengguna",
  "event_name": "Nama Acara yang Diperbarui",
  "event_date": "2024-02-15T16:00:00",
  "location": "Lokasi Acara yang Diperbarui"
}

```

Response Body Error :

```json
{
  "error": "EventNotFound",
  "message": "Acara dengan ID Tersebut tidak ditemukan."
}

```
### Delete Acara Tertentu API

DELETE /api/events/:event_id

Headers : 
- Authorization : token

Response Body Succes :

```json
{
  "message": "Acara dengan ID Tersebut berhasil dihapus."
}



Response Body Error :
```json
{
  "error": "EventNotFound",
  "message": "Acara dengan ID Tersebut tidak ditemukan."
}
