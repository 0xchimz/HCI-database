# HCI

apidoc for HCI database api

**Server IP & Port** `52.37.98.127:3000`

ดู ตัวอย่างการใช้งาน [คลิก](./Example.md)

### ทำความเข้าใจเรื่องรูปแบบข้อมูลก่อน
-	ข้อมูลที่จัดเก็บจะเป็น Object 1 ก้อนเท่าัน้น
-	Properties ของ Object ที่ว่าจะมีกี่ตัวก็ได้ จะชื่ออะไรก็ได้ตั้งเอาเองได้
-	ข้างใน Properties จะเก็บข้อมูลเป็น Type อะไรก็ได้ arrya string int ...
- 	ข้างใน Properties จะเก็บข้อมูลเท่าไรก็ได้ไม่มีจำกัด (จนกว่าจะ hdd เต็ม)

**ตัวอย่างการเก็บข้อมูล ที่แนะนำ**
```javascript
{
	"5610546231": {
		"name": "Chin"
		"course": [courseID:int]
	},
	"5610546232": {
		"name": "ChinBi"
		"course": [courseID:int]
	},
	. 	.
	. 	.
	. 	.
}
```
**หรือ (ไม่แนะนำเพราะใช้ยาก)**
```javascript
{
	"web_information": {
		"name": "HCI"
		"numOfStudent": int
	},
	"student_list": [
		{
			"StudentID": "561054631"
			"name": "Chin"
			. 	.
			. 	.
		},
		{
			"StudentID": "561054632"
			"name": "ChinBi"
			. 	.
			. 	.
		},
	],
	. 	.
	. 	.
	. 	.
}
```
**ห้ามเก็บแบบนี้**
```javascript
[		<< ห้ามใช้ Array นะจ๊ะ ชั้นแรกต้องเป็น object เท่านั้น
	{....},
	{....}
]

```
**แบบนี้ก็ไม่ได้นะ**
```javascript
{
	[		<< ใน object ต้องมี properties ก่อน จะยัด array ลงไปเลยไม่ได้
		{},
		{}
	]
}
```

## APIdoc

### 1. Show All Data

ตอบกลับข้อมูลทั้งหมดของ Student ID นั้นๆในฐานข้อมูล

**URL** `/:studentId?pin=:pin`

**Method** `GET`

**URL Params**
- Required 
	- `studentId` 	: รหัสนิสิตของตัวเอง
	- `pin`			: pin ตัวเลข 4 หลักที่เคยกรอกใน google form

**Data Params**
	
	None

**Success Response**
- 	Code `200`
	
	Content: `{userData}`

**Error Response**
-	Code `404` 
	
	Student ID and PIN are incorrect.

**Sample Code**
```javascript
$.ajax({
	url: "/5610546231?pin=1234",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
```

### 2. Update Data or Insert New Data

-	ในกรณีที่มี properties ชื่อนั้นๆอยู่แล้ว จะ อัพเดท properties ใน object 
-	ในกรณีที่ยังไม่มี properties ชื่อนั้นใน object จะสร้าง properties ใหม่ให้ทันที

**URL** `/:studentId?pin=:pin`

**Method** `POST`

**URL Params**
- Required 
	- `studentId` 	: รหัสนิสิตของตัวเอง
	- `pin`			: pin ตัวเลข 4 หลักที่เคยกรอกใน google form

**Data Params**
	
ข้อมูลที่ต้องส่งไปพร้อมกับการ POST
```javascript
{
    "56105462xx": {
        . . .
    },
    "56105462xx": {
		. . .
	}
}
```

**Success Response**
- 	Code `200`
	
	Content: `{userData}`

**Error Response**
-	Code `404` 
	
	Student ID and PIN are incorrect.

**Sample Code**

```javascript
$.ajax({
	url: "/5610546231?pin=1234",
    type : "POST",
    data : {ข้อมูลที่ต้องการจะบันทึกลง database},  	<< ห้ามส่งเป็น Array
    success : function(r) {
      console.log(r);
    }
  });
```

### 3. Get Properties Data

ตอบกลับค่าที่อยู่ใน property นั้นๆทั้งหมด

**URL** `/:studentId/:property?pin=:pin`

**Method** `GET`

**URL Params**
- Required 
	- `studentId` 	: รหัสนิสิตของตัวเอง
	- `pin`			: pin ตัวเลข 4 หลักที่เคยกรอกใน google form
	- `property`	: ชื่อ property ที่ต้องการ get ค่า

**Data Params**
	
	None

**Success Response**
- 	Code `200`
	
URL `/5610546231/5610546232?pin=1234`

```javascript
{
	stdId: 5610546232,
	name: String,
	courses: [courseID:Int]
}
```

**Error Response**
-	Code `404` 
	
	Student ID and PIN are incorrect.

**Sample Code**

```javascript
$.ajax({
	url: "/5610546231/5610546232?pin=1234",
    type : "GET",
    success : function(r) {
      console.log(r);
    }
  });
```

### 4. Delete Properties

ลบ property

**URL** `/:studentId/:property?pin=:pin`

**Method** `DELETE`

**URL Params**
- Required 
	- `studentId` 	: รหัสนิสิตของตัวเอง
	- `pin`			: pin ตัวเลข 4 หลักที่เคยกรอกใน google form
	- `property`	: ชื่อ property ที่ต้องการลบ

**Data Params**
	
	None

**Success Response**
- 	Code `200`
	
URL `/5610546231/5610546232?pin=1234`

```javascript
{
	message: 'Property [5610546232] is deleted'
}
```

**Error Response**
-	Code `404` 
	
	Student ID and PIN are incorrect.

-	Code `401` 
	
	Property not found.

**Sample Code**

```javascript
$.ajax({
	url: "/5610546231/5610546232?pin=1234",
    type : "DELETE",
    success : function(r) {
      console.log(r);
    }
  });
```