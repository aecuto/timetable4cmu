helpers4cmu | used ruby on rails

https://helpers4cmu.herokuapp.com

เว็บตารางเรียน เวอร์ชั่นใหม่ ว่างๆเลยเขียนเล่นๆ

old version
https://github.com/aecute/timetable4cmu

--------------------------------------
หลักการทำงาน

ผู้ใช้งาน จะใส่ รหัสประจำตัว นศ. มช แล้วเลือก ปีการศึกษา

เช่น รหัส 570510XXX เรียนเทอม 1 ปี 59 ก็จะเก็บ 159 กับ รหัส 57.....

ก็จะได้ url: https://www3.reg.cmu.ac.th/registYYY/public/result.php?id=XXXXXXXXX

YYY = 159 | XXXXXXXXX = รหัสนักศึกษา

ใช้ gem Nokogiri ในการดึงข้อมูลจากเว็บ public ของ มช

แล้วทำการเขียน อัลกอ ด้วย Ruby ช่วยให้จัดเรียงตารางสอน และเวลาสอบ เป็นต้น
