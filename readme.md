LESSON4 : Authentication va Authorization

1/ Xác thực người dùng session và cookie -> xác thực

cookie-parser,express-session

- Nhược điểm :mất session khi restart server
- nhiều web server ->

2/ JWT -> jsonwebtoken
3 thành phần các nhau bởi dấu chấm :
Header,Body,Footer

Sign,Verify
Sign -> tao token -> send client
Verify -> xac thuc token
