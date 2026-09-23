import { EducationLevel, Language } from '../types';

export interface ChapterGradeSpotlight {
  tag: { vi: string; en: string };
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  bulletPoints: { vi: string[]; en: string[] };
  actionPrompt: { vi: string; en: string };
}

export const GRADE_SPOTLIGHTS_BY_CHAPTER: Record<string, Record<EducationLevel, ChapterGradeSpotlight>> = {
  overview: {
    primary: {
      tag: { vi: '🎒 Dành cho Tiểu học: Câu chuyện Giọt Nước Băng Tuyết', en: '🎒 Primary School: Journey of the Little Snowdrop' },
      title: { vi: 'Chuyến phiêu lưu của Giọt nước Mê Kông', en: 'The Adventure of the Mekong Waterdrop' },
      description: {
        vi: 'Từ đỉnh núi tuyết trắng xóa cao 5.224m, giọt nước nhỏ bé tan ra rồi rủ thêm hàng triệu giọt bạn bè uốn lượn qua 6 đất nước để về ôm ấp ruộng lúa miền Tây!',
        en: 'From the snowy peak at 5,224m, tiny water drops melt and join millions of friends travelling across 6 countries to feed Vietnam\'s green rice paddies!'
      },
      bulletPoints: {
        vi: [
          'Dài tận 4.763 km, bé đi ô tô mất nhiều ngày mới đi hết được chiều dài sông đấy!',
          'Qua 6 nước láng giềng thân thiện: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.',
          'Khi chảy vào nước mình, sông rẽ thành 9 nhánh hiền hòa như 9 chú rồng chở đầy phù sa màu mỡ.'
        ],
        en: [
          'It is 4,763 km long—driving along it would take many days!',
          'It flows through 6 friendly nations: China, Myanmar, Laos, Thailand, Cambodia, and Vietnam.',
          'When reaching Vietnam, it splits into 9 dragon branches nourishing fresh fruits and rice.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về loài cá heo nước ngọt trên sông', en: 'Ask Kien Sang about freshwater dolphins in the Mekong' }
    },
    secondary: {
      tag: { vi: '📘 Dành cho THCS: Địa lí Tự nhiên & 3 Đoạn Sông', en: '📘 Secondary School: Physical Geography & River Courses' },
      title: { vi: 'Phân đoạn Địa mạo & Dòng chảy Xuyên biên giới', en: 'Geomorphology & Transboundary River Course' },
      description: {
        vi: 'Sông Mê Kông xếp thứ 12 thế giới về chiều dài và thứ 3 châu Á. Dòng chảy biến đổi mạnh mẽ từ hẻm vực dốc đứng thượng lưu đến đồng bằng châu thổ rộng lớn.',
        en: 'The Mekong River ranks 12th in length globally and 3rd in Asia. Its flow changes dramatically from steep upper canyons to a vast coastal delta.'
      },
      bulletPoints: {
        vi: [
          'Thượng lưu (Vân Nam): Hẻm vực dốc, độ dốc lớn >4.500m, lòng sông hẹp và nước chảy xiết.',
          'Trung lưu: Đoạn qua Lào và Thái Lan lòng sông mở rộng, có nhiều ghềnh thác lớn như thác Khone Phapheng.',
          'Hạ lưu & Châu thổ ĐBSCL: Địa hình phẳng, cao độ trung bình <2m, mạng lưới kênh rạch bồi đắp bởi 160 triệu tấn phù sa mỗi năm.'
        ],
        en: [
          'Upper basin (Yunnan): Steep gorges with >4,500m elevation drop and turbulent currents.',
          'Middle basin: River widens across Laos & Thailand, interrupted by massive cataracts like Khone Falls.',
          'Lower delta (Vietnam): Flat lowlands (<2m elevation) nourished by ~160 million tons of historical annual sediment.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về độ cao và lưu lượng 475 tỉ m³/năm', en: 'Ask Kien Sang about elevation and 475 billion m³ annual discharge' }
    },
    highschool: {
      tag: { vi: '🎓 Dành cho THPT: Chuyên đề Địa lí 11 & Số liệu MRC 2022', en: '🎓 High School Gr.11: MRC 2022 Hydrological Statistics' },
      title: { vi: 'Đặc trưng Thủy văn & Địa chính trị Lưu vực Mê Kông', en: 'Hydrological Regimes & River Basin Geopolitics' },
      description: {
        vi: 'Căn cứ Chương trình GDPT 2018 và Báo cáo MRC 2022: Lưu vực Mê Kông (810.000 km²) là hệ thống sông quốc tế phụ thuộc ngoại biên cao nhất Đông Nam Á, đòi hỏi khuôn khổ pháp lí đa phương chặt chẽ.',
        en: 'Under Vietnam Grade 11 Curriculum & MRC 2022 Report: The 810,000 km² basin is a transboundary artery where 95% of Vietnam\'s delta inflow originates externally.'
      },
      bulletPoints: {
        vi: [
          'Phân bố lưu lượng đóng góp: Lào (35%), Thái Lan (18%), Campuchia (18%), Trung Quốc (16%), Việt Nam (11%), Myanmar (2%).',
          'Tương quan dòng chảy mùa: Mùa lũ (tháng 6 - 11) chiếm 75-80% tổng lượng nước năm; mùa cạn (tháng 12 - 5) chỉ chiếm 20-25%.',
          'Ý nghĩa địa chính trị: 95% dòng chảy đổ vào ĐBSCL bắt nguồn ngoài lãnh thổ, biến an ninh nguồn nước thành lợi ích an ninh quốc gia sống còn.'
        ],
        en: [
          'Discharge contributions: Laos (35%), Thailand (18%), Cambodia (18%), China (16%), Vietnam (11%), Myanmar (2%).',
          'Seasonal hydrograph: Monsoon floods (June-Nov) contribute 75-80% of volume; dry season (Dec-May) accounts for only 20-25%.',
          'Geopolitical vulnerability: 95% of delta inflows are transboundary, making international water governance a vital national security priority.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về tỉ lệ 95% nước ngoại biên ĐBSCL', en: 'Ask Kien Sang about 95% transboundary water dependency in Mekong Delta' }
    }
  },
  hydrology: {
    primary: {
      tag: { vi: '🎒 Dành cho Tiểu học: Chiếc Bể Bơi Khổng Lồ Biết Thở', en: '🎒 Primary School: The Giant Breathing Lake' },
      title: { vi: 'Bí mật sông Tonle Sap chảy ngược', en: 'The Secret of the Reverse-Flowing Tonle Sap' },
      description: {
        vi: 'Bạn có biết con sông nào biết tự quay đầu chảy ngược không? Đó chính là sông Tonle Sap nối với Biển Hồ ở nước bạn Campuchia đấy!',
        en: 'Do you know a river that can turn around and flow backwards? That is the magical Tonle Sap River connecting to the Great Lake in Cambodia!'
      },
      bulletPoints: {
        vi: [
          'Mùa mưa: Nước sông Mê Kông dâng cao tràn ngược vào Biển Hồ, giúp miền Tây Việt Nam không bị lụt sâu!',
          'Mùa khô: Biển Hồ xả nước ngọt trở lại sông để bà con nông dân có nước tưới cây và đuổi nước biển mặn.',
          'Hồ phình to gấp 5 lần khi mùa mưa đến, là ngôi nhà khổng lồ của hàng triệu chú cá bơi lội.'
        ],
        en: [
          'Rainy season: Water flows backward into the lake, saving the Mekong Delta from extreme flooding!',
          'Dry season: The lake releases sweet water back into the river to irrigate orchards and push away salty seawater.',
          'The lake grows 5 times larger in the wet season, providing a sanctuary for millions of fish.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng vì sao nước hồ đẩy được nước mặn', en: 'Ask Kien Sang how lake water pushes back seawater' }
    },
    secondary: {
      tag: { vi: '📘 Dành cho THCS: Cơ chế Thủy văn & Điều hòa Tự nhiên', en: '📘 Secondary School: Hydrological Balancing Mechanism' },
      title: { vi: 'Cơ chế Hai Chiều của Tonle Sap & Tác động đến ĐBSCL', en: 'Two-Way Hydrodynamics of Tonle Sap & Delta Impact' },
      description: {
        vi: 'Hệ thống Biển Hồ - Sông Tonle Sap hoạt động như một "bình thông nhau" tự nhiên khổng lồ duy nhất trên thế giới có khả năng đổi chiều dòng chảy định kỳ.',
        en: 'The Tonle Sap lake-river system acts as a natural communicating vessel and is one of the world\'s most unique seasonal reversing waterways.'
      },
      bulletPoints: {
        vi: [
          'Chế độ gió mùa: Gió mùa Tây Nam (tháng 6-10) mang mưa lớn làm mực nước Mekong cao hơn hồ, đẩy nước ngược vào Tonle Sap.',
          'Biến thiên dung tích: Diện tích hồ nở rộng từ 2.500 km² lên 16.000 km², dung tích trữ nước đạt tới 80 tỉ m³.',
          'Đóng góp mùa kiệt: Chiếm tới 50% dòng chảy vào ĐBSCL trong tháng 3-4, là lá chắn tự nhiên ngăn ranh mặn 4‰ không lấn sâu.'
        ],
        en: [
          'Monsoon drivers: Southwest monsoon rains lift Mekong stages above the lake, reversing flow up the Tonle Sap channel.',
          'Storage expansion: Surface area expands from 2,500 km² to 16,000 km², storing up to 80 billion m³ of water.',
          'Dry-season contribution: Provides up to 50% of delta dry-season discharge in March-April, pushing back the 4‰ salinity front.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về dung tích 80 tỉ m³ của Biển Hồ', en: 'Ask Kien Sang about the 80 billion m³ storage of Tonle Sap' }
    },
    highschool: {
      tag: { vi: '🎓 Dành cho THPT: Thủy lực học Chuyên đề & Thủ tục PMFM', en: '🎓 High School Gr.11: Hydraulic Engineering & PMFM Procedure' },
      title: { vi: 'Thủy văn Biển Hồ, Xung đột Thượng lưu & Quy chế Dòng chảy', en: 'Tonle Sap Hydraulics, Upstream Interference & PMFM' },
      description: {
        vi: 'Theo Chuyên đề Địa lí 11: Hiện tượng dòng chảy ngược Tonle Sap phụ thuộc vào độ chênh mực nước tại ngã tư Chaktomuk. Việc các đập thượng lưu tích nước đã làm suy giảm nghiêm trọng xung lực lũ tự nhiên.',
        en: 'Under Grade 11 Curriculum: The reverse pulse relies on hydraulic head differentials at the Chaktomuk confluence, now threatened by upstream reservoir impoundment.'
      },
      bulletPoints: {
        vi: [
          'Thủy lực ngã tư Chaktomuk: Khi mực nước tại Phnom Penh vượt ngưỡng ~7m, gradient thủy lực đảo chiều, dòng chảy chuyển hướng vào hồ.',
          'Tác động tích trữ đập thủy điện: Giữ lại lũ đỉnh làm chậm thời gian đảo dòng (từ tháng 6 lùi sang tháng 8), thu hẹp thể tích trữ của Biển Hồ.',
          'Thủ tục PMFM của MRC: Quy định duy trì dòng chảy tối thiểu trên dòng chính nhằm bảo vệ chu kỳ lũ - cạn tự nhiên của hệ thống Tonle Sap - ĐBSCL.'
        ],
        en: [
          'Chaktomuk confluence hydraulics: Flow reversal occurs when Mekong stage exceeds ~7m, establishing a reverse gradient.',
          'Impact of dam retention: Trapping early monsoon flood peaks delays reversal by 1-2 months and shrinks total flood storage.',
          'MRC PMFM Procedure: Prescribes minimum ecological flow thresholds to preserve the historic flood pulse of the Tonle Sap-Delta continuum.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về Thủ tục Duy trì Dòng chảy PMFM', en: 'Ask Kien Sang about the PMFM Flow Maintenance Procedure' }
    }
  },
  'mrc-agreement': {
    primary: {
      tag: { vi: '🎒 Dành cho Tiểu học: Ngôi Nhà Chung của 4 Người Bạn', en: '🎒 Primary School: The 4 Neighbors\' Friendship House' },
      title: { vi: 'Ủy hội MRC là gì và vì sao cần đoàn kết?', en: 'What is the MRC and Why Must We Cooperate?' },
      description: {
        vi: 'Dòng sông là tài sản chung của mọi người. MRC là nơi các chú bác ở Việt Nam, Lào, Thái Lan và Campuchia ngồi lại để cùng nhau bảo vệ nguồn nước sạch.',
        en: 'The river belongs to everyone. The MRC is where neighbors from Vietnam, Laos, Thailand, and Cambodia sit together to protect clean water.'
      },
      bulletPoints: {
        vi: [
          '4 nước cùng bắt tay nhau không xả rác hay làm chặn dòng nước của nhau.',
          'Khi nước bạn muốn xây đập hay hồ chứa, phải báo cho các nước khác biết trước.',
          'Việt Nam chúng mình luôn gương mẫu, kêu gọi bảo vệ cá tôm và báo tin bão lũ cho mọi người.'
        ],
        en: [
          '4 countries shake hands not to pollute or block each other\'s water.',
          'If someone wants to build a dam or water gate, they must notify neighbors in advance.',
          'Vietnam is a caring member, protecting nature and sharing weather alerts.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng vì sao 4 nước phải bắt tay nhau', en: 'Ask Kien Sang why 4 countries must cooperate' }
    },
    secondary: {
      tag: { vi: '📘 Dành cho THCS: Hiệp định Mê Kông 1995 & 4 Vai trò', en: '📘 Secondary School: 1995 Mekong Agreement & 4 Roles' },
      title: { vi: 'Tổ chức MRC & Ý nghĩa Hợp tác đối với ĐBSCL', en: 'MRC Organization & Significance for the Mekong Delta' },
      description: {
        vi: 'Hiệp định Hợp tác Phát triển Bền vững Lưu vực Sông Mê Kông ký ngày 5/4/1995 tại Chiang Rai (Thái Lan) là mốc lịch sử quan trọng trong ngoại giao nước khu vực.',
        en: 'The Agreement on the Cooperation for the Sustainable Development of the Mekong River Basin signed on April 5, 1995 is the cornerstone of regional water diplomacy.'
      },
      bulletPoints: {
        vi: [
          '4 quốc gia thành viên chính thức: Campuchia, Lào, Thái Lan, Việt Nam; 2 đối tác đối thoại: Trung Quốc và Myanmar.',
          '4 vai trò trọng yếu: Quản lí nước bền vững, thực thi thủ tục giám sát, trạm dữ liệu khí tượng thủy văn, diễn đàn ngoại giao đa phương.',
          'Việt Nam tham gia bảo vệ nguồn nước ngọt cho vựa lúa miền Tây và quyền lợi của hơn 20 triệu đồng bào hạ nguồn.'
        ],
        en: [
          '4 member nations: Cambodia, Laos, Thailand, Vietnam; 2 dialogue partners: China and Myanmar.',
          '4 core functions: Basin water governance, procedure enforcement, hydrological data exchange, multilateral diplomatic forum.',
          'Vietnam actively safeguards fresh water for the national rice basket and 20 million downstream inhabitants.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về 4 thành viên sáng lập Hiệp định 1995', en: 'Ask Kien Sang about the 4 founding members of the 1995 Agreement' }
    },
    highschool: {
      tag: { vi: '🎓 Dành cho THPT: Trọng Tâm SGK Địa Lí 11 (Bộ GD&ĐT)', en: '🎓 High School Gr.11: MOET Grade 11 Curriculum Core' },
      title: { vi: '4 Vai Trò MRC, 5 Thủ Tục Kỹ Thuật & 6 Đóng Góp Của Việt Nam', en: '4 MRC Roles, 5 Water Procedures & Vietnam\'s 6 Contributions' },
      description: {
        vi: 'Nội dung cốt lõi của bài kiểm tra học kỳ và kỳ thi tốt nghiệp THPT theo Chương trình GDPT 2018: Nắm chắc 4 vai trò của MRC, 5 thủ tục quản lí nước (Hình 6 trang 10 SGK) và 6 hành động cụ thể của Việt Nam.',
        en: 'Key syllabus content for Grade 11 Geography examinations: Master the 4 MRC roles, 5 water procedures (Figure 6 p.10 textbook), and Vietnam\'s 6 strategic actions.'
      },
      bulletPoints: {
        vi: [
          '4 Vai trò MRC: (1) Điều phối & quản lí sử dụng bền vững; (2) Thực thi 5 thủ tục nước; (3) Trung tâm dữ liệu & cảnh báo sớm; (4) Diễn đàn hợp tác ngoại giao.',
          '5 Thủ tục nước: PDIES (chia sẻ số liệu 2001), PWUM (giám sát nước 2003), PNPCA (thông báo & tham vấn trước 2003), PMFM (duy trì dòng chảy 2006), PWQ (chất lượng nước 2009).',
          'Quy trình PNPCA: Bắt buộc tham vấn tối thiểu 6 tháng đối với mọi công trình thủy điện dự kiến xây dựng trên dòng chính Mê Kông.',
          '6 Đóng góp của Việt Nam: Thành lập Ủy ban Mê Kông VN (1978), ký kết Hiệp định 1995, chủ trì Hội nghị Cấp cao 2 (2014), nghiên cứu MDS, đàm phán xả nước với Trung Quốc, tiên phong NQ 120/NQ-CP.'
        ],
        en: [
          '4 MRC Core Roles: (1) Basin-wide coordinator; (2) Technical procedure administrator; (3) Data & warning hub; (4) Water diplomacy platform.',
          '5 Procedures: PDIES (data exchange 2001), PWUM (monitoring 2003), PNPCA (prior consultation 2003), PMFM (flow maintenance 2006), PWQ (water quality 2009).',
          'PNPCA mechanism: Mandatory 6-month prior consultation for mainstream hydropower development proposals.',
          'Vietnam\'s 6 contributions: Founding VNMC (1978), co-signing 1995 Agreement, hosting 2nd Summit (2014), leading MDS study, transboundary release talks with China, pioneering Resolution 120.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng phân tích quy trình tham vấn trước PNPCA', en: 'Ask Kien Sang to analyze the PNPCA prior consultation procedure' }
    }
  },
  'security-solutions': {
    primary: {
      tag: { vi: '🎒 Dành cho Tiểu học: Giữ Lấy Giọt Nước Ngọt Quê Em', en: '🎒 Primary School: Protecting Our Precious Fresh Water' },
      title: { vi: 'Cùng chung tay bảo vệ nguồn nước sạch', en: 'Working Together to Keep Water Clean and Sweet' },
      description: {
        vi: 'Nước ngọt quý như vàng đối với các bạn nhỏ và bà con miền Tây. Chúng mình học cách yêu quý từng giọt nước mát và trồng nhiều cây xanh nhé!',
        en: 'Sweet fresh water is as precious as gold for children and families in the Mekong Delta. Let\'s cherish every drop and plant more green trees!'
      },
      bulletPoints: {
        vi: [
          'Không xả rác thải nhựa xuống kênh rạch, sông ngòi để nước luôn trong xanh.',
          'Khóa vòi nước khi đánh răng, rửa tay để tiết kiệm nước ngọt cho mùa khô.',
          'Kể cho bạn bè và người thân nghe về sự kì diệu của dòng sông quê hương.'
        ],
        en: [
          'Never throw plastics into canals and rivers so water stays crystal clear.',
          'Turn off taps while brushing teeth to save fresh water for the dry season.',
          'Share stories about the magnificent Mekong River with friends and family.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng cách bé tiết kiệm nước ngọt mỗi ngày', en: 'Ask Kien Sang how kids can save fresh water every day' }
    },
    secondary: {
      tag: { vi: '📘 Dành cho THCS: Thách Thức Hạn Mặn & Mô Hình Thích Ứng', en: '📘 Secondary School: Salinity Intrusion & Climate Adaptation' },
      title: { vi: 'Xâm Nhập Mặn, Đập Thủy Điện & Mô Hình Lúa - Tôm', en: 'Salinity Intrusion, Hydropower Dams & Rice-Shrimp Models' },
      description: {
        vi: 'Đồng bằng sông Cửu Long đang đối mặt với thử thách kép: Lượng phù sa sụt giảm do đập thủy điện và ranh mặn lấn sâu vào đất liền do biến đổi khí hậu.',
        en: 'The Mekong Delta faces a double challenge: Sediment depletion from upstream dams and deep saltwater intrusion driven by climate change.'
      },
      bulletPoints: {
        vi: [
          'Hiện tượng xâm nhập mặn: Vào mùa khô, ranh mặn 4‰ có thể lấn sâu tới 50-80 km vào nội đồng (Bến Tre, Trà Vinh, Sóc Trăng, Hậu Giang).',
          'Sụt giảm phù sa: Các hồ chứa giữ lại hơn 50% bùn cát mịn, khiến lòng sông bị xói lở sâu và bờ biển bị sạt lở nghiêm trọng.',
          'Mô hình thích nghi thông minh: Trồng lúa mùa mưa (nước ngọt) và nuôi tôm mùa khô (nước mặn lợ) giúp nông dân làm giàu bền vững.'
        ],
        en: [
          'Salinity intrusion: In dry season, the 4‰ salt boundary reaches 50-80 km inland into Ben Tre, Tra Vinh, Soc Trang, Hau Giang.',
          'Sediment starvation: Upstream dams trap over 50% of fine sediments, accelerating riverbed scouring and coastline erosion.',
          'Smart adaptation models: Rotating rice in the wet season (fresh water) and black tiger shrimp in the dry season (brackish water).'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng về mô hình lúa - tôm thích ứng hạn mặn', en: 'Ask Kien Sang about the rice-shrimp climate adaptation model' }
    },
    highschool: {
      tag: { vi: '🎓 Dành cho THPT: Mục 4 SGK Địa lí 11 - Vấn Đề Khai Thác & Sử Dụng Nguồn Nước', en: '🎓 High School Gr.11: Topic 4 - Water Exploitation & Environmental Governance' },
      title: { vi: 'Phân Tích Khai Thác, Sử Dụng Nguồn Nước & Chiến Lược "Thuận Thiên" NQ 120', en: 'Analysis of Water Resource Exploitation & Nature-Based Adaptation' },
      description: {
        vi: 'Bám sát Yêu cầu cần đạt Sách Giáo Khoa Địa lí 11 (Chuyên đề 2): Phân tích toàn diện 5 mục đích khai thác nước, 6 hệ lụy nghiêm trọng (đói phù sa, xâm nhập mặn, sạt lở, cạn kiệt cá di cư) và các giải pháp đa phương MRC cùng Nghị quyết 120/NQ-CP.',
        en: 'Fulfilling Vietnam Grade 11 Curriculum standards: Comprehensive analysis of 5 water utilization sectors, 6 severe transboundary consequences, and synchronized mitigation via MRC protocols and Resolution 120/NQ-CP.'
      },
      bulletPoints: {
        vi: [
          'Thực trạng khai thác: Chuỗi 12 đập Lan Thương (>53.000 MW), tưới tiêu >10 triệu ha đất lúa, trục thủy lộ quốc tế và ngư trường tự nhiên >2,6 triệu tấn/năm.',
          'Hệ lụy nảy sinh: Giữ lại 50-74% lượng phù sa bồi đắp, ranh mặn 4‰ lấn sâu 50-90 km, sụt lún nền đất 1-3 cm/năm và đe dọa tuyệt chủng cá di cư khổng lồ.',
          'Giải pháp căn cơ: Thực thi quy trình tham vấn trước PNPCA của MRC; vận hành cống Cái Lớn - Cái Bé; chuyển đổi nông nghiệp "Thuận thiên" theo NQ 120 (Thủy sản ➔ Trái cây ➔ Lúa gạo).'
        ],
        en: [
          'Water utilization: 12 Lancang cascade dams (>53,000 MW), irrigation for >10M ha cropland, international inland navigation, and capture fishery (>2.6M tons/year).',
          'Arising challenges: 50-74% sediment starvation, 50-90 km deep salinity intrusion, 1-3 cm/year land subsidence, and severance of fish migration routes.',
          'Comprehensive solutions: Enforcing MRC PNPCA prior consultation, operating Cai Lon - Cai Be salinity barrier, and executing Resolution 120 nature-based transition.'
        ]
      },
      actionPrompt: { vi: 'Hỏi Kiến Sáng phân tích các vấn đề trong khai thác nguồn nước Mê Kông', en: 'Ask Kien Sang to analyze water exploitation issues in the Mekong Basin' }
    }
  }
};
