import { RiverStation, MRCInfoTopic, RiverEstuary, MekongBasinScope } from '../types';

export const RIVER_STATIONS: RiverStation[] = [
  {
    id: 'source-tibet',
    name: 'Khởi nguồn Tây Tạng (Núi Tanggula)',
    vietnameseName: 'Thượng nguồn Sông Lan Thương (Trung Quốc)',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    regionType: 'upstream',
    x: 18,
    y: 12,
    lengthFromSourceKm: 0,
    elevation: '5 224 m (Độ cao băng tuyết)',
    waterColor: 'Xanh lam ngọc băng tuyết trong vắt',
    damInfo: 'Khu bảo tồn Tam Giang Nguyên (nơi khởi nguồn Hoàng Hà, Trường Giang, Lan Thương)',
    image: '/src/assets/images/tibet_source_mekong_1789090576111.jpg',
    subObjects: [
      'Đỉnh Tanggula tuyết phủ vĩnh cửu (5.224m)',
      'Sông băng Lasagongma & Suối Zhaqu',
      'Khu bảo tồn quốc gia Tam Giang Nguyên'
    ],
    highlight: 'Độ cao hơn 5.200m so với mực nước biển, bắt nguồn từ sông băng dãy Tanggula trên cao nguyên Thanh Tạng.',
    details: 'Tại Trung Quốc, sông được gọi là Lan Thương Giang (Lancang Jiang). Bắt đầu từ giọt nước băng tan tinh khiết, vượt qua hẻm núi cao nguyên sâu thăm thẳm của Thanh Hải và Vân Nam trước khi đến Tam giác Vàng.',
    ecologicalFact: 'Dòng nước băng tan cung cấp lượng nước ban đầu tinh khiết và giàu khoáng chất cho hệ sinh thái vùng cao nguyên lạnh giá.',
    curriculumGradeNote: {
      primary: 'Nơi sinh ra giọt nước Mê Kông đầu tiên từ đỉnh núi phủ tuyết trắng xóa ở độ cao hơn 5.200m!',
      secondary: 'Địa hình vùng thượng lưu dốc đứng, dòng chảy xiết, địa hình hẻm vực hẹp xẻ sâu vào cao nguyên.',
      highschool: 'Vùng Lan Thương Giang chiếm khoảng 16% tổng lượng dòng chảy nhưng cung cấp tới hơn 50% lượng phù sa cát sỏi ban đầu cho toàn hệ thống.'
    }
  },
  {
    id: 'lancang-gorges',
    name: 'Hẻm Núi Lan Thương & Đập Thủy Điện Vân Nam',
    vietnameseName: 'Chuỗi đập bậc thang Vân Nam (Tiểu Loan & Cảnh Hồng)',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    regionType: 'upstream',
    x: 24,
    y: 20,
    lengthFromSourceKm: 1200,
    elevation: '1 200 - 2 500 m',
    waterColor: 'Xanh thẫm pha xám khoáng thạch',
    damInfo: 'Đập Tiểu Loan (Xiaowan Dam - cao 292m) & Đập Cảnh Hồng (Jinghong Dam)',
    image: '/src/assets/images/tibet_source_mekong_1789090576111.jpg',
    subObjects: [
      'Hẻm núi Tam Giang Song Lưu (Three Parallel Rivers)',
      'Đập thủy điện Tiểu Loan (dung tích 15 tỉ m³)',
      'Đập thủy điện Cảnh Hồng (cửa ngõ Vân Nam - Đông Nam Á)'
    ],
    highlight: 'Khu vực hẻm vực hiểm trở nhất thế giới với chuỗi 11 đập thủy điện bậc thang lớn trên dòng chính.',
    details: 'Đoạn sông Lan Thương chảy qua tỉnh Vân Nam uốn lượn giữa các dãy núi cao ngất ngưởng. Nơi đây Trung Quốc đã xây dựng nhiều hồ chứa thủy điện khổng lồ điều tiết lưu lượng và giữ lại lượng lớn trầm tích phù sa.',
    ecologicalFact: 'Sự xuất hiện của các đập lớn làm biến đổi chu kỳ dòng chảy tự nhiên và chu kỳ di cư của các loài cá thượng lưu.',
    curriculumGradeNote: {
      primary: 'Những hẻm núi khổng lồ cao chọc trời hai bên dòng sông cuộn sóng dữ dội.',
      secondary: 'Tiềm năng thủy điện cực lớn, cung cấp điện năng cho vùng Tây Nam Trung Quốc.',
      highschool: 'Bài toán an ninh nguồn nước: Dung tích trữ nước của chuỗi đập thượng nguồn ảnh hưởng trực tiếp đến dòng chảy mùa khô của 5 nước hạ lưu Mê Kông.'
    }
  },
  {
    id: 'golden-triangle',
    name: 'Ngã Ba Tam Giác Vàng (Golden Triangle)',
    vietnameseName: 'Biên giới Lào - Thái Lan - Myanmar (Sông Ruak & Mê Kông)',
    country: 'Lào / Thái Lan / Myanmar',
    flag: '🇱🇦🇹🇭🇲🇲',
    regionType: 'midstream',
    x: 32,
    y: 28,
    lengthFromSourceKm: 2150,
    elevation: '380 m',
    waterColor: 'Vàng nâu son phù sa cuộn sóng',
    damInfo: 'Khu vực phi đập thủy điện, tuyến đường thủy quốc tế tự do lưu thông',
    image: '/src/assets/images/golden_triangle_river_1789090589259.jpg',
    subObjects: [
      'Hợp lưu sông Ruak và sông Mê Kông',
      'Cột mốc ngã ba biên giới 3 nước',
      'Cảng cạn thương mại Chiang Saen & Tam giác Vàng SEZ'
    ],
    highlight: 'Nơi sông Mê Kông trở thành đường ranh giới tự nhiên giữa ba quốc gia Đông Nam Á.',
    details: 'Sau khi rời Vân Nam, sông Mê Kông tạo thành biên giới tự nhiên giữa Myanmar và Lào, sau đó giữa Lào và Thái Lan. Dòng sông bắt đầu mở rộng thung lũng, trở thành tuyến vận tải thủy nhộn nhịp.',
    ecologicalFact: 'Vùng giao thoa sinh thái và văn hóa bản địa độc đáo của cư dân vùng thung lũng Đông Nam Á.',
    curriculumGradeNote: {
      primary: 'Điểm gặp gỡ kỳ thú của 3 đất nước láng giềng chỉ bằng một ngã ba sông!',
      secondary: 'Sông Mê Kông làm ranh giới tự nhiên dài hàng ngàn cây số giữa Lào và Thái Lan.',
      highschool: 'Vai trò kết nối thương mại đường thủy tiểu vùng sông Mê Kông mở rộng (GMS) và hợp tác bảo vệ an ninh trật tự trên sông.'
    }
  },
  {
    id: 'luang-prabang',
    name: 'Luang Prabang & Thủ Đô Viêng Chăn (Vientiane)',
    vietnameseName: 'Lưu vực Trung lưu Lào & Đập Xayaburi',
    country: 'Lào',
    flag: '🇱🇦',
    regionType: 'midstream',
    x: 48,
    y: 40,
    lengthFromSourceKm: 2700,
    elevation: '280 m',
    waterColor: 'Xanh rêu hòa phù sa nhẹ êm đềm',
    damInfo: 'Đập thủy điện Xayaburi (1.285 MW) & Quy hoạch đập Luang Prabang',
    image: '/src/assets/images/luang_prabang_river_1789090603168.jpg',
    subObjects: [
      'Cố đô Di sản Văn hóa Thế giới Luang Prabang',
      'Thủ đô Viêng Chăn (Vientiane) soi bóng bên sông',
      'Hợp lưu sông Nậm Khan và dòng chính Mê Kông',
      'Đập thủy điện Xayaburi'
    ],
    highlight: 'Cố đô di sản Luang Prabang và Thủ đô Viêng Chăn nằm ngay bên bờ sông Mê Kông.',
    details: 'Sông Mê Kông là huyết mạch sự sống của nước bạn Lào, cung cấp nước sinh hoạt, nông nghiệp và nguồn thủy năng xuất khẩu ("Bình ắc quy của Đông Nam Á"). Lào là quốc gia đóng góp lượng dòng chảy lớn nhất (35%) cho sông Mê Kông.',
    ecologicalFact: 'Hệ sinh thái rừng đầu nguồn phong phú và nơi cư trú của nhiều loài chim di cư quý hiếm ven sông.',
    curriculumGradeNote: {
      primary: 'Thủ đô Viêng Chăn xinh đẹp soi bóng bên làn nước hiền hòa của dòng Mê Kông.',
      secondary: 'Lào đóng góp lượng nước lớn nhất vào dòng Mê Kông (khoảng 35% tổng lưu lượng toàn lưu vực).',
      highschool: 'Vấn đề xây dựng các đập thủy điện bậc thang dòng chính tại Lào (Xayaburi, Don Sahong...) tác động sâu sắc đến chế độ dòng chảy hạ lưu và được quản lí thông qua Quy trình Tham vấn PNPCA của MRC.'
    }
  },
  {
    id: 'khone-falls',
    name: 'Thác Khone Phapheng & Vùng 4.000 Đảo (Si Phan Don)',
    vietnameseName: 'Thác nước lớn nhất ĐNA (Biên giới Lào - Campuchia)',
    country: 'Lào / Campuchia',
    flag: '🇱🇦🇰🇭',
    regionType: 'downstream',
    x: 62,
    y: 58,
    lengthFromSourceKm: 3800,
    elevation: '70 m',
    waterColor: 'Trắng xóa bọt sóng ghềnh thác cuồn cuộn',
    damInfo: 'Đập thủy điện Don Sahong (xây dựng bên cạnh luồng thác Hou Sahong)',
    image: '/src/assets/images/khone_falls_water_1789090617490.jpg',
    subObjects: [
      'Thác Khone Phapheng & Thác Li Phi',
      'Vùng đảo ngập nước Si Phan Don (4.000 đảo)',
      'Hành lang di cư của cá heo nước ngọt Irrawaddy',
      'Cầu đường sắt lịch sử Don Det thời Pháp'
    ],
    highlight: 'Thác nước lớn nhất Đông Nam Á về lưu lượng xả, ngăn cách giao thông thủy thẳng đứng giữa hạ lưu và thượng lưu.',
    details: 'Thác Khone dài hơn 10km gồm hàng trăm ghềnh đá cuồn cuộn chia cắt dòng sông thành muôn vàn nhánh nhỏ. Đây là sinh cảnh sống đặc biệt quan trọng của loài Cá heo nước ngọt Irrawaddy cực kỳ quý hiếm và là điểm ranh giới tự nhiên giữa Lào và Campuchia.',
    ecologicalFact: 'Hành lang di cư sinh học thiết yếu của hàng trăm loài cá trắng vượt ghềnh thác về thượng nguồn để sinh sản mỗi mùa gió mùa.',
    curriculumGradeNote: {
      primary: 'Thác nước hùng vĩ tung bọt trắng xóa và ngắm đàn cá heo nước ngọt bơi lội!',
      secondary: 'Thác Khone là chướng ngại vật tự nhiên ngăn cách tàu thuyền giao thông thẳng đứng từ biển lên thượng nguồn.',
      highschool: 'Điểm nút then chốt trong đa dạng sinh học thủy sản; các tranh luận khoa học về duy trì dòng chảy sinh thái và luồng di cư cho cá tại Đập Don Sahong trong khuôn khổ MRC.'
    }
  },
  {
    id: 'tonle-sap',
    name: 'Biển Hồ Tonle Sap & Ngã Tư Chaktomuk',
    vietnameseName: 'Hồ nước ngọt lớn nhất ĐNA & Thủ đô Phnom Penh (Campuchia)',
    country: 'Campuchia',
    flag: '🇰🇭',
    regionType: 'downstream',
    x: 65,
    y: 72,
    lengthFromSourceKm: 4250,
    elevation: '10 m',
    waterColor: 'Nâu đục màu mỡ giàu phù sa & sinh khối hữu cơ',
    damInfo: 'Hồ điều hòa tự nhiên khổng lồ, không có đập nhân tạo',
    image: '/src/assets/images/tonle_sap_lake_1789090635751.jpg',
    subObjects: [
      'Biển Hồ Tonle Sap (rộng tới 16.000 km² mùa lũ)',
      'Sông Tonle Sap với dòng chảy đổi chiều theo mùa',
      'Ngã tư sông bốn mặt Chaktomuk (Phnom Penh)',
      'Các làng chài nổi truyền thống trên hồ'
    ],
    highlight: 'Hồ nước ngọt tự nhiên lớn nhất Đông Nam Á với hiện tượng "dòng sông chảy ngược" độc nhất vô nhị trên thế giới.',
    details: 'Vào mùa lũ (tháng 6-10), mực nước sông Mê Kông dâng cao dồn ngược vào Biển Hồ, làm diện tích hồ phình to gấp 5 lần (lên tới 16.000 km²). Đến mùa khô (tháng 11-5), hồ xả ngược nước ra Mê Kông qua ngã tư Chaktomuk tiếp nước cho ĐBSCL.',
    ecologicalFact: 'Vựa cá nước ngọt khổng lồ bậc nhất hành tinh, cung cấp tới 75% lượng protein động vật cho nhân dân Campuchia và bồi đắp nguồn lợi thủy sản cho miền Tây Nam Bộ.',
    curriculumGradeNote: {
      primary: 'Hiện tượng dòng sông chảy ngược lạ lùng: mùa mưa nước sông chảy ngược vào hồ, mùa khô nước hồ chảy ra sông!',
      secondary: 'Biển Hồ đóng vai trò như một "bể điều hòa tự nhiên", giảm áp lực ngập úng mùa lũ và bổ sung nguồn nước tưới mùa kiệt cho ĐBSCL.',
      highschool: 'Trọng tâm bài học Địa lí 11: Mối liên hệ hữu cơ giữa Biển Hồ Tonle Sap và Đồng bằng sông Cửu Long. Mực nước Biển Hồ kiệt quệ trong các năm El Nino gần đây là nguyên nhân trực tiếp gây xâm nhập mặn lịch sử tại ĐBSCL.'
    }
  },
  {
    id: 'mekong-delta-vn',
    name: 'Đồng Bằng Sông Cửu Long & 9 Cửa Sông Ra Biển Đông',
    vietnameseName: 'Châu thổ Sông Tiền, Sông Hậu, Cần Thơ & Hậu Giang (Việt Nam)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    regionType: 'delta',
    x: 75,
    y: 88,
    lengthFromSourceKm: 4763,
    elevation: '0.5 - 2 m (Địa hình bằng phẳng thấp)',
    waterColor: 'Nâu đỏ phù sa trù phú "nước ngọt quanh năm bồi đắp ruộng đồng"',
    damInfo: 'Hệ thống công trình kiểm soát mặn & điều tiết nước (Cống Cái Lớn - Cái Bé, đập Ba Lai)',
    image: '/src/assets/images/mekong_sunset_ninh_kieu_1789089991103.jpg',
    subObjects: [
      'Cửa khẩu Vĩnh Xương (An Giang) & Thường Phước (Đồng Tháp) - điểm Mê Kông vào VN',
      'Phân lưu thành 2 nhánh lớn: Sông Tiền (Mekong) & Sông Hậu (Bassac)',
      'Vùng ngập lũ tự nhiên Đồng Tháp Mười & Tứ giác Long Xuyên',
      'Thành phố Cần Thơ & Bến Ninh Kiều, Chợ nổi Cái Răng',
      'Kênh xáng Xà No & Vùng chuyên canh lúa gạo Hậu Giang',
      'Hệ thống 9 Cửa sông Cửu Long đổ ra Biển Đông',
      'Rừng ngập mặn Cà Mau & Khu Ramsar Tràm Chim'
    ],
    highlight: 'Vựa lúa, trái cây và thủy sản lớn nhất Việt Nam, hòa vào Biển Đông bao la qua 9 nhánh rồng.',
    details: 'Chảy vào Việt Nam tại Vĩnh Xương (An Giang) và Thường Phước (Đồng Tháp), chia thành 2 nhánh chính là Sông Tiền và Sông Hậu, tạo nên vùng châu thổ rộng lớn hơn 40.000 km² trù phú bậc nhất với mạng lưới kênh rạch chằng chịt, kết nối với dòng kênh xáng Xà No lịch sử.',
    ecologicalFact: 'Hệ sinh thái đất ngập nước Ramsar Tràm Chim, Rừng ngập mặn Mũi Cà Mau, Lung Ngọc Hoàng, sinh cảnh lúa - tôm thích ứng biến đổi khí hậu.',
    curriculumGradeNote: {
      primary: 'Vùng đất phương Nam mến yêu với những cánh đồng lúa thẳng cánh cò bay, chợ nổi nhộn nhịp xuồng ghe và dòng sông hiền hòa!',
      secondary: 'Chín cửa sông Cửu Long: Tiểu, Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu, Định An, Bát Xắc (Ba Thắc), Trần Đề.',
      highschool: 'Trọng tâm Địa lí 11: Đối mặt thách thức an ninh nguồn nước (suy giảm phù sa, nước biển dâng, sạt lở bờ sông bờ biển, mặn xâm nhập). Thực thi Nghị quyết 120/NQ-CP về phát triển bền vững ĐBSCL theo tư duy "Thuận thiên" và chuyển đổi cơ cấu kinh tế sinh thái.'
    }
  }
];

export const SIX_COUNTRIES_INFO = [
  {
    name: 'Trung Quốc (China)',
    localName: 'Lan Thương Giang (Lancang Jiang - "con sông cuộn sóng")',
    flag: '🇨🇳',
    shareOfBasinArea: '21%',
    shareOfFlow: '16% (khoảng 50% trong mùa khô ở Bắc Lào / Thái Lan)',
    capital: 'Bắc Kinh (Khu vực sông: tỉnh Vân Nam)',
    role: 'Khu vực thượng nguồn sông Mê Công. Sông chảy qua các hẻm núi sâu, địa hình chia cắt mạnh. Sở hữu chuỗi đập thủy điện bậc thang lớn. Là đối tác đối thoại của MRC từ 1996.',
    color: '#E53E3E'
  },
  {
    name: 'Mi-an-ma (Myanmar)',
    localName: 'Mekong River',
    flag: '🇲🇲',
    shareOfBasinArea: '3%',
    shareOfFlow: '2%',
    capital: 'Naypyidaw',
    role: 'Thuộc khu vực thượng nguồn; đoạn biên giới tự nhiên dài 230 km tiếp giáp với Lào; tham gia MRC với tư cách đối tác đối thoại từ năm 1996.',
    color: '#D69E2E'
  },
  {
    name: 'Lào (Laos)',
    localName: 'Mênam Khong ("sông Mẹ" - Mẹ của muôn dòng nước)',
    flag: '🇱🇦',
    shareOfBasinArea: '25%',
    shareOfFlow: '35% (đóng góp lượng nước lớn nhất)',
    capital: 'Viêng Chăn (Vientiane)',
    role: 'Quốc gia có tỉ lệ diện tích lưu vực lớn nhất (25%). Thành viên sáng lập MRC; đẩy mạnh phát triển thủy điện; thủ đô Viêng Chăn nằm ngay bên bờ sông Mê Kông.',
    color: '#3182CE'
  },
  {
    name: 'Thái Lan (Thailand)',
    localName: 'Mênam Khong (Mae Nam Khong)',
    flag: '🇹🇭',
    shareOfBasinArea: '23%',
    shareOfFlow: '18%',
    capital: 'Bangkok',
    role: 'Quốc gia có diện tích lưu vực lớn thứ 2 (23%). Thành viên sáng lập MRC; vùng đông bắc Thái Lan (Isan) có nhu cầu tưới tiêu nông nghiệp rất lớn trong mùa khô.',
    color: '#805AD5'
  },
  {
    name: 'Cam-pu-chia (Cambodia)',
    localName: 'Tôn-lê Thơm ("sông Lớn")',
    flag: '🇰🇭',
    shareOfBasinArea: '20%',
    shareOfFlow: '18%',
    capital: 'Phnôm Pênh',
    role: 'Địa hình tương đối bằng phẳng, châu thổ rộng lớn. Sở hữu hồ Tôn-lê Sáp (Biển Hồ) - "bể điều hòa tự nhiên" và ngư trường nước ngọt khổng lồ; thủ đô Phnôm Pênh tại ngã tư Chaktomuk.',
    color: '#DD6B20'
  },
  {
    name: 'Việt Nam',
    localName: 'Sông Cửu Long (Chín Rồng - chia sông Tiền & sông Hậu)',
    flag: '🇻🇳',
    shareOfBasinArea: '8%',
    shareOfFlow: '11% (hạ lưu tiếp nhận toàn bộ nước từ các nước trên)',
    capital: 'Hà Nội (ĐBSCL: Cần Thơ, An Giang, Đồng Tháp...)',
    role: 'Khoảng 20% diện tích lãnh thổ VN nằm trong lưu vực; châu thổ ĐBSCL bằng phẳng; trung tâm kinh tế lúa gạo, tôm cá xuất khẩu; thành viên sáng lập MRC, tích cực ngoại giao nguồn nước.',
    color: '#C53030'
  }
];

export const MRC_TOPICS: MRCInfoTopic[] = [
  {
    id: 'mrc-founding',
    title: '1. Khái quát lưu vực & Lí do ra đời Uỷ hội sông Mê Công (MRC)',
    subtitle: 'Theo mục 1 & mục 2a Chuyên đề Địa lí 11 (SGK Kết nối tri thức, trang 5 - 9)',
    badge: 'SGK KNTT Tr.5-9',
    content: [
      'Vị trí & Chiều dài: Sông Mê Công bắt nguồn từ sơn nguyên Tây Tạng của Trung Quốc và chảy qua 6 quốc gia: Trung Quốc, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia và Việt Nam. Đây là con sông dài thứ 12 thế giới, thứ 3 châu Á với chiều dài khoảng 4 763 km.',
      'Tên gọi văn hóa: Tại Trung Quốc gọi là Lan Thương Giang ("con sông cuộn sóng"); tại Lào và Thái Lan gọi là Mênam Khong ("sông Mẹ"); tại Cam-pu-chia gọi là Tôn-lê Thơm ("sông Lớn"); khi vào Việt Nam chia thành sông Tiền và sông Hậu, đổ ra biển ở 9 cửa nên gọi là sông Cửu Long.',
      'Diện tích lưu vực: 810 000 km² (theo MRC, 2022). Tỉ lệ diện tích lưu vực theo quốc gia: Lào (25%), Thái Lan (23%), Trung Quốc (21%), Cam-pu-chia (20%), Việt Nam (8%), Mi-an-ma (3%).',
      'Đặc điểm tự nhiên: Tổng lượng dòng chảy trung bình năm đạt 475 tỉ m³, có sự phân mùa rõ rệt. Thượng nguồn lũ vào mùa xuân/đầu hạ do băng tuyết tan. Hạ lưu mùa lũ kéo dài từ tháng 6 đến tháng 11 (mùa mưa), chiếm 70 – 80% tổng lượng dòng chảy cả năm.',
      'Đa dạng sinh học phong phú: Khoảng 20 000 loài thực vật, hơn 1 000 loài cá nước ngọt, 1 200 loài chim, 800 loài bò sát & lưỡng cư, 430 loài thú. Mức độ đa dạng sinh học lớn thứ hai thế giới, chỉ sau sông A-ma-dôn.',
      'Dân cư & Kinh tế hạ lưu: Có hơn 65 triệu người sinh sống (hơn 100 nhóm dân tộc). Các đô thị lớn: Phnôm Pênh, Viêng Chăn, Cần Thơ. Nông nghiệp đảm bảo sinh kế cho 60% dân số, đóng góp 14% GDP. Trữ năng thủy điện khoảng 60 000 MW.',
      'Lịch sử hình thành MRC: Những năm 1950, 4 nước hạ lưu phối hợp; năm 1957 thành lập Uỷ ban Mê Công; năm 1978 đổi tên thành Uỷ ban Lâm thời; ngày 5/4/1995 kí "Hiệp định Hợp tác phát triển bền vững lưu vực sông Mê Công" thành lập Uỷ hội sông Mê Công (MRC). Mi-an-ma và Trung Quốc là 2 đối tác đối thoại.',
      'Cơ cấu tổ chức của MRC: Gồm 3 cấp: Hội đồng (cấp Bộ trưởng), Uỷ ban liên hợp (cấp Cục/Vụ trưởng) và Ban thư kí (đặt tại Viêng Chăn và Phnôm Pênh). Các nước thành lập Uỷ ban sông Mê Công Quốc gia.'
    ],
    keyStats: [
      { label: 'Tổng chiều dài', value: '4 763 km', unit: 'Thứ 12 thế giới, 3 châu Á' },
      { label: 'Diện tích lưu vực', value: '810 000 km²', unit: 'Lào 25%, Thái 23%, TQ 21%' },
      { label: 'Tổng dòng chảy', value: '475 tỉ m³/năm', unit: 'Mùa lũ chiếm 70-80%' },
      { label: 'Dân số hạ lưu', value: '> 65 triệu người', unit: '> 100 nhóm dân tộc' }
    ],
    vietnamRelevance: 'Việt Nam nằm ở cuối nguồn nhận toàn bộ hệ quả dòng chảy. Khoảng 20% diện tích đất nước nằm trong lưu vực. Năm 2019-2020 tại ĐBSCL, mực nước giảm xuống mức thấp nhất trong 100 năm qua.',
    geography11Takeaway: 'Nắm vững 6 quốc gia lưu vực, tên gọi bản địa, số liệu diện tích 810 000 km², tổng dòng chảy 475 tỉ m³, hoàn cảnh ra đời của Hiệp định Mê Kông 1995 và vị thế của 4 thành viên chính thức cùng 2 đối tác đối thoại.'
  },
  {
    id: 'mrc-economic-role',
    title: '2. Vai Trò Của Sông Mê Kông Đối Với Phát Triển Kinh Tế - Xã Hội',
    subtitle: 'Nông nghiệp, Thủy sản, Năng lượng Thủy điện, Giao thông Thủy, Du lịch & Dân sinh (Địa lí 11)',
    badge: 'Kinh Tế - Xã Hội',
    content: [
      'Trục kinh tế huyết mạch của hơn 65 triệu cư dân: Lưu vực sông Mê Kông tạo ra giá trị kinh tế hàng chục tỉ USD mỗi năm, là chiếc nôi của nền văn minh lúa nước Đông Nam Á với hơn 100 nhóm dân tộc anh em cùng chung sống.',
      '1. Nông nghiệp & An ninh lương thực: Sông cung cấp nước tưới tiêu cho hơn 10 triệu ha đất canh tác; hàng chục triệu tấn phù sa màu mỡ bồi đắp mỗi năm kiến tạo 2 vựa lúa lớn nhất Đông Nam Á (đồng bằng Campuchia và ĐBSCL). Riêng ĐBSCL của Việt Nam đóng góp >50% sản lượng lúa, 90% gạo xuất khẩu và 70% trái cây cả nước.',
      '2. Thủy sản & Ngư trường nước ngọt số 1 thế giới: Sản lượng đánh bắt và nuôi trồng thủy sản nội địa đạt hơn 2,6 triệu tấn/năm (trị giá trên 11 tỉ USD). Cung cấp 60% – 80% nguồn protein động vật cho người dân Campuchia và Lào. ĐBSCL là thủ phủ xuất khẩu cá tra, cá basa và tôm nước lợ hàng đầu thế giới.',
      '3. Tiềm năng Thủy điện & Năng lượng tái tạo: Trữ năng lý thuyết đạt từ 30 000 đến 53 000 MW do độ dốc lớn ở thượng và trung lưu. Thúc đẩy công nghiệp hóa ở Trung Quốc và Lào (được mệnh danh là "Bình ắc quy của Đông Nam Á"). Tuy nhiên, các đập cũng đặt ra thách thức giữ lại 50-70% phù sa và cản trở cá di cư.',
      '4. Giao thông vận tải thủy & Giao thương liên quốc gia: Trục giao thông thủy tự nhiên rẻ hơn 30-50% so với đường bộ, chuyên chở nông sản, xi măng, than đá, vật liệu và container qua hệ thống cảng sông quốc tế (Phnom Penh, Cần Thơ, Cái Cui, Cao Lãnh, Mỹ Thới...).',
      '5. Du lịch sinh thái, Văn hóa & Cấp nước dân sinh: Tuyến du lịch tàu thủy quốc tế (Mekong River Cruises), chợ nổi Cái Răng, Phong Điền; Đờn ca tài tử Nam Bộ (UNESCO); cung cấp nước sinh hoạt thiết yếu hàng ngày cho hơn 65 triệu người dân và các đô thị lớn (Viêng Chăn, Phnom Penh, Cần Thơ...).'
    ],
    keyStats: [
      { label: 'Nông nghiệp tưới tiêu', value: '> 10 triệu ha', unit: 'ĐBSCL: 90% gạo XK của VN' },
      { label: 'Sản lượng thủy sản', value: '> 2,6 triệu tấn', unit: 'Ngư trường nước ngọt #1 thế giới' },
      { label: 'Tiềm năng thủy điện', value: '30 000 - 53 000 MW', unit: '"Bình ắc quy Đông Nam Á"' },
      { label: 'Dân số thụ hưởng', value: '> 65 triệu người', unit: 'Cung cấp nước sinh hoạt chính' }
    ],
    vietnamRelevance: 'Đối với Việt Nam, sông Mê Kông (sông Tiền & sông Hậu) là nguồn sống của ĐBSCL - trung tâm nông nghiệp, lúa gạo, cây ăn trái và thủy sản lớn nhất cả nước, gắn liền với bảo đảm an ninh lương thực quốc gia và toàn cầu.',
    geography11Takeaway: 'Học sinh phân tích được 5 vai trò kinh tế - xã hội then chốt: Nông nghiệp, Thủy sản, Năng lượng, Giao thông thủy, Du lịch & Dân sinh; chỉ ra mối liên hệ tương tác giữa việc khai thác thượng nguồn với sinh kế hạ nguồn.'
  },
  {
    id: 'mrc-principles',
    title: '3. Năm Thủ Tục Quản Lí Nước Cốt Lõi Của MRC & 7 Thành Tựu',
    subtitle: 'Theo mục 3a Chuyên đề Địa lí 11 (SGK Kết nối tri thức, trang 10 - 11)',
    badge: 'SGK KNTT Tr.10-11',
    content: [
      'Để thực hiện Hiệp định 1995, Uỷ hội sông Mê Công đã thông qua 5 thủ tục cốt lõi về nước (Hình 6 trang 10 SGK):',
      '1. PDIES (2001) - Thủ tục Trao đổi và chia sẻ thông tin số liệu: Triển khai trao đổi số liệu và thông tin về các chỉ số quan trọng liên quan đến tài nguyên nước giữa 4 quốc gia.',
      '2. PWUM (2003) - Thủ tục Giám sát sử dụng nước: Thiết lập hệ sinh thái giám sát hiệu quả việc sử dụng nước sông Mê Công và các sông nhánh (nước sinh hoạt, tưới tiêu, thủy điện).',
      '3. PNPCA (2003) - Thủ tục Thông báo, tham vấn trước và thoả thuận: Tạo thuận lợi cho hợp tác sử dụng và phát triển tài nguyên nước với bộ ba quy trình cụ thể cho các dự án cơ sở hạ tầng sử dụng tài nguyên nước được đề xuất.',
      '4. PMFM (2006) - Thủ tục Duy trì dòng chảy trên dòng chính: Đặt ra các tiêu chí đánh giá và quy trình giám sát và duy trì dòng chảy thích hợp trên sông Mê Công và sông Tôn-lê Sáp.',
      '5. PWQ (2011) - Thủ tục Chất lượng nước: Củng cố khuôn khổ hợp tác nhằm giám sát và gìn giữ chất lượng nước sông Mê Công và sông Bát Xắc với một loạt tiêu chí đánh giá được thống nhất.',
      'Hội nghị Cấp cao MRC: Quyết định tổ chức 4 năm một lần từ năm 2010. Lần 1: Hua Hin, Thái Lan (4/2010); Lần 2: TP. Hồ Chí Minh, Việt Nam (4/2014); Lần 3: Xiêm Riệp, Cam-pu-chia (4/2018).',
      '7 Thành tựu MRC (2016-2020): Nâng cao tri thức dựa trên bằng chứng; tối ưu hoá quản lí môi trường; quản lí dự án sử dụng nước; thực hiện hiệu quả thủ tục MRC; đối thoại đa tác nhân; tăng cường giám sát dự báo; đổi mới thể chế theo lộ trình phân cấp.'
    ],
    keyStats: [
      { label: 'Thủ tục PDIES', value: 'Năm 2001', unit: 'Chia sẻ thông tin số liệu' },
      { label: 'Thủ tục PNPCA & PWUM', value: 'Năm 2003', unit: 'Tham vấn & Giám sát dùng nước' },
      { label: 'Thủ tục PMFM', value: 'Năm 2006', unit: 'Duy trì dòng chảy dòng chính' },
      { label: 'Thủ tục PWQ', value: 'Năm 2011', unit: 'Chất lượng nước Mê Kông & Bát Xắc' }
    ],
    vietnamRelevance: 'Thủ tục PNPCA và PMFM là công cụ bảo vệ pháp lý then chốt giúp Việt Nam yêu cầu các quốc gia thượng nguồn thực hiện nghĩa vụ chia sẻ dòng chảy mùa cạn và đánh giá tác động xuyên biên giới đối với ĐBSCL.',
    geography11Takeaway: 'Học sinh ghi nhớ chuẩn xác tên và năm ban hành của 5 thủ tục: PDIES (2001), PWUM (2003), PNPCA (2003), PMFM (2006), PWQ (2011) theo đúng sơ đồ Hình 6 SGK Địa lí 11.'
  },
  {
    id: 'mrc-programs-projects',
    title: '4. Các Dự Án Xuyên Biên Giới & Các Cơ Chế Hợp Tác',
    subtitle: 'Theo mục 3b, 3c Chuyên đề Địa lí 11 (SGK Kết nối tri thức, trang 11 - 14)',
    badge: 'SGK KNTT Tr.11-14',
    content: [
      '5 Dự án quản lí tổng hợp tài nguyên nước xuyên biên giới:',
      '(1) Quản lí thuỷ sản trên dòng chính sông Mê Công và trên sông Sê Công (giữa Lào và Cam-pu-chia).',
      '(2) Quản lí tổng hợp tài nguyên nước xuyên biên giới Việt Nam - Cam-pu-chia tại Tiểu lưu vực sông Sê San và Srêpôk.',
      '(3) Quản lí tổng hợp tài nguyên nước xuyên biên giới Việt Nam - Cam-pu-chia tại đồng bằng sông Mê Công.',
      '(4) Quản lí bãi ngập lũ và đất ngập nước (giữa Lào và Thái Lan).',
      '(5) Dự án tăng cường hợp tác truyền thông giữa hồ Tôn-lê Sáp - Song-kha (giữa Cam-pu-chia và Thái Lan).',
      'Các Sáng kiến hợp tác tiêu biểu: Sáng kiến thích ứng với biến đổi khí hậu (CCAI) hỗ trợ các nước thích ứng qua chu kỳ 5 năm; Sáng kiến phát triển thuỷ điện bền vững (ISH, từ 2007-2009) hỗ trợ quy hoạch thủy điện trên cơ sở quản lí tổng hợp tài nguyên nước.',
      'Các Chương trình hợp tác tiêu biểu: AIP (Nông nghiệp và thuỷ lợi); DMP (Quản lí hạn hán); EP (Môi trường - giám sát chất lượng nước định kì); FP (Thuỷ sản - cung cấp dữ liệu nghề cá); NAP (Giao thông thuỷ - tăng cường tự do giao thông và an toàn môi trường).',
      'Các cơ chế hợp tác với các quốc gia liên quan:',
      '• Hợp tác Mê Công - Lan Thương (MLC) ra đời năm 2016: Cơ chế hợp tác đầu tiên về tài nguyên nước có đủ cả 6 quốc gia lưu vực, thúc đẩy thượng nguồn chia sẻ thông tin, công khai dự án.',
      '• Quan hệ đối tác Mê Công - Hoa Kỳ (ra đời năm 2009, Việt Nam, Cam-pu-chia, Lào, Thái Lan, Mi-an-ma tham gia từ 2012).',
      '• Hợp tác Mê Công - Nhật Bản (từ 2007): Sáng kiến Mê Công xanh và kinh tế công nghiệp.',
      '• Hợp tác Mê Công - Hàn Quốc (từ 2011): Kết nối ASEAN, phát triển bền vững và nhân lực.',
      '• Hợp tác Mê Công - sông Hằng (Ấn Độ, từ 2000): Du lịch, văn hóa, giáo dục và kết nối giao thông.'
    ],
    keyStats: [
      { label: 'Dự án song phương', value: '5 dự án', unit: 'Việt Nam tham gia 2 dự án' },
      { label: 'Cơ chế MLC', value: 'Năm 2016', unit: 'Bao gồm toàn bộ 6 quốc gia' },
      { label: 'Chương trình', value: 'AIP, DMP, EP', unit: 'FP (Thuỷ sản), NAP (Thuỷ nội địa)' },
      { label: 'Đối tác phát triển', value: '14 đối tác', unit: 'Mỹ, Nhật, Hàn, Ấn Độ, v.v.' }
    ],
    vietnamRelevance: 'Việt Nam cùng Campuchia hoàn thành xuất sắc 2 dự án song phương về Tiểu lưu vực sông Sê San - Srêpôk và ĐBSCL, củng cố quan hệ láng giềng hữu nghị và quản trị nước công bằng.',
    geography11Takeaway: 'Nắm rõ tên 5 dự án xuyên biên giới song phương, phân biệt sáng kiến ISH, CCAI và các cơ chế hợp tác quốc tế (MLC 2016, Mê Công - Hoa Kỳ 2009, Mê Công - Nhật Bản 2007).'
  },
  {
    id: 'vietnam-role-and-delta',
    title: '5. Vai Trò Của Ủy Hội Sông Mê Công (MRC) & Sự Tham Gia Của Việt Nam',
    subtitle: 'Yêu cầu cần đạt cốt lõi Chuyên đề Địa lí 11: 4 vai trò của MRC & 6 đóng góp trách nhiệm của Việt Nam',
    badge: 'Trọng Tâm Địa 11',
    content: [
      'I. BỐN VAI TRÒ CỐT LÕI CỦA ỦY HỘI SÔNG MÊ CÔNG (MRC):',
      '1. Điều phối & Quản lí bền vững tài nguyên nước: Thúc đẩy việc khai thác, sử dụng và bảo vệ nguồn nước cũng như tài nguyên liên quan một cách công bằng, hợp lí và cùng có lợi; bảo đảm hài hòa giữa phát triển kinh tế lưu vực (thủy điện, thủy lợi, giao thông) với bảo vệ sinh thái tự nhiên và sinh kế hơn 65 triệu dân hạ du.',
      '2. Xây dựng & Thực thi 5 thủ tục quản lí nước cốt lõi: Ban hành và giám sát việc thực hiện 5 quy chế: PDIES (chia sẻ thông tin số liệu, 2001), PWUM (giám sát sử dụng nước, 2003), PNPCA (thông báo, tham vấn trước và thỏa thuận các công trình dòng chính, 2003), PMFM (duy trì dòng chảy tối thiểu, 2006) và PWQ (chất lượng nước, 2011).',
      '3. Trung tâm dữ liệu khoa học, quan trắc & cảnh báo sớm thiên tai: Vận hành mạng lưới quan trắc tự động xuyên biên giới về mực nước, chất lượng nước, phù sa; định kỳ phát bản tin dự báo, cảnh báo sớm lũ lụt, hạn hán và xâm nhập mặn kịp thời cho các quốc gia thành viên.',
      '4. Cầu nối đối thoại ngoại giao nguồn nước & hợp tác quốc tế: Là diễn đàn chính thức để đàm phán, giảm thiểu xung đột lợi ích giữa các quốc gia thượng lưu và hạ lưu; kết nối 4 nước thành viên với Trung Quốc, Myanmar và các đối tác phát triển quốc tế (Mỹ, Nhật Bản, Hàn Quốc, EU, Ngân hàng Thế giới...).',
      'II. VỊ THẾ VÀ SỰ THAM GIA, ĐÓNG GÓP TÍCH CỰC CỦA VIỆT NAM TRONG MRC:',
      '1. Vị thế hạ nguồn sống còn: Việt Nam nằm ở tận cùng hạ lưu; ĐBSCL phụ thuộc tới 95% lượng nước bắt nguồn từ bên ngoài lãnh thổ. Mọi biến động ở thượng nguồn (đập thủy điện, chuyển dòng) đều gây tổn thương trực tiếp (suy giảm 50-70% phù sa, sạt lở, hạn mặn 70-90 km). Tham gia MRC là nhiệm vụ chiến lược bảo vệ an ninh nguồn nước và an ninh lương thực quốc gia.',
      '2. Thành viên sáng lập tích cực & trách nhiệm: Ký Hiệp định Mê Kông 1995; thành lập Ủy ban Sông Mê Kông Việt Nam (18/09/1978) gồm Tiểu ban lưu vực sông Cửu Long và Tiểu ban lưu vực sông Sê San - Srêpôk; luôn gương mẫu tuân thủ và thúc đẩy các nước thực hiện nghiêm ngặt quy chế tham vấn PNPCA.',
      '3. Đăng cai các sự kiện cấp cao & giữ trọng trách lãnh đạo: Tổ chức thành công Hội nghị Cấp cao MRC lần thứ 2 (năm 2014 tại TP. Hồ Chí Minh) thông qua Tuyên bố TP.HCM về an ninh Nước - Năng lượng - Lương thực; đảm nhiệm xuất sắc vai trò Chủ tịch Hội đồng MRC vào các năm 2018 và 2022.',
      '4. Tiên phong nghiên cứu khoa học độc lập: Chủ trì công trình Nghiên cứu tác động của các bậc thang thủy điện dòng chính Mê Kông đối với ĐBSCL (MDS - Mekong Delta Study), cung cấp luận cứ khoa học chuẩn xác bảo vệ quyền lợi lưu vực.',
      '5. Thúc đẩy mở rộng hợp tác với các nước thượng nguồn: Vận động Trung Quốc chia sẻ số liệu thủy văn Lan Thương quanh năm; phối hợp đề nghị xả nước khẩn cấp từ các hồ chứa thượng nguồn giải cứu hạn mặn lịch sử cho ĐBSCL vào các năm 2016 và 2020.',
      '6. Lồng ghép với chiến lược quốc gia "Thuận thiên": Ban hành Nghị quyết 120/NQ-CP về phát triển bền vững ĐBSCL thích ứng BĐKH theo hướng thuận thiên, chuyển đổi mô hình kinh tế lúa - tôm, quy hoạch tích trữ nước ngọt phân tán và chủ động sống chung với hạn mặn.'
    ],
    keyStats: [
      { label: 'Vai trò cốt lõi MRC', value: '4 Trụ cột', unit: 'Điều phối, 5 thủ tục, dữ liệu & ngoại giao' },
      { label: 'Hạ nguồn ĐBSCL', value: '95% lượng nước', unit: 'Bắt nguồn từ ngoài lãnh thổ Việt Nam' },
      { label: 'Hội nghị Cấp cao 2', value: 'Năm 2014', unit: 'Tổ chức tại TP. Hồ Chí Minh' },
      { label: 'Chủ tịch Hội đồng MRC', value: '2018 & 2022', unit: 'Việt Nam đảm nhiệm thành công' }
    ],
    vietnamRelevance: 'Đối với Việt Nam, tham gia MRC với tinh thần chủ động, trách nhiệm và thượng tôn luật pháp quốc tế là "lá chắn" pháp lí và ngoại giao bảo vệ hơn 17-20 triệu cư dân, vựa lúa 90% gạo xuất khẩu và hệ sinh thái độc đáo của miền Tây Nam Bộ.',
    geography11Takeaway: 'Yêu cầu cần đạt Chuyên đề Địa lí 11: Nêu được 4 vai trò của MRC (quản lí bền vững, 5 thủ tục, quan trắc cảnh báo, đối thoại ngoại giao) và phân tích sự tham gia chủ động, tích cực của Việt Nam (sáng lập, tổ chức HNCC 2014, nghiên cứu MDS, hợp tác Lan Thương, Nghị quyết 120 "Thuận thiên").'
  },
  {
    id: 'east-sea-cooperation',
    title: '6. Phần Mở Rộng: Hợp Tác Hoà Bình Trong Khai Thác Biển Đông',
    subtitle: 'Theo Phần II Chuyên đề 11.1 (SGK Kết nối tri thức, trang 16 - 19)',
    badge: 'SGK KNTT Tr.16-19',
    content: [
      'Khái quát Biển Đông: Diện tích khoảng 3,44 triệu km², là một trong những khu vực chiến lược quan trọng bậc nhất thế giới, trải rộng từ 3°N đến 26°B, bao bọc bởi 9 quốc gia ven bờ. Biển Đông kết nối Thái Bình Dương với Ấn Độ Dương qua eo biển Ma-lắc-ca.',
      'Tài nguyên thiên nhiên phong phú: Thuỷ sản, dầu mỏ, khí tự nhiên, khoáng sản và tiềm năng du lịch biển. Sản lượng khai thác thuỷ sản tại Biển Đông chiếm khoảng 7 – 8% sản lượng cá khai thác của thế giới với hơn 100 loài cá có giá trị kinh tế cao.',
      'Hợp tác nghề cá ở vịnh Bắc Bộ: Hiệp định hợp tác nghề cá ở vịnh Bắc Bộ giữa Việt Nam với Trung Quốc được kí ngày 25 - 12 - 2000 tại Bắc Kinh. Thiết lập "Vùng đánh cá chung" giới hạn từ đường đóng cửa vịnh đến vĩ tuyến 20°B, cách đường phân định 30,5 hải lí mỗi phía.',
      'Hai nguyên tắc đặc thù tại vịnh Bắc Bộ: Nguyên tắc bảo tồn, quản lí các nguồn lợi thuỷ sản và nguyên tắc bình đẳng về năng lực tàu thuyền.',
      'Hợp tác nghề cá trong vịnh Thái Lan:',
      '• Với Cam-pu-chia: Kí Hiệp định về vùng nước lịch sử (năm 1982), cho phép ngư dân hai nước duy trì tập quán đánh bắt cũ và không quy định cụ thể mô hình, số lượng đánh bắt.',
      '• Với Thái Lan: Ngày 9 - 8 - 1997, Việt Nam và Thái Lan đã kí Hiệp định về phân định ranh giới trên biển giữa hai nước trong vịnh Thái Lan, tạo tiền đề cho hợp tác khai thác hoà bình.'
    ],
    keyStats: [
      { label: 'Diện tích Biển Đông', value: '~3,44 triệu km²', unit: 'Chiến lược bậc nhất thế giới' },
      { label: 'Khai thác thuỷ sản', value: '7 – 8%', unit: 'Sản lượng cá khai thác toàn cầu' },
      { label: 'Hiệp định vịnh Bắc Bộ', value: '25 - 12 - 2000', unit: 'Việt Nam - Trung Quốc (Vùng chung)' },
      { label: 'Ranh giới biển vịnh Thái Lan', value: '9 - 8 - 1997', unit: 'Việt Nam - Thái Lan' }
    ],
    vietnamRelevance: 'Biển Đông là cửa ngõ hướng biển của dòng sông Mê Kông. Các hiệp định nghề cá và phân định ranh giới biển khẳng định đường lối đối ngoại hòa bình, hợp tác và bảo vệ chủ quyền thiêng liêng của Việt Nam.',
    geography11Takeaway: 'Nắm vững các mốc thời gian: Hiệp định nghề cá vịnh Bắc Bộ (25/12/2000), Hiệp định vùng nước lịch sử với Campuchia (1982), Phân định ranh giới biển vịnh Thái Lan với Thái Lan (9/8/1997).'
  }
];

export const MEKONG_GEOGRAPHY_SCOPE: MekongBasinScope = {
  geographicalLocation: {
    coordinates: 'Khoảng 8°30\'B – 33°50\'B và 94°E – 106°E',
    origin: 'Dãy núi Tanggula, cao nguyên Tây Tạng (tỉnh Thanh Hải, Trung Quốc) ở độ cao >5.200 m',
    mouth: 'Đổ ra Biển Đông qua 9 cửa sông (Cửu Long Giang) tại đồng bằng sông Cửu Long (Việt Nam)',
    regionalLocation: 'Thuộc khu vực Đông Á và Đông Nam Á; con sông quốc tế dài nhất Đông Nam Á',
    elevationDrop: 'Chênh lệch độ cao từ nguồn (>5.200m) xuống mực nước biển (0m) tạo nên tiềm năng thủy điện khổng lồ ở thượng lưu và vùng châu thổ phù sa trù phú ở hạ lưu'
  },
  basinScope: {
    totalAreaKm2: 810000,
    rankWorldArea: 21,
    totalLengthKm: 4763,
    rankWorldLength: 12,
    rankAsiaLength: 3,
    meanAnnualDischargeM3: 475,
    rankWorldDischarge: 8,
    upperBasin: {
      name: 'Thượng lưu vực (Upper Mekong Basin - Sông Lan Thương)',
      shareArea: '24% diện tích lưu vực (~195.000 km²)',
      shareFlow: '18% tổng lượng dòng chảy hàng năm',
      shareSediment: '> 50% tổng lượng trầm tích cát sỏi thô và bùn khoáng',
      countries: ['Trung Quốc (21%)', 'Mi-an-ma (3%)'],
      terrain: 'Hẻm vực núi cao sâu hiểm trở, độ dốc lớn, thung lũng hẹp, dòng chảy xiết, tiềm năng thủy điện bậc thang cực lớn.'
    },
    lowerBasin: {
      name: 'Hạ lưu vực (Lower Mekong Basin - LMB)',
      shareArea: '76% diện tích lưu vực (~615.000 km²)',
      shareFlow: '82% tổng lượng dòng chảy hàng năm',
      shareSediment: 'Phù sa mịn hữu cơ bồi đắp đồng bằng ngập lũ và ven biển',
      countries: ['Lào (25%)', 'Thái Lan (23%)', 'Cam-pu-chia (20%)', 'Việt Nam (8%)'],
      population: 'Hơn 65 triệu người sinh sống thuộc hơn 100 nhóm dân tộc anh em',
      terrain: 'Địa hình thoải dần, chuyển từ cao nguyên lượn sóng sang đồng bằng châu thổ thấp phẳng màu mỡ và mạng lưới kênh rạch chằng chịt.'
    },
    waterRegime: {
      floodSeason: 'Mùa lũ: Từ tháng 6 đến tháng 11, chiếm 75% – 80% tổng dòng chảy cả năm (đỉnh lũ thường rơi vào tháng 8 – tháng 10).',
      drySeason: 'Mùa cạn: Từ tháng 12 đến tháng 5 năm sau, chỉ chiếm 20% – 25% tổng dòng chảy, thường xuyên đối mặt nguy cơ hạn hán và xâm nhập mặn.',
      tonleSapRole: 'Biển Hồ Tonle Sap (Campuchia) đóng vai trò bể điều hòa tự nhiên vô giá: mùa lũ nhận nước dồn ngược vào hồ (phình rộng lên 16.000 km²), mùa cạn xả ngược nước ra dòng chính Mê Kông bổ sung dòng chảy cho ĐBSCL.'
    }
  }
};

export const RIVER_NINE_ESTUARIES: RiverEstuary[] = [
  {
    id: 'tieu',
    number: 1,
    name: 'Cửa Tiểu',
    vietnameseFull: 'Cửa Tiểu (Sông Tiền)',
    branch: 'Sông Tiền',
    subBranch: 'Nhánh Sông Mỹ Tho',
    province: 'Tiền Giang (Gò Công Đông)',
    svgCoords: {
      x1: 415,
      y1: 582,
      x2: 456,
      y2: 566,
      labelX: 458,
      labelY: 564
    },
    status: 'Thông luồng tự nhiên',
    description: 'Cửa sông phía bắc cùng của Sông Tiền, tiếp giáp cù lao Tân Thành (Gò Công), mở ra Biển Đông.'
  },
  {
    id: 'dai',
    number: 2,
    name: 'Cửa Đại',
    vietnameseFull: 'Cửa Đại (Sông Tiền)',
    branch: 'Sông Tiền',
    subBranch: 'Nhánh Sông Mỹ Tho',
    province: 'Tiền Giang & Bến Tre',
    svgCoords: {
      x1: 415,
      y1: 585,
      x2: 466,
      y2: 576,
      labelX: 468,
      labelY: 575
    },
    status: 'Cửa rộng, giàu nguồn lợi tôm cá',
    description: 'Nằm giữa huyện Gò Công Đông (Tiền Giang) và huyện Bình Đại (Bến Tre), là một trong những cửa sông rộng và sâu nhất nhánh Sông Tiền.'
  },
  {
    id: 'balai',
    number: 3,
    name: 'Cửa Ba Lai',
    vietnameseFull: 'Cửa Ba Lai (Sông Tiền)',
    branch: 'Sông Tiền',
    subBranch: 'Nhánh Ba Lai',
    province: 'Bến Tre (Bình Đại / Ba Tri)',
    svgCoords: {
      x1: 414,
      y1: 588,
      x2: 462,
      y2: 587,
      labelX: 464,
      labelY: 587
    },
    status: 'Đã đắp Đập ngăn mặn Ba Lai (năm 2002)',
    description: 'Dòng sông Ba Lai được xây đập cống chặn mặn năm 2002 nhằm giữ ngọt cho hơn 115.000 ha nông nghiệp Bến Tre, khiến lưu lượng dòng chảy tự nhiên ra biển giảm đáng kể.',
    isDammed: true
  },
  {
    id: 'hamluong',
    number: 4,
    name: 'Cửa Hàm Luông',
    vietnameseFull: 'Cửa Hàm Luông (Sông Tiền)',
    branch: 'Sông Tiền',
    subBranch: 'Nhánh Hàm Luông',
    province: 'Bến Tre (Ba Tri / Thạnh Phú)',
    svgCoords: {
      x1: 412,
      y1: 592,
      x2: 457,
      y2: 598,
      labelX: 459,
      labelY: 599
    },
    status: 'Lưu lượng lớn, vận tải thủy tấp nập',
    description: 'Nhánh sông sâu rộng dài trên 70 km chảy trọn vẹn trong lòng tỉnh Bến Tre, là tuyến vận tải thủy huyết mạch của xứ dừa ra Biển Đông.'
  },
  {
    id: 'cochien',
    number: 5,
    name: 'Cửa Cổ Chiên',
    vietnameseFull: 'Cửa Cổ Chiên (Sông Tiền)',
    branch: 'Sông Tiền',
    subBranch: 'Nhánh Cổ Chiên',
    province: 'Bến Tre & Trà Vinh',
    svgCoords: {
      x1: 409,
      y1: 596,
      x2: 449,
      y2: 610,
      labelX: 451,
      labelY: 611
    },
    status: 'Rộng mênh mông, nhiều cồn bãi sinh thái',
    description: 'Là ranh giới tự nhiên giữa huyện Thạnh Phú (Bến Tre) và huyện Châu Thành (Trà Vinh), nổi tiếng với các vùng nuôi nghêu sò xuất khẩu.'
  },
  {
    id: 'cunghau',
    number: 6,
    name: 'Cửa Cung Hầu',
    vietnameseFull: 'Cửa Cung Hầu (Sông Tiền)',
    branch: 'Sông Tiền',
    subBranch: 'Phân nhánh hạ lưu Cổ Chiên',
    province: 'Trà Vinh (Cầu Ngang / Duyên Hải)',
    svgCoords: {
      x1: 406,
      y1: 600,
      x2: 441,
      y2: 621,
      labelX: 443,
      labelY: 622
    },
    status: 'Luồng lạch sinh thái rừng ngập mặn',
    description: 'Nhánh Cổ Chiên khi đến gần biển tách làm 2 nhánh bao bọc cồn bãi cồn Cù, đổ ra biển tại Cửa Cung Hầu thuộc Trà Vinh.'
  },
  {
    id: 'dinhan',
    number: 7,
    name: 'Cửa Định An',
    vietnameseFull: 'Cửa Định An (Sông Hậu)',
    branch: 'Sông Hậu',
    subBranch: 'Dòng chính Sông Hậu (Bassac)',
    province: 'Trà Vinh & Sóc Trăng',
    svgCoords: {
      x1: 385,
      y1: 622,
      x2: 425,
      y2: 628,
      labelX: 427,
      labelY: 630
    },
    status: 'Luồng hàng hải chính cho tàu trọng tải lớn',
    description: 'Cửa thoát nước và phù sa chủ lực nhất của dòng Sông Hậu ra Biển Đông; là tuyến luồng dẫn tàu hàng biển quốc tế đi vào cảng Cần Thơ.'
  },
  {
    id: 'trande',
    number: 8,
    name: 'Cửa Trần Đề',
    vietnameseFull: 'Cửa Trần Đề (Sông Hậu)',
    branch: 'Sông Hậu',
    subBranch: 'Dòng Sông Hậu (nhánh nam)',
    province: 'Sóc Trăng (Huyện Trần Đề)',
    svgCoords: {
      x1: 382,
      y1: 625,
      x2: 408,
      y2: 639,
      labelX: 410,
      labelY: 641
    },
    status: 'Quy hoạch Cảng biển nước sâu quốc tế',
    description: 'Nơi xuất phát các chuyến tàu cao tốc đi Côn Đảo; quy hoạch xây dựng Cảng cửa ngõ quốc tế Trần Đề trị giá hơn 50.000 tỉ đồng.'
  },
  {
    id: 'bathac',
    number: 9,
    name: 'Cửa Ba Thắc (Bassac)',
    vietnameseFull: 'Cửa Ba Thắc / Bát Xắc (Sông Hậu)',
    branch: 'Sông Hậu',
    subBranch: 'Nhánh Ba Thắc lịch sử',
    province: 'Sóc Trăng (Cù Lao Dung)',
    svgCoords: {
      x1: 378,
      y1: 628,
      x2: 393,
      y2: 648,
      labelX: 395,
      labelY: 651
    },
    status: 'Bồi lấp tự nhiên từ đầu TK 20 (Cửa sông thứ 9 lịch sử)',
    description: 'Theo thư tịch cổ, đây là cửa sông thứ 9 của Cửu Long Giang. Qua hàng thế kỷ, phù sa bồi đắp đã lấp dần cửa sông tạo nên huyện đảo Cù Lao Dung màu mỡ tươi tốt.',
    isHistoricalSedimented: true
  }
];

