# ตัวอย่างการใช้งาน

Student ID: `5555555555`

PIN: `1234`

สมมติ Account ID `5555555555` Get แล้วมีข้อมูลดังนี้

**GET** `/5555555555?pin=1235`

```javascript
{
	"message": "Student ID and PIN are incorrect.",
	"error": {
		"status": 404
	}
}
```

**GET** `/5555555555?pin=1234`

Response
```javascript
{
	"5555555556": {
		"name": "Name1",
		"courses": ["123456", "1234567"]
	},
	"5555555557": {
		"name": "Name2",
		"courses": ["123456", "1234568"]
	}
}
```

ลอง

**POST** `/5555555555?pin=1234`

Data Params

```javascript
{
	"5555555558": {
		"name": "Name4",
		"courses": ["123458", "1234567"]
	},
	"5555555556": {
		"name": "Name3",
		"courses": ["123456", "1234568"],
		"Nickname": "Chin"
	}
}
```

Response
```javascript
{
	"5555555556": {			<< อัพเดทถ้า property มีชื่อเดียวกัน จะเปลี่ยนค่าข้างในหมดเลย
		"name": "Name3",
		"courses": ["123456", "1234568"]
		"Nickname": "Chin" 	<< ถ้าใน object มี perperty ใหม่มันจะโดนเพิ่มเข้ามาด้วย (คือมันแทน object ไปเลย)
	},
	"5555555557": {			<< property เดิมที่ไม่ซ้ำ ก็ไม่ได้อัพเดท
		"name": "Name2",
		"courses": ["123456", "1234568"]
	},
	"5555555558": {			<< property ใหม่ก็จะเพิ่มเข้าไปใน data ของคนนั้น
		"name": "Name4",
		"courses": ["123458", "1234567"]
	}
	.  .  .
	.  .  .
	.  .  .
}
```

ลอง

**GET** `/5555555555/5555555556?pin=1234`

จะแสดงข้อมูล student id `5555555556`

Response
```javascript
{
	stdId: "5555555556",
	"name": "Name3",
	"courses": ["123456", "1234568"]
	"Nickname": "Chin"
}
```

**DELETE** `/5555555555/5555555556?pin=1234`

จะแสดงข้อมูลทั้งหมดของ `5555555555`

```javascript
{
	"5555555557": {			<< property เดิมที่ไม่ซ้ำ ก็ไม่ได้อัพเดท
		"name": "Name2",
		"courses": ["123456", "1234568"]
	},
	"5555555558": {			<< property ใหม่ก็จะเพิ่มเข้าไปใน data ของคนนั้น
		"name": "Name4",
		"courses": ["123458", "1234567"]
	}
	.  .  .
	.  .  .
	.  .  .
}
```