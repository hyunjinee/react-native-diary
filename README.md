# React-Native Diary

## 화면 설계

![Diary Screen Structure](https://user-images.githubusercontent.com/63354527/169354235-3146d162-5ee7-43e6-8765-ac4865953259.png)

RootStack은 네이티브 스택 내비게이션이고, MainTab은 하단 탭 내비게이션입니다.

- FeedsScreen은 작성한 글을 목록형태로 보여주는 화면
- CalendarScreen은 달력 형태로 글을 조회하는 화면
- SearchScreen은 글을 검색할 수 있는 화면
- WriteScreen은 글을 작성하거나 수정하는 화면인데, MainTab에 넣지 않고 RootStack에 넣어서 화면이 나타날 때는 하단 탭이 나타나지 않도록 설정
