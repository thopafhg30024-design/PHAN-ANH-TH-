import { QuizQuestion, DragMatchItem, PromptTemplate } from '../types';

export const PRIMARY_QUIZ: QuizQuestion[] = [
  {
    id: 'pri-1',
    level: 'primary',
    question: 'Dòng sông Mê Công bắt nguồn từ đâu và chảy qua tất cả bao nhiêu quốc gia?',
    options: ['Bắt nguồn từ Himalaya, chảy qua 4 nước', 'Bắt nguồn từ sơn nguyên Tây Tạng, chảy qua 6 quốc gia', 'Bắt nguồn từ Việt Nam, chảy qua 3 nước', 'Bắt nguồn từ Thái Lan, chảy qua 5 nước'],
    correctIndex: 1,
    explanation: 'Đúng rồi! Sông Mê Công bắt nguồn từ sơn nguyên Tây Tạng (Trung Quốc) và chảy qua 6 quốc gia: Trung Quốc, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia và Việt Nam.',
    hint: 'Bắt đầu từ vùng băng tuyết Tây Tạng hùng vĩ và đi qua 6 nước bạn bè.',
    badgeEarned: 'Huy hiệu Khám phá 6 Nước Mê Công',
    gradeLevelTag: 'Tiểu học - Lớp 3, 4, 5'
  },
  {
    id: 'pri-2',
    level: 'primary',
    question: 'Khi chảy vào đất nước Việt Nam, sông Mê Công chia thành hai nhánh lớn là sông nào và đổ ra biển bằng tên gọi gì?',
    options: ['Sông Hồng & Sông Đà (Sông Cái)', 'Sông Tiền & Sông Hậu (Sông Cửu Long)', 'Sông Đồng Nai & Sông Sài Gòn (Sông Đôi)', 'Sông Hương & Sông Gianh (Sông Lam)'],
    correctIndex: 1,
    explanation: 'Chính xác! Sông Mê Công vào Việt Nam chia thành sông Tiền và sông Hậu, đổ ra biển qua các cửa sông như 9 con rồng uốn lượn, nên được gọi là sông Cửu Long.',
    hint: 'Chín con rồng linh thiêng ở miền Tây Nam Bộ.',
    badgeEarned: 'Huy hiệu Đất Chín Rồng',
    gradeLevelTag: 'Tiểu học - Lớp 4, 5'
  },
  {
    id: 'pri-3',
    level: 'primary',
    question: 'Mức độ đa dạng sinh học của lưu vực sông Mê Công xếp thứ mấy trên toàn thế giới?',
    options: ['Đứng thứ nhất thế giới', 'Đứng thứ hai thế giới (chỉ sau sông A-ma-dôn)', 'Đứng thứ mười thế giới', 'Đứng thứ hai mươi thế giới'],
    correctIndex: 1,
    explanation: 'Tuyệt vời! Theo SGK Địa lí 11, lưu vực sông Mê Công có khoảng 20 000 loài thực vật, hơn 1 000 loài cá nước ngọt, xếp thứ hai thế giới chỉ sau sông A-ma-dôn.',
    hint: 'Chỉ đứng sau con sông A-ma-dôn khổng lồ ở Nam Mỹ.',
    badgeEarned: 'Hiệp sĩ Đa dạng Sinh học',
    gradeLevelTag: 'Tiểu học - Lớp 4, 5'
  },
  {
    id: 'pri-4',
    level: 'primary',
    question: 'Để bảo vệ nguồn nước sạch cho sông Mê Công và các bạn cá tôm, chúng mình KHÔNG NÊN làm điều gì?',
    options: ['Trồng thêm cây xanh ven bờ sông', 'Tiết kiệm nước khi sử dụng hàng ngày', 'Vứt bao bì nilông và rác thải nhựa xuống lòng sông', 'Tuyên truyền cùng bạn bè giữ sạch nguồn nước'],
    correctIndex: 2,
    explanation: 'Hoan hô em! Rác thải nhựa và túi nilông làm ô nhiễm dòng nước, hủy hoại môi trường sống của muôn loài cá tôm.',
    hint: 'Hãy tìm hành vi gây hại cho dòng sông quê hương.',
    badgeEarned: 'Dũng sĩ Bảo vệ Dòng Sông Mẹ',
    gradeLevelTag: 'Tiểu học - Đạo đức & TNXH'
  }
];

export const SECONDARY_QUIZ: QuizQuestion[] = [
  {
    id: 'sec-1',
    level: 'secondary',
    question: 'Theo tiếng bản địa của người dân Cam-pu-chia, sông Mê Công và hồ nước ngọt tự nhiên lớn nhất có tên gọi là gì?',
    options: ['Lan Thương Giang & Hồ Ba Bể', 'Tôn-lê Thơm ("sông Lớn") & hồ Tôn-lê Sáp (Biển Hồ)', 'Mênam Khong & Hồ Song-kha', 'Menam Chao Phraya & Hồ Inle'],
    correctIndex: 1,
    explanation: 'Chính xác! Tại Cam-pu-chia, sông Mê Công được gọi là Tôn-lê Thơm ("sông Lớn"). Hồ Tôn-lê Sáp (Biển Hồ) đóng vai trò điều hòa dòng chảy tự nhiên quý giá cho ĐBSCL.',
    hint: 'Có tiền tố "Tôn-lê" trong tiếng Khmer nghĩa là sông, hồ lớn.',
    badgeEarned: 'Nhà Địa lí Lưu vực Sông',
    gradeLevelTag: 'THCS - Địa lí 7, 8'
  },
  {
    id: 'sec-2',
    level: 'secondary',
    question: 'Quốc gia nào đóng góp tỉ lệ diện tích lưu vực lớn nhất (25%) và lượng nước lớn nhất (35%) cho sông Mê Công?',
    options: ['Trung Quốc', 'Lào', 'Thái Lan', 'Cam-pu-chia'],
    correctIndex: 1,
    explanation: 'Đúng! Theo số liệu MRC 2022 trích trong SGK Địa lí 11, Lào chiếm 25% diện tích lưu vực và đóng góp tới 35% tổng lượng dòng chảy của toàn bộ dòng sông.',
    hint: 'Đất nước có thủ đô Viêng Chăn xinh đẹp nằm ngay bên bờ sông Mê Công.',
    badgeEarned: 'Chuyên viên Phân tích Thủy văn',
    gradeLevelTag: 'THCS - Địa lí 8'
  },
  {
    id: 'sec-3',
    level: 'secondary',
    question: 'Đặc điểm chế độ nước ở hạ lưu sông Mê Công có mùa lũ kéo dài vào khoảng thời gian nào và chiếm bao nhiêu phần trăm dòng chảy cả năm?',
    options: [
      'Mùa lũ từ tháng 1 đến tháng 4, chiếm 30% dòng chảy',
      'Mùa lũ từ tháng 6 đến tháng 11, chiếm 70 – 80% tổng lượng dòng chảy cả năm',
      'Mùa lũ xuất hiện vào mùa đông, chiếm 50% dòng chảy',
      'Dòng chảy điều hòa tuyệt đối quanh năm không có mùa lũ'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Theo SGK Địa lí 11 trang 6, ở hạ lưu mùa lũ trùng với mùa mưa kéo dài từ tháng 6 đến tháng 11, chiếm 70 – 80% tổng lượng dòng chảy cả năm.',
    hint: 'Xem lại đặc điểm dòng chảy phân mùa do ảnh hưởng khí hậu gió mùa mùa hạ.',
    badgeEarned: 'Kỹ sư Thủy văn Mê Kông',
    gradeLevelTag: 'THCS - Địa lí 8, 9'
  },
  {
    id: 'sec-4',
    level: 'secondary',
    question: 'Hai thành phố thủ đô của hai quốc gia nào sau đây nằm ngay sát bên bờ dòng sông Mê Công?',
    options: ['Bangkok (Thái Lan) & Hà Nội (Việt Nam)', 'Viêng Chăn (Lào) & Phnôm Pênh (Cam-pu-chia)', 'Naypyidaw (Mi-an-ma) & Jakarta (In-đô-nê-xi-a)', 'Kuala Lumpur (Ma-lai-xi-a) & Bắc Kinh (Trung Quốc)'],
    correctIndex: 1,
    explanation: 'Chính xác! Viêng Chăn (thủ đô của Lào) và Phnôm Pênh (thủ đô của Cam-pu-chia) là hai thủ đô quốc tế nằm ngay bên dòng sông Mê Công.',
    hint: 'Hai quốc gia láng giềng thân thiện trên bán đảo Đông Dương.',
    badgeEarned: 'Bậc thầy Bản đồ Đông Nam Á',
    gradeLevelTag: 'THCS - Địa lí 8'
  }
];

export const HIGHSCHOOL_QUIZ: QuizQuestion[] = [
  {
    id: 'hs-1',
    level: 'highschool',
    question: 'Hiệp định Hợp tác phát triển bền vững lưu vực sông Mê Công (thành lập Uỷ hội sông Mê Công - MRC) được kí kết vào ngày tháng năm nào và tại đâu?',
    options: [
      'Ngày 18 - 9 - 1978 tại Hà Nội (Việt Nam)',
      'Ngày 5 - 4 - 1995 tại Chiang Rai (Thái Lan)',
      'Ngày 25 - 12 - 2000 tại Bắc Kinh (Trung Quốc)',
      'Ngày 9 - 8 - 1997 tại Bangkok (Thái Lan)'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Ngày 5 - 4 - 1995, tại Chiang Rai (Thái Lan), đại diện 4 quốc gia (Lào, Thái Lan, Cam-pu-chia, Việt Nam) đã kí Hiệp định thành lập MRC. Mi-an-ma và Trung Quốc là hai đối tác đối thoại từ năm 1996.',
    hint: 'Kí vào ngày 5 tháng 4 năm 1995 tại miền bắc Thái Lan.',
    badgeEarned: 'Nhà Ngoại giao MRC Xuất sắc',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Trang 8'
  },
  {
    id: 'hs-2',
    level: 'highschool',
    question: 'Theo Hình 2 (SGK Địa lí 11, trang 6), thứ tự tỉ lệ diện tích lưu vực sông Mê Công từ cao xuống thấp của 6 quốc gia là gì?',
    options: [
      'Trung Quốc (35%) > Lào (25%) > Thái Lan (20%) > Cam-pu-chia (10%) > Việt Nam (8%) > Mi-an-ma (2%)',
      'Lào (25%) > Thái Lan (23%) > Trung Quốc (21%) > Cam-pu-chia (20%) > Việt Nam (8%) > Mi-an-ma (3%)',
      'Việt Nam (25%) > Lào (23%) > Thái Lan (21%) > Trung Quốc (20%) > Cam-pu-chia (8%) > Mi-an-ma (3%)',
      'Thái Lan (30%) > Lào (25%) > Cam-pu-chia (20%) > Trung Quốc (15%) > Việt Nam (7%) > Mi-an-ma (3%)'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Theo số liệu MRC 2022 (Hình 2 trang 6 SGK): Lào chiếm 25%, Thái Lan 23%, Trung Quốc 21%, Cam-pu-chia 20%, Việt Nam 8%, Mi-an-ma 3%. Tổng diện tích lưu vực là 810 000 km².',
    hint: 'Lào dẫn đầu với 25%, tiếp theo là Thái Lan 23% và Trung Quốc 21%.',
    badgeEarned: 'Chuyên gia Phân tích Số liệu Lưu vực',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Hình 2 Tr.6'
  },
  {
    id: 'hs-3',
    level: 'highschool',
    question: 'Theo Hình 6 (SGK Địa lí 11, trang 10), thủ tục nào của MRC được thông qua năm 2003 nhằm tạo thuận lợi cho hợp tác sử dụng và phát triển nước với 3 quy trình cụ thể cho các dự án cơ sở hạ tầng?',
    options: [
      'Thủ tục PDIES (Trao đổi và chia sẻ thông tin số liệu)',
      'Thủ tục PNPCA (Thông báo, tham vấn trước và thoả thuận)',
      'Thủ tục PMFM (Duy trì dòng chảy trên dòng chính)',
      'Thủ tục PWQ (Chất lượng nước)'
    ],
    correctIndex: 1,
    explanation: 'Đúng! Thủ tục PNPCA (Procedures for Notification, Prior Consultation and Agreement) thông qua năm 2003 là thủ tục pháp lí then chốt quy định việc tham vấn trước đối với các công trình trên dòng chính.',
    hint: 'Gồm ba quy trình: Thông báo, Tham vấn trước và Thoả thuận.',
    badgeEarned: 'Bậc thầy Pháp lý Quốc tế Mê Kông',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Hình 6 Tr.10'
  },
  {
    id: 'hs-4',
    level: 'highschool',
    question: 'Uỷ ban sông Mê Công Việt Nam được thành lập vào ngày tháng năm nào, và hiện nay cơ cấu tổ chức bao gồm những tiểu ban nào?',
    options: [
      'Ngày 5 - 4 - 1995; gồm Tiểu ban Sông Tiền và Tiểu ban Sông Hậu',
      'Ngày 18 - 9 - 1978; gồm Tiểu ban lưu vực sông Cửu Long và Tiểu ban lưu vực sông Sê San - Srêpôk',
      'Ngày 2 - 9 - 1945; gồm Tiểu ban Miền Tây và Tiểu ban Miền Đông',
      'Ngày 30 - 4 - 1975; gồm Tiểu ban ĐBSCL và Tiểu ban Tây Nguyên'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Theo SGK Địa lí 11 trang 14, Uỷ ban sông Mê Công Việt Nam được thành lập ngày 18 - 9 - 1978. Hiện nay gồm 2 tiểu ban: Tiểu ban lưu vực sông Cửu Long và Tiểu ban lưu vực sông Sê San - Srêpôk.',
    hint: 'Thành lập năm 1978, quản lí cả 2 tiểu lưu vực trọng yếu là Cửu Long và Sê San - Srêpôk.',
    badgeEarned: 'Sử gia Thể chế Sông Mê Kông',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Mục 4 Tr.14'
  },
  {
    id: 'hs-5',
    level: 'highschool',
    question: 'Theo số liệu năm 2020 trong SGK Địa lí 11 (trang 14), Đồng bằng sông Cửu Long đóng góp bao nhiêu % vào lượng gạo và lượng tôm, cá xuất khẩu của Việt Nam?',
    options: [
      '50% lượng gạo và 20% lượng tôm, cá xuất khẩu',
      '70% lượng gạo và 40% lượng tôm, cá xuất khẩu',
      '90% lượng gạo và 53% lượng tôm, cá xuất khẩu',
      '100% lượng gạo và 80% lượng tôm, cá xuất khẩu'
    ],
    correctIndex: 2,
    explanation: 'Chính xác! Năm 2020, ĐBSCL đóng góp khoảng 12% GDP của cả nước, sản xuất tới 90% lượng gạo và 53% lượng tôm, cá xuất khẩu của Việt Nam.',
    hint: 'Gạo chiếm tới chín phần mười (90%), tôm cá trên một nửa (53%).',
    badgeEarned: 'Chuyên gia Kinh tế Nông nghiệp ĐBSCL',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Mục 4 Tr.14'
  },
  {
    id: 'hs-6',
    level: 'highschool',
    question: 'Chiến lược phát triển bền vững Đồng bằng sông Cửu Long theo Nghị quyết số 120 của Chính phủ (năm 2017) xác định định hướng trọng tâm nào?',
    options: [
      'Bằng mọi giá xây đê bao khép kín để chống chọi tuyệt đối với thiên nhiên',
      'Phát triển theo hướng "thích hợp, thuận thiên", lấy tôn trọng quy luật tự nhiên làm nền tảng phát triển bền vững',
      'Chuyển đổi toàn bộ đất trồng trọt sang phát triển khu công nghiệp nặng',
      'Di dân cơ học toàn bộ dân cư ĐBSCL sang lưu vực sông Đồng Nai'
    ],
    correctIndex: 1,
    explanation: 'Tuyệt vời! Nghị quyết 120/NQ-CP năm 2017 đánh dấu bước đột phá tư duy: phát triển theo hướng "thích hợp, thuận thiên", tôn trọng quy luật tự nhiên, coi nước mặn và nước lợ là tài nguyên để chuyển đổi kinh tế bền vững.',
    hint: 'Từ khóa then chốt mang tính đột phá là "Thuận thiên".',
    badgeEarned: 'Chiến lược gia "Thuận Thiên" ĐBSCL',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Nghị quyết 120 Tr.15'
  },
  {
    id: 'hs-7',
    level: 'highschool',
    question: 'Trong khuôn khổ hợp tác hòa bình tại Biển Đông (Phần II SGK trang 18), Hiệp định hợp tác nghề cá ở vịnh Bắc Bộ giữa Việt Nam và Trung Quốc được kí kết vào thời gian nào?',
    options: [
      'Ngày 5 - 4 - 1995 tại Bangkok',
      'Ngày 25 - 12 - 2000 tại Bắc Kinh',
      'Ngày 9 - 8 - 1997 tại Hà Nội',
      'Năm 1982 tại Phnôm Pênh'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Hiệp định hợp tác nghề cá ở vịnh Bắc Bộ giữa Việt Nam và Trung Quốc được kí ngày 25 - 12 - 2000 tại Bắc Kinh, thiết lập Vùng đánh cá chung từ đường đóng cửa vịnh đến vĩ tuyến 20°B.',
    hint: 'Kí kết vào ngày lễ Giáng sinh 25/12/2000.',
    badgeEarned: 'Chuyên gia Ngoại giao Biển Đông',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Phần II Tr.18'
  },
  {
    id: 'hs-8',
    level: 'highschool',
    question: 'Khẳng định nào sau đây là ĐÚNG về vai trò của Ủy hội sông Mê Công (MRC) và sự tham gia chủ động của Việt Nam?',
    options: [
      'Việt Nam đăng cai Hội nghị Cấp cao MRC lần 2 (2014 tại TP.HCM), đảm nhiệm Chủ tịch Hội đồng MRC (2018, 2022) và chủ trì nghiên cứu khoa học độc lập MDS để bảo vệ ĐBSCL',
      'Ủy hội MRC có quyền phủ quyết tuyệt đối và cấm tất cả các quốc gia xây dựng công trình thủy điện trên phụ lưu',
      'Việt Nam không cần tham gia MRC vì 95% lượng nước sông Mê Kông đã được điều tiết tự nhiên ở nội địa',
      'MRC chỉ giải quyết tranh chấp thương mại đường thủy, không có cơ chế quan trắc hay cảnh báo thiên tai'
    ],
    correctIndex: 0,
    explanation: 'Chính xác! Việt Nam là thành viên sáng lập tích cực và trách nhiệm cao của MRC; đăng cai Hội nghị Cấp cao lần 2 (2014 tại TP.HCM), giữ chức Chủ tịch Hội đồng MRC (2018, 2022), chủ trì nghiên cứu độc lập MDS và kiên trì vận động chia sẻ dữ liệu thủy văn thượng nguồn.',
    hint: 'Ghi nhớ mốc Hội nghị Cấp cao lần 2 năm 2014 tại TP.HCM và công trình nghiên cứu MDS.',
    badgeEarned: 'Nhà Lãnh Đạo Ngoại Giao MRC',
    gradeLevelTag: 'Chuyên đề Địa lí 11 - Trọng tâm MRC & VN'
  }
];

export const DRAG_MATCH_ITEMS: DragMatchItem[] = [
  {
    id: 'match-1',
    leftText: 'Thượng nguồn Lan Thương Giang',
    rightMatchId: 'match-1',
    rightText: 'Trung Quốc (Độ cao > 5.000m, sông băng Tây Tạng)',
    category: 'Vị trí dòng chảy'
  },
  {
    id: 'match-2',
    leftText: 'Biển Hồ Tonle Sap & Thủ đô Phnôm Pênh',
    rightMatchId: 'match-2',
    rightText: 'Campuchia (Bể điều tiết lũ tự nhiên cho ĐBSCL)',
    category: 'Vị trí dòng chảy'
  },
  {
    id: 'match-3',
    leftText: 'Đóng góp 35% lưu lượng nước & Đập Xayaburi',
    rightMatchId: 'match-3',
    rightText: 'CHDCND Lào ("Bình ắc quy năng lượng Đông Nam Á")',
    category: 'Thủy văn & Quốc gia'
  },
  {
    id: 'match-4',
    leftText: 'Cửa ngõ cuối cùng & ĐBSCL 9 cửa rồng',
    rightMatchId: 'match-4',
    rightText: 'Việt Nam (Chịu tác động kép của hạn mặn & phù sa sụt giảm)',
    category: 'Thủy văn & Quốc gia'
  }
];

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'prompt-master',
    title: 'Prompt Chuẩn cho Google AI Studio: WebApp Sông Mê Kông & Địa lí 11',
    targetAudience: 'Dành cho người tạo webapp, giáo viên Địa lí & học sinh THPT',
    description: 'Bản thiết kế prompt tối ưu hóa cao cho AI Studio giúp tạo ra ứng dụng tương tác đa cấp học hoàn chỉnh chuẩn SGK Chuyên đề 11.',
    fullPromptText: `Hãy xây dựng một WebApp giáo dục tương tác hiện đại và chuyên sâu về "Ủy hội Sông Mê Công (MRC) và Giới thiệu Sông Mê Công - Chuyên đề Địa lí 11 (bộ Kết nối tri thức với cuộc sống) liên hệ Việt Nam" bằng React, Tailwind CSS, TypeScript và Lucide Icons.

Yêu cầu chi tiết hệ thống:
1. Kiến thức cốt lõi chuẩn SGK Chuyên đề học tập Địa lí 11 (Chuyên đề 11.1):
   - Tổng quan dòng sông Mê Công: dài 4 763 km (thứ 12 thế giới, thứ 3 châu Á), bắt nguồn từ sơn nguyên Tây Tạng (Trung Quốc), diện tích lưu vực 810 000 km² (theo MRC 2022).
   - Phân bố diện tích lưu vực 6 quốc gia: Lào (25%), Thái Lan (23%), Trung Quốc (21%), Cam-pu-chia (20%), Việt Nam (8%), Mi-an-ma (3%).
   - Đặc điểm thủy văn: Tổng dòng chảy trung bình năm 475 tỉ m³; hạ lưu lũ kéo dài từ tháng 6 đến tháng 11 (chiếm 70 - 80% tổng dòng chảy cả năm). Đa dạng sinh học đứng thứ hai thế giới sau sông A-ma-dôn.
   - Quá trình hình thành MRC: 1957 (Uỷ ban Mê Công), 1978 (Uỷ ban Lâm thời), ngày 5/4/1995 kí Hiệp định Chiang Rai thành lập MRC (Lào, Thái Lan, Cam-pu-chia, Việt Nam). Trung Quốc và Mi-an-ma là đối tác đối thoại từ 1996.
   - Năm thủ tục quản lí nước cốt lõi của MRC (Hình 6 trang 10 SGK): PDIES (2001 - Chia sẻ thông tin số liệu), PWUM (2003 - Giám sát sử dụng nước), PNPCA (2003 - Thông báo, tham vấn trước và thoả thuận), PMFM (2006 - Duy trì dòng chảy dòng chính), PWQ (2011 - Chất lượng nước).
   - Vai trò của Việt Nam và ĐBSCL: Uỷ ban sông Mê Công Việt Nam thành lập ngày 18 - 9 - 1978 (gồm Tiểu ban Cửu Long và Tiểu ban Sê San - Srêpôk). Năm 2014 đăng cai Hội nghị Cấp cao lần 2 tại TP.HCM. Giữ chức Chủ tịch Hội đồng MRC năm 2018 và 2022.
   - Vị thế ĐBSCL (2020): hơn 17 triệu người, 12% GDP, 90% gạo và 53% tôm cá xuất khẩu. Thích ứng "Thuận thiên" theo Nghị quyết số 120/NQ-CP (2017) của Chính phủ, Luật Bảo vệ môi trường và Luật Tài nguyên nước 2020.
   - Mở rộng Hợp tác Biển Đông: Biển Đông (~3,44 triệu km²); Hiệp định nghề cá vịnh Bắc Bộ kí ngày 25 - 12 - 2000 (Việt Nam - Trung Quốc); Phân định biển vịnh Thái Lan (1997 với Thái Lan, 1982 với Campuchia).

2. Trò chơi tương tác phân hóa theo 3 cấp học:
   - Cấp Tiểu học (Lớp 1-5): "Hành trình Giọt Nước Nhí" - Khám phá các loài sinh vật đặc hữu (Cá tra dầu, cá heo Irrawaddy, sếu đầu đỏ), nhận biết 6 quốc gia, 9 nhánh sông Cửu Long và đố vui bảo vệ môi trường nước.
   - Cấp THCS (Lớp 6-9): "Nhà Địa lí Lưu vực Sông" - Tương tác bản đồ 6 quốc gia, ghép nối tên sông bản địa (Lan Thương, Mênam Khong, Tôn-lê Thơm, Cửu Long), giải thích vai trò Biển Hồ (Tôn-lê Sáp), chế độ nước phân mùa lũ - cạn.
   - Cấp THPT (Chuyên đề Địa lí 11): "Mô phỏng An ninh nguồn nước MRC & Chiến lược ĐBSCL" - Bộ trắc nghiệm chuyên sâu có giải thích chuẩn SGK, công cụ mô phỏng giả lập điều tiết xả đập, hạn mặn ĐBSCL và giải pháp "Thuận thiên" theo 3 vùng sinh thái (Ngọt - Lợ - Mặn).

3. Giao diện & Trải nghiệm:
   - Thiết kế chuẩn khoa học sư phạm, bảng màu xanh ngọc bích sông Mê Công (Deep Teal, Emerald) kết hợp sắc đất phù sa trầm ấm.
   - Bản đồ dòng chảy SVG tương tác trực quan từ thượng nguồn Tây Tạng tới 9 cửa sông Cửu Long.
   - Âm thanh phản hồi trực quan (Web Audio API).
   - Bộ công cụ xuất Prompt chuẩn cho GV/HS chia sẻ trên Google AI Studio.`
  },
  {
    id: 'prompt-teacher',
    title: 'Prompt Dành cho Giáo viên: Soạn Giáo án Điện tử & Hoạt động Nhóm',
    targetAudience: 'Giáo viên bộ môn Địa lí THCS & THPT',
    description: 'Dùng prompt này nạp vào Gemini / AI Studio để tự động tạo kế hoạch bài dạy (KHDH) theo Công văn 5512 cho Chuyên đề Địa lí 11.',
    fullPromptText: `Đóng vai trò là chuyên gia phương pháp dạy học Địa lí, hãy thiết kế Kế hoạch bài dạy (Giáo án) Chuyên đề học tập Địa lí 11: "Ủy hội sông Mê Công và việc sử dụng hợp lí tài nguyên nước lưu vực sông Mê Công" theo định hướng phát triển năng lực (Công văn 5512/BGDĐT-GDTrH).

Yêu cầu gồm:
1. Mục tiêu bài học (Năng lực nhận thức địa lí, năng lực tìm hiểu địa lí qua bản đồ và số liệu, năng lực vận dụng giải quyết bài toán hạn mặn ĐBSCL; phẩm chất trách nhiệm bảo vệ tài nguyên nước xuyên biên giới).
2. Thiết bị dạy học và học liệu số: Bản đồ tương tác lưu vực sông, video tư liệu về Hiệp định Mê Kông 1995, trò chơi trắc nghiệm đóng vai nhà ngoại giao nước.
3. Tiến trình dạy học gồm 4 hoạt động:
   - Hoạt động 1: Khởi động (Trò chơi nhận diện 6 quốc gia và dòng sông Mê Kông).
   - Hoạt động 2: Hình thành kiến thức (Khám phá MRC, nguyên tắc PNPCA, phân tích bảng số liệu lượng phù sa và lưu lượng mùa cạn).
   - Hoạt động 3: Luyện tập (Xử lý tình huống điều tiết hồ chứa và xâm nhập mặn ĐBSCL).
   - Hoạt động 4: Vận dụng (Đề xuất giải pháp "Thuận thiên" cho một tỉnh cụ thể ở ĐBSCL: Bến Tre, An Giang hoặc Cà Mau).`
  },
  {
    id: 'prompt-student',
    title: 'Prompt Dành cho Học sinh: Gia sư AI Ôn tập & Giải thích Đề thi',
    targetAudience: 'Học sinh ôn tập kiểm tra Địa lí 11 & Thi HSG',
    description: 'Prompt giúp biến AI thành gia sư riêng hỏi đáp và chấm điểm trắc nghiệm Chuyên đề MRC & ĐBSCL.',
    fullPromptText: `Bạn là Gia sư AI chuyên đề Địa lí 11 về "Ủy hội Sông Mê Công (MRC) và An ninh nguồn nước Việt Nam". 
Hãy cùng tôi ôn tập theo phương pháp Socratic (hỏi mở và gợi ý tư duy từng bước):
- Hãy lần lượt đặt cho tôi 5 câu hỏi tình huống từ cơ bản đến nâng cao về:
  1. Vị trí địa lí và dòng chảy của sông qua 6 nước.
  2. Sự khác biệt giữa MRC (1995) và Ủy ban Mê Công (1957).
  3. Cơ chế hoạt động của Biển Hồ Tonle Sap và tác động tới mùa lũ đẹp ở An Giang, Đồng Tháp.
  4. Hậu quả của chuỗi thủy điện thượng nguồn đối với lượng phù sa và tình trạng sạt lở ĐBSCL.
  5. Giải pháp thực thi Nghị quyết 120/NQ-CP về kinh tế nông nghiệp "Thuận thiên".
- Sau khi tôi trả lời mỗi câu, hãy nhận xét chi tiết điểm đúng, điểm thiếu sót và cung cấp số liệu thực tế cập nhật nhất.`
  }
];
