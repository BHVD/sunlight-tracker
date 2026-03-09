# Feature Matrix — Sunlight Tracker

## Legend
- ✅ Implemented: Đã có trong app
- 🟡 Partial: Có phần giao diện/logic, nhưng chưa kết nối đầy đủ hoặc còn placeholder
- 🔲 Planned: Chưa thấy triển khai trong code hiện tại

## Core Features

| Feature | Status | Scope | Notes |
|---|---|---|---|
| Tab navigation (Home, Reminders, Weekly Report, Tips, Settings) | ✅ Implemented | Navigation | Định nghĩa đầy đủ 5 tab bằng Expo Router. |
| Home summary (location, weather, best sun time) | ✅ Implemented | Home | Lấy vị trí, reverse geocode, gọi OpenWeatherMap, hiển thị lỗi nếu thất bại. |
| Sunlight timer (start/pause/reset) | ✅ Implemented | Home | Timer theo giây, hiển thị mm:ss, reset được. |
| Save sunlight minutes per day | ✅ Implemented | Home + Storage | Lưu `sunlightToday` trong AsyncStorage khi bấm Save. |
| Daily progress bar (goal 30 min) | ✅ Implemented | Home | Tính tiến độ và hiển thị trạng thái hoàn thành. |
| Upcoming reminder countdown | 🟡 Partial | Home | Có hiển thị thời gian còn lại; nút “Change Reminder Settings” chưa thấy điều hướng. |
| Daily notification scheduling | ✅ Implemented | Reminders | Lên lịch nhắc lặp theo giờ/phút đã chọn, có bật/tắt reminder. |
| Reminder settings persistence | ✅ Implemented | Reminders + Storage | Lưu `reminderEnabled`, `reminderTime` vào AsyncStorage. |
| Weekly chart report | ✅ Implemented | Weekly Report | Hiển thị bar chart theo 7 ngày. |
| Weekly vitamin D level + recommendation | ✅ Implemented | Weekly Report | Tính average và phân loại Good/Moderate/Low. |
| Seasonal tips content | ✅ Implemented | Tips | Có nhóm tips theo mùa/thời tiết. |
| Theme settings (follow system/manual dark) | ✅ Implemented | Settings + Context | Có đồng bộ theme hệ thống và override thủ công. |
| Temperature unit setting (°C/°F) | ✅ Implemented | Settings + Summary | Ảnh hưởng trực tiếp API weather units và cách hiển thị. |
| Language toggle (EN/VI) | 🟡 Partial | Settings + Context | Có state/persistence, nhưng nội dung UI chưa i18n thực sự (đa số text hardcode). |
| Feedback / Privacy links | 🟡 Partial | Settings | Có UI nhưng chưa gắn hành động/link thực tế. |

## Technical/Platform Features

| Feature | Status | Scope | Notes |
|---|---|---|---|
| Global app settings context | ✅ Implemented | Architecture | Context quản lý theme/language/temperature unit. |
| Local persistence via AsyncStorage | ✅ Implemented | Data | Dùng cho settings, reminder, sunlightToday. |
| Dynamic theme color tokens | ✅ Implemented | UI System | Hook `useThemeColor` lấy token light/dark từ `constants/Colors`. |
| Animated screen elements | ✅ Implemented | UX | Dùng `react-native-animatable` và `react-native-reanimated`. |
| Real backend sync (cloud account/history) | 🔲 Planned | Data | Chưa thấy API/backend lưu lịch sử người dùng. |
| Real weekly data sourced from tracked days | 🟡 Partial | Weekly Report | Dữ liệu chart hiện là mảng hardcoded, chưa đọc từ nhật ký thực tế. |

## Suggested Next Priorities

1. Kết nối nút “Change Reminder Settings” trên Home tới màn hình Reminder Settings.
2. Thay dữ liệu weekly hardcoded bằng dữ liệu lưu theo ngày thực tế.
3. Bổ sung i18n thực (dictionary + key-based strings) cho EN/VI.
4. Gắn action thật cho Feedback và Privacy Policy.
5. Tách API key ra khỏi source code và dùng biến môi trường cấu hình build.
