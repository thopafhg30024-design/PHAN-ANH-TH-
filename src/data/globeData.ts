// Geographic, Hydrological, and Cartographic Data for the 3D Mekong Globe Map

export interface GlobeGeoPoint {
  lat: number;
  lon: number;
  name?: string;
}

export interface HydrologicalStation {
  id: string;
  name: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
  riverKm: number;
  elevationM: number;
  role: string;
  waterLevel: {
    normal: number; // m
    flood: number;  // m
    dry: number;    // m
    alarm1: number; // m
    alarm2: number; // m
    alarm3: number; // m
  };
  discharge: {
    normal: number; // m³/s
    flood: number;  // m³/s
    dry: number;    // m³/s
    historicalMax: number; // m³/s
  };
  mrcStationCode: string;
  highlightsVi: string;
  highlightsEn: string;
}

export interface TransportRoute {
  id: string;
  name: string;
  nameEn: string;
  type: 'waterway' | 'bridge' | 'port' | 'highway';
  lat: number;
  lon: number;
  country: string;
  descriptionVi: string;
  descriptionEn: string;
  capacityOrYear?: string;
}

export interface CountryJourneyInfo {
  index: number;
  id: string;
  nameVi: string;
  nameEn: string;
  flag: string;
  capital: string;
  lengthKm: number;
  shareBasinArea: string;
  shareFlow: string;
  centerLat: number;
  centerLon: number;
  zoom: number;
  color: string;
  entryExitPointsVi: string;
  mainDamsOrFeatures: string[];
  hydrologyRoleVi: string;
  hydrologyRoleEn: string;
}

// 40+ Accurate Coordinates of the Mekong River Mainstream (from Tanggula glacier to East Sea)
export const MEKONG_RIVER_COORDINATES: Array<GlobeGeoPoint & { country: string; elevationM: number; sectionName: string }> = [
  { lat: 33.72, lon: 94.68, country: 'Trung Quốc', elevationM: 5224, sectionName: 'Nguồn sông băng Tanggula (Lasagongma)' },
  { lat: 33.25, lon: 95.12, country: 'Trung Quốc', elevationM: 4850, sectionName: 'Suối Zhaqu - Cao nguyên Thanh Tạng' },
  { lat: 32.89, lon: 95.30, country: 'Trung Quốc', elevationM: 4200, sectionName: 'Zaduo - Khu bảo tồn Tam Giang Nguyên' },
  { lat: 32.18, lon: 96.48, country: 'Trung Quốc', elevationM: 3800, sectionName: 'Nangqen - Hẻm vực thượng lưu' },
  { lat: 31.14, lon: 97.17, country: 'Trung Quốc', elevationM: 3200, sectionName: 'Xương Đô (Qamdo) - Hợp lưu Za Qu & Ngom Qu' },
  { lat: 29.85, lon: 98.60, country: 'Trung Quốc', elevationM: 2750, sectionName: 'Thượng hẻm núi Vân Nam' },
  { lat: 28.45, lon: 98.92, country: 'Trung Quốc', elevationM: 2200, sectionName: 'Tam Giang Song Lưu (Three Parallel Rivers)' },
  { lat: 27.15, lon: 99.30, country: 'Trung Quốc', elevationM: 1900, sectionName: 'Hẻm núi sâu Vân Nam' },
  { lat: 25.68, lon: 99.85, country: 'Trung Quốc', elevationM: 1450, sectionName: 'Hồ chứa Thủy điện Hoàng Đăng & Đại Hoa Kiều' },
  { lat: 24.70, lon: 100.08, country: 'Trung Quốc', elevationM: 1240, sectionName: 'Đập Thủy điện Tiểu Loan (Xiaowan - cao 292m)' },
  { lat: 24.02, lon: 100.45, country: 'Trung Quốc', elevationM: 950, sectionName: 'Đập Mạn Loan (Manwan Dam)' },
  { lat: 23.35, lon: 100.52, country: 'Trung Quốc', elevationM: 800, sectionName: 'Đập Nọa Trát Độ (Nuozhadu Dam - 5.850 MW)' },
  { lat: 22.02, lon: 100.80, country: 'Trung Quốc', elevationM: 540, sectionName: 'Đập Cảnh Hồng (Jinghong) - Cửa ngõ Tây Song Bản Nạp' },
  { lat: 21.55, lon: 101.15, country: 'Trung Quốc / Lào / Myanmar', elevationM: 490, sectionName: 'Ngã ba biên giới TQ - Lào - Myanmar' },
  { lat: 21.15, lon: 100.75, country: 'Myanmar / Lào', elevationM: 420, sectionName: 'Biên giới tự nhiên Lào - Myanmar (230 km)' },
  { lat: 20.35, lon: 100.08, country: 'Thái Lan / Lào / Myanmar', elevationM: 360, sectionName: 'Ngã ba Tam Giác Vàng (Golden Triangle / Sông Ruak)' },
  { lat: 20.26, lon: 100.41, country: 'Thái Lan / Lào', elevationM: 350, sectionName: 'Chiang Khong (Thái) - Huay Xai (Lào) / Cầu Hữu Nghị 4' },
  { lat: 20.10, lon: 100.95, country: 'Lào', elevationM: 340, sectionName: 'Pakbeng - Bờ bắc sông Mê Kông' },
  { lat: 19.89, lon: 102.13, country: 'Lào', elevationM: 290, sectionName: 'Cố đô Luang Prabang - Hợp lưu Sông Nam Khan' },
  { lat: 19.25, lon: 101.80, country: 'Lào', elevationM: 250, sectionName: 'Đập Thủy điện Xayaburi (1.285 MW trên dòng chính)' },
  { lat: 17.96, lon: 102.60, country: 'Lào / Thái Lan', elevationM: 170, sectionName: 'Thủ đô Viêng Chăn (Vientiane) & Nong Khai / Cầu Hữu Nghị 1' },
  { lat: 18.38, lon: 103.65, country: 'Lào / Thái Lan', elevationM: 155, sectionName: 'Paksane - Sông Nam Kading hợp lưu' },
  { lat: 17.40, lon: 104.80, country: 'Lào / Thái Lan', elevationM: 140, sectionName: 'Nakhon Phanom (Thái) & Thakhek (Lào) / Cầu Hữu Nghị 3' },
  { lat: 16.55, lon: 104.75, country: 'Lào / Thái Lan', elevationM: 130, sectionName: 'Mukdahan & Savannakhet / Cầu Hữu Nghị 2' },
  { lat: 15.30, lon: 105.50, country: 'Thái Lan / Lào', elevationM: 110, sectionName: 'Hợp lưu Sông Mun (Ubon Ratchathani - Thái Lan)' },
  { lat: 15.12, lon: 105.78, country: 'Lào', elevationM: 95, sectionName: 'Thành phố Pakse - Trung tâm Nam Lào' },
  { lat: 14.25, lon: 105.90, country: 'Lào', elevationM: 80, sectionName: 'Quần đảo Si Phan Don (4.000 đảo) & Cá heo Irrawaddy' },
  { lat: 13.95, lon: 105.95, country: 'Lào / Campuchia', elevationM: 65, sectionName: 'Thác Khone Phapheng (hùng vĩ nhất ĐNA) & Đập Don Sahong' },
  { lat: 13.52, lon: 105.97, country: 'Campuchia', elevationM: 45, sectionName: 'Stung Treng - Hợp lưu hệ thống sông 3S (Se San - Srepok - Se Kong)' },
  { lat: 12.49, lon: 106.02, country: 'Campuchia', elevationM: 25, sectionName: 'Kratie - Trạm thủy văn then chốt cửa ngõ châu thổ' },
  { lat: 11.99, lon: 105.46, country: 'Campuchia', elevationM: 18, sectionName: 'Kampong Cham - Cầu Kizuna' },
  { lat: 11.56, lon: 104.93, country: 'Campuchia', elevationM: 12, sectionName: 'Phnom Penh - Ngã tư sông Chaktomuk & Sông Tonle Sap' },
  { lat: 11.25, lon: 105.28, country: 'Campuchia', elevationM: 8, sectionName: 'Neak Loeung - Cầu Tsubasa' },
  { lat: 10.82, lon: 105.18, country: 'Việt Nam', elevationM: 4.5, sectionName: 'Cửa khẩu Vĩnh Xương (An Giang) & Thường Phước (Đồng Tháp)' },
  { lat: 10.78, lon: 105.24, country: 'Việt Nam', elevationM: 4.0, sectionName: 'Trạm Thủy văn Tân Châu (Sông Tiền)' },
  { lat: 10.70, lon: 105.12, country: 'Việt Nam', elevationM: 3.8, sectionName: 'Trạm Thủy văn Châu Đốc (Sông Hậu)' },
  { lat: 10.45, lon: 105.62, country: 'Việt Nam', elevationM: 2.8, sectionName: 'Cao Lãnh (Đồng Tháp) - Cầu Cao Lãnh' },
  { lat: 10.35, lon: 106.35, country: 'Việt Nam', elevationM: 2.0, sectionName: 'Mỹ Tho (Tiền Giang) - Cầu Rạch Miễu / Cầu Mỹ Thuận' },
  { lat: 10.04, lon: 105.78, country: 'Việt Nam', elevationM: 1.8, sectionName: 'Thành phố Cần Thơ & Hậu Giang (Kênh xáng Xà No)' },
  { lat: 9.85, lon: 106.45, country: 'Việt Nam', elevationM: 1.2, sectionName: 'Trà Vinh & Bến Tre - Phân lưu 9 cửa sông Cửu Long' },
  { lat: 10.27, lon: 106.75, country: 'Việt Nam', elevationM: 0, sectionName: 'Cửa Tiểu & Cửa Đại (Gò Công - Biển Đông)' },
  { lat: 10.05, lon: 106.78, country: 'Việt Nam', elevationM: 0, sectionName: 'Cửa Hàm Luông & Cổ Chiên (Bến Tre - Biển Đông)' },
  { lat: 9.60, lon: 106.28, country: 'Việt Nam', elevationM: 0, sectionName: 'Cửa Định An & Trần Đề (Sông Hậu - Sóc Trăng - Biển Đông)' }
];

// Tonle Sap Lake & Inflow/Outflow Path
export const TONLE_SAP_COORDINATES: GlobeGeoPoint[] = [
  { lat: 11.56, lon: 104.93, name: 'Phnom Penh Chaktomuk' },
  { lat: 11.85, lon: 104.75, name: 'Kampong Chhnang' },
  { lat: 12.25, lon: 104.50, name: 'Cửa hồ Tonle Sap' },
  { lat: 12.55, lon: 104.15, name: 'Lòng Biển Hồ Tonle Sap Đông' },
  { lat: 12.95, lon: 103.85, name: 'Lòng Biển Hồ Tonle Sap Tây (Siem Reap)' },
  { lat: 13.10, lon: 103.60, name: 'Đầm lầy Battambang' }
];

// 6 Riparian Countries Flow Journey Details
export const SIX_COUNTRIES_JOURNEY: CountryJourneyInfo[] = [
  {
    index: 1,
    id: 'china',
    nameVi: 'Trung Quốc (Lan Thương Giang)',
    nameEn: 'China (Lancang Jiang)',
    flag: '🇨🇳',
    capital: 'Bắc Kinh (Tỉnh Vân Nam)',
    lengthKm: 2161,
    shareBasinArea: '21%',
    shareFlow: '16% (khoảng 50% trong mùa cạn)',
    centerLat: 28.5,
    centerLon: 99.5,
    zoom: 2.2,
    color: '#ef4444',
    entryExitPointsVi: 'Bắt nguồn tại núi tuyết Tanggula (5.224m) -> Thoát ra tại ngã ba TQ - Lào - Myanmar.',
    mainDamsOrFeatures: ['Đập Tiểu Loan (Xiaowan - 292m)', 'Đập Nọa Trát Độ (Nuozhadu - 5.850MW)', 'Đập Cảnh Hồng (Jinghong)'],
    hydrologyRoleVi: 'Nguồn cung cấp băng tan tinh khiết ban đầu và giữ lại lượng trầm tích, phù sa cát thô rất lớn trong các hồ chứa thủy điện bậc thang.',
    hydrologyRoleEn: 'Provides initial glacial snowmelt; upstream cascade reservoirs regulate dry-season flows and trap bedload sediments.'
  },
  {
    index: 2,
    id: 'myanmar',
    nameVi: 'Mi-an-ma (Myanmar)',
    nameEn: 'Myanmar',
    flag: '🇲🇲',
    capital: 'Naypyidaw',
    lengthKm: 31,
    shareBasinArea: '3%',
    shareFlow: '2%',
    centerLat: 21.3,
    centerLon: 100.8,
    zoom: 3.5,
    color: '#eab308',
    entryExitPointsVi: 'Đoạn sông biên giới tự nhiên dài 230 km tiếp giáp với Lào tại bang Shan, kết thúc tại Tam Giác Vàng.',
    mainDamsOrFeatures: ['Biên giới tự nhiên sông Mê Kông - Lào', 'Vùng Tam Giác Vàng (Golden Triangle)', 'Rừng nhiệt đới nguyên sinh bang Shan'],
    hydrologyRoleVi: 'Là đối tác đối thoại của MRC từ 1996, giữ vai trò quan trọng trong việc bảo vệ sinh thái rừng phòng hộ đầu nguồn và hành lang đường thủy.',
    hydrologyRoleEn: 'Dialogue partner to MRC since 1996; maintains pristine riparian forests along 230 km natural border with Laos.'
  },
  {
    index: 3,
    id: 'laos',
    nameVi: 'Lào (Mênam Khong)',
    nameEn: 'Laos',
    flag: '🇱🇦',
    capital: 'Viêng Chăn (Vientiane)',
    lengthKm: 1870,
    shareBasinArea: '25%',
    shareFlow: '35% (đóng góp lớn nhất)',
    centerLat: 18.2,
    centerLon: 103.2,
    zoom: 2.6,
    color: '#3b82f6',
    entryExitPointsVi: 'Nhận nước từ Tam Giác Vàng -> Chảy dọc chiều dài đất nước và biên giới Thái Lan -> Rời Lào tại thác Khone.',
    mainDamsOrFeatures: ['Cố đô Luang Prabang', 'Đập Xayaburi (1.285MW)', 'Thủ đô Viêng Chăn', 'Quần đảo Si Phan Don', 'Thác Khone Phapheng'],
    hydrologyRoleVi: 'Được mệnh danh là "Bình điện của Đông Nam Á". Chiếm diện tích lưu vực lớn nhất và đóng góp tới 35% tổng lượng nước cho toàn lưu vực Mê Kông.',
    hydrologyRoleEn: 'Contributes the largest share of basin discharge (35%) and largest basin area (25%); major hydropower producer ("Battery of SE Asia").'
  },
  {
    index: 4,
    id: 'thailand',
    nameVi: 'Thái Lan (Mae Nam Khong)',
    nameEn: 'Thailand',
    flag: '🇹🇭',
    capital: 'Bangkok',
    lengthKm: 976,
    shareBasinArea: '23%',
    shareFlow: '18%',
    centerLat: 16.8,
    centerLon: 103.5,
    zoom: 2.8,
    color: '#8b5cf6',
    entryExitPointsVi: 'Chảy dọc biên giới với Lào tại Chiang Rai, Nong Khai, Nakhon Phanom, Mukdahan -> Đến Ubon Ratchathani (Sông Mun).',
    mainDamsOrFeatures: ['Cảng quốc tế Chiang Saen', 'Hệ thống sông Mun - Chi (vùng Isan)', 'Cầu Hữu Nghị 1, 2, 3, 4 bắc qua Lào'],
    hydrologyRoleVi: 'Vùng đông bắc Thái Lan (Isan) có nhu cầu sử dụng nước tưới nông nghiệp rất lớn. Thái Lan là quốc gia sáng lập MRC, tích cực triển khai dự án trữ nước thông minh.',
    hydrologyRoleEn: 'Extensive agricultural water demands across Khorat/Isan plateau; founding member of the MRC with extensive irrigation schemes.'
  },
  {
    index: 5,
    id: 'cambodia',
    nameVi: 'Campuchia (Mê Kông & Tonle Sap)',
    nameEn: 'Cambodia',
    flag: '🇰🇭',
    capital: 'Phnôm Pênh (Phnom Penh)',
    lengthKm: 480,
    shareBasinArea: '20%',
    shareFlow: '18%',
    centerLat: 12.8,
    centerLon: 105.2,
    zoom: 3.0,
    color: '#f97316',
    entryExitPointsVi: 'Nhận nước sau thác Khone -> Hợp lưu sông 3S tại Stung Treng -> Qua trạm Kratie -> Ngã tư Chaktomuk -> Chảy vào Việt Nam.',
    mainDamsOrFeatures: ['Biển Hồ Tonle Sap ("Trái tim điều tiết nước")', 'Trạm Kratie', 'Ngã tư Chaktomuk', 'Cầu Tsubasa (Neak Loeung)'],
    hydrologyRoleVi: 'Sở hữu "trái tim điều tiết thủy văn" Biển Hồ Tonle Sap với hiện tượng đảo dòng độc nhất vô nhị trên thế giới (hút lũ mùa mưa và xả nước mùa cạn cho ĐBSCL).',
    hydrologyRoleEn: 'Home to the Tonle Sap Lake & reverse-flow pulsing system, the biological and hydrological regulator of the Lower Mekong.'
  },
  {
    index: 6,
    id: 'vietnam',
    nameVi: 'Việt Nam (Đồng Bằng Sông Cửu Long)',
    nameEn: 'Vietnam (Mekong Delta)',
    flag: '🇻🇳',
    capital: 'Hà Nội (Khu vực sông: ĐBSCL)',
    lengthKm: 220,
    shareBasinArea: '8%',
    shareFlow: '11% (hứng trọn nguồn nước từ thượng nguồn)',
    centerLat: 10.2,
    centerLon: 105.8,
    zoom: 3.4,
    color: '#10b981',
    entryExitPointsVi: 'Chảy vào tại Vĩnh Xương (An Giang) & Thường Phước (Đồng Tháp) -> Tách thành Sông Tiền & Sông Hậu -> 9 nhánh Cửu Long đổ ra Biển Đông.',
    mainDamsOrFeatures: [
      'Trạm Tân Châu & Châu Đốc',
      'Đồng Tháp Mười & Tứ Giác Long Xuyên',
      'Kênh xáng Xà No (Hậu Giang)',
      'Hệ thống cống Cái Lớn - Cái Bé',
      '9 Cửa sông Cửu Long'
    ],
    hydrologyRoleVi: 'Vùng hạ lưu tiếp nhận 475 tỉ m³ nước mỗi năm, vựa lúa gạo thủy sản bảo đảm an ninh lương thực quốc gia; thực thi Nghị quyết 120/NQ-CP thích ứng "Thuận thiên".',
    hydrologyRoleEn: 'Downstream recipient of 475 billion m³ annual discharge; food basket supporting 17.5 million people; pioneering Nature-based Adaptations (Resolution 120).'
  }
];

// Key Hydrological Stations along the Mekong Basin (Mạng lưới 25 Trạm Thủy văn Quốc tế MRC & ĐBSCL)
export const HYDROLOGICAL_STATIONS: HydrologicalStation[] = [
  {
    id: 'sta-tibet-zaduo',
    name: 'Trạm Zaduo (Tây Tạng - Tam Giang Nguyên)',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    lat: 32.89,
    lon: 95.30,
    riverKm: 450,
    elevationM: 4200,
    role: 'Nguồn băng tan Tam Giang Nguyên (Thanh Hải)',
    waterLevel: {
      normal: 4202.1,
      flood: 4204.8,
      dry: 4200.8,
      alarm1: 4204.0,
      alarm2: 4205.5,
      alarm3: 4207.0
    },
    discharge: {
      normal: 320,
      flood: 1850,
      dry: 95,
      historicalMax: 2900
    },
    mrcStationCode: 'TIB-ZD-00',
    highlightsVi: 'Điểm khởi đầu của sông băng Tanggula, nơi giọt nước Mê Kông tinh khiết đầu tiên tan chảy.',
    highlightsEn: 'Glacial origin in Sanjiangyuan, Tibetan Plateau, monitoring initial snowmelt discharge.'
  },
  {
    id: 'sta-qamdo',
    name: 'Trạm Xương Đô (Qamdo / Changdu)',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    lat: 31.14,
    lon: 97.17,
    riverKm: 980,
    elevationM: 3200,
    role: 'Hợp lưu Za Qu & Ngom Qu (Đông Tây Tạng)',
    waterLevel: {
      normal: 3203.5,
      flood: 3207.2,
      dry: 3201.8,
      alarm1: 3206.5,
      alarm2: 3208.0,
      alarm3: 3210.0
    },
    discharge: {
      normal: 680,
      flood: 3400,
      dry: 220,
      historicalMax: 5100
    },
    mrcStationCode: 'LAN-QD-01',
    highlightsVi: 'Hợp lưu hai nhánh Za Qu và Ngom Qu chính thức mang tên Lan Thương Giang ở độ cao 3.200m.',
    highlightsEn: 'Confluence of Za Qu and Ngom Qu officially forming the Lancang River at 3,200m elevation.'
  },
  {
    id: 'sta-xiaowan',
    name: 'Trạm Đập Tiểu Loan (Xiaowan Dam)',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    lat: 24.70,
    lon: 100.08,
    riverKm: 1780,
    elevationM: 1240,
    role: 'Đập vòm cao nhất thượng nguồn (292m)',
    waterLevel: {
      normal: 1238.0,
      flood: 1242.5,
      dry: 1232.0,
      alarm1: 1241.0,
      alarm2: 1243.5,
      alarm3: 1245.0
    },
    discharge: {
      normal: 1450,
      flood: 5800,
      dry: 650,
      historicalMax: 9800
    },
    mrcStationCode: 'LAN-XW-02',
    highlightsVi: 'Hồ chứa 15 tỉ m³ điều tiết dòng chảy và giữ lại lượng phù sa cát thô rất lớn cho toàn lưu vực.',
    highlightsEn: 'Massive 15-billion m³ reservoir regulating dry-season flow and trapping upstream coarse sediments.'
  },
  {
    id: 'sta-jinghong',
    name: 'Trạm Cảnh Hồng (Jinghong)',
    country: 'Trung Quốc',
    flag: '🇨🇳',
    lat: 22.02,
    lon: 100.80,
    riverKm: 2140,
    elevationM: 535,
    role: 'Cửa ngõ hạ lưu chuỗi đập Vân Nam',
    waterLevel: {
      normal: 535.2,
      flood: 539.8,
      dry: 532.1,
      alarm1: 538.5,
      alarm2: 540.0,
      alarm3: 542.5
    },
    discharge: {
      normal: 1850,
      flood: 7200,
      dry: 850,
      historicalMax: 12500
    },
    mrcStationCode: 'MRC-JH-01',
    highlightsVi: 'Giám sát lưu lượng xả từ 11 đập bậc thang Vân Nam trước khi vào hạ lưu Mê Kông.',
    highlightsEn: 'Monitors discharge outflow from Yunnan cascade reservoirs into the Lower Mekong.'
  },
  {
    id: 'sta-golden-triangle',
    name: 'Trạm Tam Giác Vàng (Sông Ruak)',
    country: 'Thái Lan / Lào / Myanmar',
    flag: '🇱🇦🇹🇭🇲🇲',
    lat: 20.35,
    lon: 100.08,
    riverKm: 2340,
    elevationM: 360,
    role: 'Ngã ba biên giới 3 nước Đông Nam Á',
    waterLevel: {
      normal: 3.80,
      flood: 10.20,
      dry: 1.95,
      alarm1: 11.0,
      alarm2: 12.2,
      alarm3: 13.0
    },
    discharge: {
      normal: 2450,
      flood: 10400,
      dry: 980,
      historicalMax: 15200
    },
    mrcStationCode: 'MRC-GT-01B',
    highlightsVi: 'Nơi sông Mê Kông trở thành đường biên giới quốc tế tự nhiên giữa Lào, Thái Lan và Myanmar.',
    highlightsEn: 'Confluence with Ruak River forming the tri-border boundary between Thailand, Laos, and Myanmar.'
  },
  {
    id: 'sta-chiang-saen',
    name: 'Trạm Chiang Saen (Tam Giác Vàng)',
    country: 'Thái Lan',
    flag: '🇹🇭',
    lat: 20.27,
    lon: 100.09,
    riverKm: 2360,
    elevationM: 358,
    role: 'Trạm kiểm soát cửa ngõ Tam Giác Vàng',
    waterLevel: {
      normal: 3.45,
      flood: 9.80,
      dry: 1.85,
      alarm1: 11.5,
      alarm2: 12.8,
      alarm3: 13.5
    },
    discharge: {
      normal: 2750,
      flood: 11200,
      dry: 1100,
      historicalMax: 16500
    },
    mrcStationCode: 'MRC-CS-02',
    highlightsVi: 'Điểm đo đạc đầu tiên của Ủy hội sông Mê Kông quốc tế (MRC) trên dòng chính hạ lưu.',
    highlightsEn: 'First official mainstream MRC monitoring gauge in the Lower Mekong River Basin.'
  },
  {
    id: 'sta-chiang-khong',
    name: 'Trạm Chiang Khong / Huay Xai',
    country: 'Thái Lan / Lào',
    flag: '🇹🇭🇱🇦',
    lat: 20.26,
    lon: 100.41,
    riverKm: 2420,
    elevationM: 350,
    role: 'Cửa khẩu Cầu Hữu Nghị 4 (Hành lang R3A)',
    waterLevel: {
      normal: 4.10,
      flood: 11.50,
      dry: 2.20,
      alarm1: 12.5,
      alarm2: 13.8,
      alarm3: 14.5
    },
    discharge: {
      normal: 3100,
      flood: 12800,
      dry: 1250,
      historicalMax: 18200
    },
    mrcStationCode: 'MRC-CK-02B',
    highlightsVi: 'Kết nối đường thủy và cầu đường bộ xuyên Á Cầu Hữu Nghị 4 giữa tỉnh Chiang Rai và Bokeo.',
    highlightsEn: 'Key cross-border monitoring point at Friendship Bridge 4 on the Kunming-Bangkok R3A Highway.'
  },
  {
    id: 'sta-luang-prabang',
    name: 'Trạm Luang Prabang',
    country: 'Lào',
    flag: '🇱🇦',
    lat: 19.89,
    lon: 102.13,
    riverKm: 2680,
    elevationM: 285,
    role: 'Trạm đo Bắc Lào & Di sản thế giới',
    waterLevel: {
      normal: 7.60,
      flood: 15.40,
      dry: 4.20,
      alarm1: 17.5,
      alarm2: 18.0,
      alarm3: 19.0
    },
    discharge: {
      normal: 3950,
      flood: 15800,
      dry: 1450,
      historicalMax: 25200
    },
    mrcStationCode: 'MRC-LP-03',
    highlightsVi: 'Theo dõi mực nước thượng nguồn đập Xayaburi và hợp lưu dòng sông Nam Khan.',
    highlightsEn: 'Monitors water levels upstream of Xayaburi Dam and Nam Khan confluence.'
  },
  {
    id: 'sta-vientiane',
    name: 'Trạm Viêng Chăn (Km 4)',
    country: 'Lào',
    flag: '🇱🇦',
    lat: 17.96,
    lon: 102.60,
    riverKm: 3120,
    elevationM: 168,
    role: 'Trạm thủ đô Viêng Chăn - Nong Khai',
    waterLevel: {
      normal: 4.80,
      flood: 11.20,
      dry: 2.10,
      alarm1: 11.5,
      alarm2: 12.5,
      alarm3: 13.0
    },
    discharge: {
      normal: 5120,
      flood: 19800,
      dry: 1650,
      historicalMax: 26000
    },
    mrcStationCode: 'MRC-VT-04',
    highlightsVi: 'Điểm kiểm soát an toàn lũ cho Thủ đô Viêng Chăn và tỉnh Nong Khai (Thái Lan).',
    highlightsEn: 'Key flood warning station protecting Vientiane capital and Nong Khai province.'
  },
  {
    id: 'sta-nong-khai',
    name: 'Trạm Nong Khai (Cầu Hữu Nghị 1)',
    country: 'Thái Lan',
    flag: '🇹🇭',
    lat: 17.88,
    lon: 102.74,
    riverKm: 3140,
    elevationM: 165,
    role: 'Trạm bờ nam Thái Lan đối diện Viêng Chăn',
    waterLevel: {
      normal: 4.95,
      flood: 11.45,
      dry: 2.25,
      alarm1: 11.8,
      alarm2: 12.6,
      alarm3: 13.2
    },
    discharge: {
      normal: 5250,
      flood: 20200,
      dry: 1700,
      historicalMax: 26500
    },
    mrcStationCode: 'MRC-NK-04B',
    highlightsVi: 'Vị trí Cầu Hữu Nghị 1 lịch sử (khánh thành 1994), cầu quốc tế đầu tiên bắc qua dòng chính hạ lưu Mê Kông.',
    highlightsEn: 'Site of historic Thai-Lao Friendship Bridge 1 (1994), the first bridge across the Lower Mekong mainstream.'
  },
  {
    id: 'sta-nakhon-phanom',
    name: 'Trạm Nakhon Phanom & Thakhek',
    country: 'Thái Lan / Lào',
    flag: '🇹🇭🇱🇦',
    lat: 17.40,
    lon: 104.80,
    riverKm: 3430,
    elevationM: 140,
    role: 'Hợp lưu Sông Nam Theun & Cầu Hữu Nghị 3',
    waterLevel: {
      normal: 5.20,
      flood: 12.10,
      dry: 2.05,
      alarm1: 11.5,
      alarm2: 12.5,
      alarm3: 13.5
    },
    discharge: {
      normal: 6400,
      flood: 23500,
      dry: 1950,
      historicalMax: 32000
    },
    mrcStationCode: 'MRC-NP-04C',
    highlightsVi: 'Tiếp nhận lưu lượng lớn từ vùng núi đá vôi Trung Lào và các nhà máy thủy điện lưu vực Nam Theun - Hinboun.',
    highlightsEn: 'Gauges substantial inflows from Central Laos karst catchments and Nam Theun hydropower cascade.'
  },
  {
    id: 'sta-mukdahan',
    name: 'Trạm Mukdahan & Savannakhet',
    country: 'Thái Lan / Lào',
    flag: '🇹🇭🇱🇦',
    lat: 16.55,
    lon: 104.75,
    riverKm: 3580,
    elevationM: 130,
    role: 'Hành lang Kinh tế Đông - Tây (EWEC)',
    waterLevel: {
      normal: 5.40,
      flood: 12.40,
      dry: 1.90,
      alarm1: 12.0,
      alarm2: 12.8,
      alarm3: 13.5
    },
    discharge: {
      normal: 7100,
      flood: 25800,
      dry: 2100,
      historicalMax: 36000
    },
    mrcStationCode: 'MRC-MK-04D',
    highlightsVi: 'Cầu Hữu Nghị 2 trên tuyến Hành lang Kinh tế Đông - Tây nối Myanmar - Thái Lan - Lào - Việt Nam (cảng Đà Nẵng).',
    highlightsEn: 'Friendship Bridge 2 hub on the East-West Economic Corridor connecting to Da Nang seaport in Vietnam.'
  },
  {
    id: 'sta-pakse',
    name: 'Trạm Pakse (Hạ Lào)',
    country: 'Lào',
    flag: '🇱🇦',
    lat: 15.12,
    lon: 105.78,
    riverKm: 3740,
    elevationM: 92,
    role: 'Trạm hợp lưu Nam Lào & Sông Mun',
    waterLevel: {
      normal: 5.60,
      flood: 11.80,
      dry: 1.95,
      alarm1: 11.0,
      alarm2: 12.0,
      alarm3: 13.0
    },
    discharge: {
      normal: 7850,
      flood: 28500,
      dry: 2200,
      historicalMax: 41000
    },
    mrcStationCode: 'MRC-PK-05',
    highlightsVi: 'Hội tụ dòng chảy từ cao nguyên Khorat (Sông Mun) và cao nguyên Bolaven.',
    highlightsEn: 'Captures integrated flows from the Khorat Mun River basin and Bolaven Plateau.'
  },
  {
    id: 'sta-khone-falls',
    name: 'Trạm Thác Khone (Si Phan Don / Don Sahong)',
    country: 'Lào / Campuchia',
    flag: '🇱🇦🇰🇭',
    lat: 13.95,
    lon: 105.95,
    riverKm: 3950,
    elevationM: 65,
    role: 'Thác nước lớn nhất ĐNA & 4.000 đảo',
    waterLevel: {
      normal: 6.20,
      flood: 13.50,
      dry: 2.40,
      alarm1: 12.8,
      alarm2: 13.8,
      alarm3: 14.8
    },
    discharge: {
      normal: 9800,
      flood: 32000,
      dry: 2350,
      historicalMax: 46000
    },
    mrcStationCode: 'MRC-KF-05B',
    highlightsVi: 'Ghềnh thác xả nước hùng vĩ nhất Đông Nam Á, sinh cảnh cư trú của loài cá heo nước ngọt Irrawaddy quý hiếm.',
    highlightsEn: 'Widest and most voluminous waterfall complex in SE Asia; habitat for critically endangered Irrawaddy dolphins.'
  },
  {
    id: 'sta-stung-treng',
    name: 'Trạm Stung Treng (Hợp Lưu Sông 3S)',
    country: 'Campuchia',
    flag: '🇰🇭',
    lat: 13.52,
    lon: 105.97,
    riverKm: 4050,
    elevationM: 45,
    role: 'Hợp lưu chiến lược hệ thống sông 3S',
    waterLevel: {
      normal: 7.80,
      flood: 14.20,
      dry: 3.10,
      alarm1: 10.7,
      alarm2: 11.5,
      alarm3: 12.0
    },
    discharge: {
      normal: 12200,
      flood: 34500,
      dry: 2380,
      historicalMax: 58000
    },
    mrcStationCode: 'MRC-ST-05C',
    highlightsVi: 'Tiếp nhận hệ thống sông 3S (Se San - Srepok - Se Kong từ Tây Nguyên Việt Nam & Nam Lào) cung cấp tới 20% lưu lượng Mê Kông.',
    highlightsEn: 'Strategic confluence of 3S river system (Se San, Srepok, Se Kong) contributing ~20% of total Mekong flow.'
  },
  {
    id: 'sta-kratie',
    name: 'Trạm Kratie',
    country: 'Campuchia',
    flag: '🇰🇭',
    lat: 12.49,
    lon: 106.02,
    riverKm: 4230,
    elevationM: 22,
    role: 'Trạm then chốt cửa ngõ châu thổ',
    waterLevel: {
      normal: 13.80,
      flood: 21.50,
      dry: 6.50,
      alarm1: 20.8,
      alarm2: 22.0,
      alarm3: 23.0
    },
    discharge: {
      normal: 14800,
      flood: 38200,
      dry: 2450,
      historicalMax: 66700
    },
    mrcStationCode: 'MRC-KT-06',
    highlightsVi: 'Trạm quan trắc quan trọng nhất của MRC, quyết định lượng nước vào Biển Hồ và ĐBSCL.',
    highlightsEn: 'The single most critical hydrological station defining inflow into Tonle Sap and Vietnam Delta.'
  },
  {
    id: 'sta-kampong-cham',
    name: 'Trạm Kampong Cham (Cầu Kizuna)',
    country: 'Campuchia',
    flag: '🇰🇭',
    lat: 11.99,
    lon: 105.46,
    riverKm: 4350,
    elevationM: 18,
    role: 'Vùng châu thổ ngập lũ trên của Campuchia',
    waterLevel: {
      normal: 8.90,
      flood: 15.20,
      dry: 3.40,
      alarm1: 15.0,
      alarm2: 15.8,
      alarm3: 16.5
    },
    discharge: {
      normal: 15500,
      flood: 37100,
      dry: 2800,
      historicalMax: 54000
    },
    mrcStationCode: 'MRC-KC-06B',
    highlightsVi: 'Cầu Kizuna (khánh thành 2001 do Nhật Bản viện trợ), nối hai bờ đông tây Campuchia qua dòng chính Mê Kông.',
    highlightsEn: 'Gauging floodplain overflows upstream of Phnom Penh; site of Kizuna Bridge (2001).'
  },
  {
    id: 'sta-phnom-penh',
    name: 'Trạm Phnom Penh (Chaktomuk)',
    country: 'Campuchia',
    flag: '🇰🇭',
    lat: 11.56,
    lon: 104.93,
    riverKm: 4450,
    elevationM: 10,
    role: 'Ngã tư sông điều tiết Biển Hồ',
    waterLevel: {
      normal: 5.80,
      flood: 10.40,
      dry: 2.10,
      alarm1: 9.2,
      alarm2: 10.5,
      alarm3: 11.2
    },
    discharge: {
      normal: 16500,
      flood: 36000,
      dry: 3200,
      historicalMax: 48000
    },
    mrcStationCode: 'MRC-PP-07',
    highlightsVi: 'Nơi diễn ra cơ chế đảo dòng Tonle Sap: mùa lũ nước chảy ngược vào hồ, mùa khô xả ra sông.',
    highlightsEn: 'Epicenter of Tonle Sap reverse pulsation: stores floodwaters in wet season, releases in dry season.'
  },
  {
    id: 'sta-tan-chau',
    name: 'Trạm Tân Châu (Sông Tiền)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 10.78,
    lon: 105.24,
    riverKm: 4620,
    elevationM: 3.5,
    role: 'Cửa ngõ lũ chính ĐBSCL (Sông Tiền)',
    waterLevel: {
      normal: 2.35,
      flood: 4.45,
      dry: 0.85,
      alarm1: 3.5,
      alarm2: 4.0,
      alarm3: 4.5
    },
    discharge: {
      normal: 12400,
      flood: 25500,
      dry: 2800,
      historicalMax: 32000
    },
    mrcStationCode: 'MRC-TC-08',
    highlightsVi: 'Nhận khoảng 80% tổng lưu lượng nước sông Mê Kông chảy vào lãnh thổ Việt Nam.',
    highlightsEn: 'Receives approximately 80% of total Mekong river discharge entering Vietnam.'
  },
  {
    id: 'sta-chau-doc',
    name: 'Trạm Châu Đốc (Sông Hậu)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 10.70,
    lon: 105.12,
    riverKm: 4630,
    elevationM: 3.0,
    role: 'Cửa ngõ Sông Hậu & Tứ Giác Long Xuyên',
    waterLevel: {
      normal: 2.10,
      flood: 4.10,
      dry: 0.65,
      alarm1: 3.0,
      alarm2: 3.5,
      alarm3: 4.0
    },
    discharge: {
      normal: 4800,
      flood: 9800,
      dry: 1100,
      historicalMax: 12500
    },
    mrcStationCode: 'MRC-CD-09',
    highlightsVi: 'Kiểm soát dòng lũ tràn bờ vào vùng ngập sâu Tứ Giác Long Xuyên và các kênh thoát lũ ra Biển Tây.',
    highlightsEn: 'Controls flood flows into the Long Xuyen Quadrangle and flood relief canals to the West Sea.'
  },
  {
    id: 'sta-my-thuan',
    name: 'Trạm Mỹ Thuận (Sông Tiền)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 10.28,
    lon: 105.91,
    riverKm: 4680,
    elevationM: 2.2,
    role: 'Trạm trung tâm châu thổ & Cầu Mỹ Thuận',
    waterLevel: {
      normal: 1.80,
      flood: 2.15,
      dry: 0.45,
      alarm1: 1.8,
      alarm2: 2.0,
      alarm3: 2.15
    },
    discharge: {
      normal: 10500,
      flood: 19800,
      dry: 2200,
      historicalMax: 24500
    },
    mrcStationCode: 'MRC-MT-09B',
    highlightsVi: 'Trạm đo mặn và triều trung tâm Sông Tiền giữa Tiền Giang và Vĩnh Long, theo dõi ranh mặn 4g/lít.',
    highlightsEn: 'Central Tien River monitoring station measuring tidal surges and 4g/L salinity intrusion front.'
  },
  {
    id: 'sta-can-tho',
    name: 'Trạm Cần Thơ & Hậu Giang',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 10.04,
    lon: 105.78,
    riverKm: 4710,
    elevationM: 1.8,
    role: 'Trung tâm kinh tế - thủy văn ĐBSCL',
    waterLevel: {
      normal: 1.65,
      flood: 2.25,
      dry: 0.35,
      alarm1: 1.8,
      alarm2: 2.0,
      alarm3: 2.2
    },
    discharge: {
      normal: 8200,
      flood: 16800,
      dry: 1900,
      historicalMax: 21500
    },
    mrcStationCode: 'MRC-CT-10',
    highlightsVi: 'Trung tâm kinh tế ĐBSCL, chịu tác động mạnh của bán nhật triều Biển Đông và triều cường.',
    highlightsEn: 'Heart of the Mekong Delta, strongly influenced by semi-diurnal East Sea tides and extreme surges.'
  },
  {
    id: 'sta-vi-thanh',
    name: 'Trạm Vị Thanh (Kênh Xáng Xà No - Hậu Giang)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 9.78,
    lon: 105.47,
    riverKm: 4735,
    elevationM: 1.2,
    role: 'Kênh Xáng Xà No - "Con đường lúa gạo" Hậu Giang',
    waterLevel: {
      normal: 1.15,
      flood: 1.65,
      dry: 0.20,
      alarm1: 1.3,
      alarm2: 1.5,
      alarm3: 1.65
    },
    discharge: {
      normal: 2400,
      flood: 4600,
      dry: 480,
      historicalMax: 6200
    },
    mrcStationCode: 'VNM-VT-11',
    highlightsVi: 'Quan trắc độ mặn nội đồng tỉnh Hậu Giang bên dòng Kênh xáng Xà No lịch sử.',
    highlightsEn: 'Monitors inland salinity & tides along historic Xa No Canal in Hau Giang.'
  },
  {
    id: 'sta-dai-ngai',
    name: 'Trạm Đại Ngãi & Trần Đề (Cửa Sông Hậu)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 9.60,
    lon: 106.28,
    riverKm: 4763,
    elevationM: 0.5,
    role: 'Cửa ngõ Sông Hậu đổ ra Biển Đông',
    waterLevel: {
      normal: 1.75,
      flood: 2.10,
      dry: 0.15,
      alarm1: 1.8,
      alarm2: 2.0,
      alarm3: 2.15
    },
    discharge: {
      normal: 6500,
      flood: 14200,
      dry: 950,
      historicalMax: 18500
    },
    mrcStationCode: 'MRC-DN-12',
    highlightsVi: 'Trạm kiểm soát xâm nhập mặn cửa biển lớn nhất Sông Hậu qua cửa Định An và Trần Đề (Sóc Trăng).',
    highlightsEn: 'Monitors oceanic salinity intrusion through Dinh An & Tran De estuaries into the Hau River.'
  },
  {
    id: 'sta-cua-tieu',
    name: 'Trạm Mỹ Tho & Cửa Tiểu (Sông Tiền)',
    country: 'Việt Nam',
    flag: '🇻🇳',
    lat: 10.27,
    lon: 106.75,
    riverKm: 4760,
    elevationM: 0.5,
    role: 'Cửa sông Tiền & Vùng cây ăn trái Gò Công',
    waterLevel: {
      normal: 1.70,
      flood: 2.05,
      dry: 0.10,
      alarm1: 1.7,
      alarm2: 1.9,
      alarm3: 2.1
    },
    discharge: {
      normal: 7200,
      flood: 15500,
      dry: 1100,
      historicalMax: 19800
    },
    mrcStationCode: 'MRC-CT-13',
    highlightsVi: 'Kiểm soát mặn ngọt cho hàng trăm ngàn ha vườn cây ăn trái Tiền Giang và Bến Tre.',
    highlightsEn: 'Monitors Cua Tieu & Cua Dai estuaries safeguarding fruit orchards of Tien Giang and Ben Tre.'
  }
];

// Transport, Waterways, Bridges & Ports along the Mekong Basin
export const TRANSPORT_FEATURES: TransportRoute[] = [
  {
    id: 'port-jinghong',
    name: 'Cảng Cảnh Hồng (Jinghong Port)',
    nameEn: 'Jinghong River Port',
    type: 'port',
    lat: 22.01,
    lon: 100.79,
    country: 'Trung Quốc',
    descriptionVi: 'Cảng nước ngọt quốc tế trên sông Lan Thương, đón tàu hàng đến 500 tấn chạy sang Lào và Thái Lan.',
    descriptionEn: 'International freshwater port on Lancang River accommodating up to 500-ton cargo vessels.'
  },
  {
    id: 'port-chiang-saen',
    name: 'Cảng Quốc Tế Chiang Saen',
    nameEn: 'Chiang Saen Commercial Port',
    type: 'port',
    lat: 20.25,
    lon: 100.12,
    country: 'Thái Lan',
    descriptionVi: 'Cảng trung chuyển hàng hóa nhộn nhịp nhất của Thái Lan trên dòng Mê Kông nối liền với Trung Quốc.',
    descriptionEn: 'Major Thai trading port connecting Yunnan China with northern ASEAN inland waterways.'
  },
  {
    id: 'bridge-friendship-4',
    name: 'Cầu Hữu Nghị 4 (Huay Xai - Chiang Khong)',
    nameEn: '4th Thai-Lao Friendship Bridge',
    type: 'bridge',
    lat: 20.26,
    lon: 100.41,
    country: 'Thái Lan / Lào',
    capacityOrYear: 'Dài 480m (Khánh thành 2013)',
    descriptionVi: 'Kết nối tuyến Hành lang kinh tế Bắc - Nam (Hành lang R3A) từ Côn Minh qua Lào sang Bangkok.',
    descriptionEn: 'Bridges the North-South Economic Corridor (R3A Highway) from Kunming to Bangkok.'
  },
  {
    id: 'bridge-friendship-1',
    name: 'Cầu Hữu Nghị 1 (Viêng Chăn - Nong Khai)',
    nameEn: '1st Thai-Lao Friendship Bridge',
    type: 'bridge',
    lat: 17.88,
    lon: 102.71,
    country: 'Lào / Thái Lan',
    capacityOrYear: 'Dài 1.170m (Năm 1994)',
    descriptionVi: 'Cây cầu đầu tiên bắc qua dòng chính sông Mê Kông, tích hợp cả đường bộ và tuyến đường sắt quốc tế.',
    descriptionEn: 'The historic first bridge across the Mekong mainstream, combining road and railway tracks.'
  },
  {
    id: 'bridge-friendship-2',
    name: 'Cầu Hữu Nghị 2 (Savannakhet - Mukdahan)',
    nameEn: '2nd Thai-Lao Friendship Bridge',
    type: 'bridge',
    lat: 16.60,
    lon: 104.74,
    country: 'Lào / Thái Lan',
    capacityOrYear: 'Dài 1.600m (Năm 2006)',
    descriptionVi: 'Mắc nối Hành lang Kinh tế Đông - Tây (EWEC) từ Myanmar qua Thái Lan, Lào đến Cảng Đà Nẵng (Việt Nam).',
    descriptionEn: 'Key link of the East-West Economic Corridor (EWEC) connecting Myanmar, Thailand, Laos to Da Nang Port.'
  },
  {
    id: 'port-phnom-penh',
    name: 'Cảng Quốc Tế Phnôm Pênh (LM17)',
    nameEn: 'Phnom Penh Autonomous Port',
    type: 'port',
    lat: 11.58,
    lon: 104.94,
    country: 'Campuchia',
    descriptionVi: 'Cảng container nước sâu trên sông Mê Kông, kết nối sà lan trực tiếp về các cảng biển lớn của Việt Nam.',
    descriptionEn: 'Deep-river container terminal connected by daily barges to Vietnam deep-sea ports.'
  },
  {
    id: 'bridge-tsubasa',
    name: 'Cầu Tsubasa (Neak Loeung)',
    nameEn: 'Tsubasa Bridge (Neak Loeung)',
    type: 'bridge',
    lat: 11.25,
    lon: 105.28,
    country: 'Campuchia',
    capacityOrYear: 'Dài 2.215m (Năm 2015)',
    descriptionVi: 'Cầu dây văng dài nhất Campuchia bắc qua sông Mê Kông trên Quốc lộ 1 nối Phnom Penh đến Cửa khẩu Mộc Bài.',
    descriptionEn: 'Longest cable-stayed bridge in Cambodia along Asian Highway 1 towards Vietnam.'
  },
  {
    id: 'port-can-tho',
    name: 'Cụm Cảng Cần Thơ & Cái Cui',
    nameEn: 'Can Tho & Cai Cui River-Sea Port',
    type: 'port',
    lat: 10.02,
    lon: 105.80,
    country: 'Việt Nam',
    descriptionVi: 'Đầu mối hàng hải và logistics trung tâm vùng ĐBSCL trên Sông Hậu, đón tàu biển trọng tải đến 20.000 DWT.',
    descriptionEn: 'Main international maritime & river gateway of the Mekong Delta accommodating up to 20,000 DWT ships.'
  },
  {
    id: 'bridge-my-thuan',
    name: 'Cầu Mỹ Thuận 1 & Mỹ Thuận 2',
    nameEn: 'My Thuan Bridges 1 & 2',
    type: 'bridge',
    lat: 10.28,
    lon: 105.91,
    country: 'Việt Nam',
    capacityOrYear: 'Cầu dây văng hiện đại trên Sông Tiền',
    descriptionVi: 'Huyết mạch kết nối cao tốc Bắc - Nam nhánh Đông từ TP.HCM về Cần Thơ vượt qua Sông Tiền.',
    descriptionEn: 'Iconic cable-stayed expressway bridges crossing the Tien River towards Can Tho.'
  },
  {
    id: 'bridge-can-tho',
    name: 'Cầu Cần Thơ & Cầu Vàm Cống',
    nameEn: 'Can Tho & Vam Cong Bridges',
    type: 'bridge',
    lat: 10.03,
    lon: 105.81,
    country: 'Việt Nam',
    capacityOrYear: 'Nhịp chính 550m (Cầu Cần Thơ)',
    descriptionVi: 'Hai cây cầu dây văng kỳ vĩ vượt Sông Hậu nối thông toàn tuyến giao thông thông suốt vùng đồng bằng.',
    descriptionEn: 'Magnificent cable-stayed structures crossing the Hau River to link Hau Giang and Ca Mau Peninsula.'
  }
];

// Major Asian Highway network segments intersecting the Mekong
export const ASIAN_HIGHWAYS: Array<{ name: string; nameEn: string; path: GlobeGeoPoint[] }> = [
  {
    name: 'Đường Xuyên Á AH1 (Bangkok - Phnom Penh - TP.HCM)',
    nameEn: 'Asian Highway AH1',
    path: [
      { lat: 13.75, lon: 100.50 }, // Bangkok
      { lat: 13.65, lon: 102.55 }, // Aranyaprathet
      { lat: 13.58, lon: 102.97 }, // Poipet
      { lat: 11.56, lon: 104.93 }, // Phnom Penh
      { lat: 11.25, lon: 105.28 }, // Neak Loeung Bridge
      { lat: 11.08, lon: 106.18 }, // Moc Bai
      { lat: 10.78, lon: 106.70 }  // Ho Chi Minh City
    ]
  },
  {
    name: 'Tuyến Bắc - Nam AH3 (Côn Minh - Viêng Chăn - Bangkok)',
    nameEn: 'Asian Highway AH3',
    path: [
      { lat: 25.04, lon: 102.71 }, // Kunming
      { lat: 22.02, lon: 100.80 }, // Jinghong
      { lat: 20.26, lon: 100.41 }, // Huay Xai - Chiang Khong
      { lat: 18.78, lon: 98.98 },  // Chiang Mai
      { lat: 13.75, lon: 100.50 }  // Bangkok
    ]
  }
];

// Approximate world continent coastlines and landmass polygons for the 3D globe
// (Normalized sample points for rendering continents when rotated)
export const CONTINENT_OUTLINES: Array<{ name: string; points: GlobeGeoPoint[] }> = [
  {
    name: 'Indochina & East Asia',
    points: [
      { lat: 35.0, lon: 119.0 },
      { lat: 31.2, lon: 121.5 },
      { lat: 26.0, lon: 119.5 },
      { lat: 22.3, lon: 114.2 },
      { lat: 21.5, lon: 108.0 },
      { lat: 20.8, lon: 106.7 }, // Haiphong
      { lat: 16.5, lon: 107.5 }, // Hue
      { lat: 16.0, lon: 108.2 }, // Da Nang
      { lat: 12.2, lon: 109.2 }, // Nha Trang
      { lat: 10.7, lon: 107.0 }, // Vung Tau
      { lat: 9.5, lon: 106.5 },  // Mekong Delta Estuaries
      { lat: 8.6, lon: 104.7 },  // Ca Mau
      { lat: 10.0, lon: 104.0 }, // Kien Giang
      { lat: 11.5, lon: 103.0 }, // Cambodia coast
      { lat: 13.0, lon: 101.0 }, // Gulf of Thailand
      { lat: 13.5, lon: 100.5 }, // Bangkok
      { lat: 9.0, lon: 99.5 },   // Kra Isthmus
      { lat: 5.5, lon: 100.3 },  // Penang
      { lat: 1.3, lon: 103.8 },  // Singapore
      { lat: 4.0, lon: 103.4 },  // Malaysia East Coast
      { lat: 6.0, lon: 102.2 },  // Kelantan
      { lat: 9.0, lon: 98.3 },   // Phuket
      { lat: 16.8, lon: 96.2 },  // Yangon / Irrawaddy
      { lat: 20.0, lon: 93.0 },  // Myanmar Rakhine
      { lat: 22.0, lon: 91.8 },  // Bangladesh
      { lat: 28.0, lon: 88.0 },  // Himalayas
      { lat: 34.0, lon: 80.0 },  // Tibet West
      { lat: 38.0, lon: 95.0 },  // Qilian
      { lat: 40.0, lon: 116.0 }, // Beijing
      { lat: 35.0, lon: 119.0 }
    ]
  },
  {
    name: 'India & South Asia',
    points: [
      { lat: 22.0, lon: 91.8 },
      { lat: 20.0, lon: 86.0 },
      { lat: 13.0, lon: 80.3 },
      { lat: 8.1, lon: 77.5 },  // Kanyakumari
      { lat: 15.0, lon: 73.8 },
      { lat: 19.0, lon: 72.8 }, // Mumbai
      { lat: 24.0, lon: 67.0 },
      { lat: 30.0, lon: 70.0 },
      { lat: 34.0, lon: 74.0 },
      { lat: 28.0, lon: 88.0 },
      { lat: 22.0, lon: 91.8 }
    ]
  },
  {
    name: 'Maritime Southeast Asia',
    points: [
      // Sumatra
      { lat: 5.5, lon: 95.3 },
      { lat: -0.5, lon: 101.4 },
      { lat: -5.9, lon: 105.8 },
      { lat: -3.0, lon: 103.0 },
      { lat: 2.0, lon: 98.0 },
      { lat: 5.5, lon: 95.3 }
    ]
  },
  {
    name: 'Borneo',
    points: [
      { lat: 7.0, lon: 116.8 },
      { lat: 4.5, lon: 118.5 },
      { lat: -1.0, lon: 117.0 },
      { lat: -3.5, lon: 114.5 },
      { lat: -3.0, lon: 110.5 },
      { lat: 1.5, lon: 109.5 },
      { lat: 5.0, lon: 115.0 },
      { lat: 7.0, lon: 116.8 }
    ]
  },
  {
    name: 'Philippines',
    points: [
      { lat: 18.5, lon: 121.5 },
      { lat: 14.5, lon: 121.0 },
      { lat: 12.5, lon: 124.5 },
      { lat: 7.0, lon: 125.5 },
      { lat: 8.0, lon: 122.5 },
      { lat: 11.0, lon: 122.5 },
      { lat: 18.5, lon: 121.5 }
    ]
  },
  {
    name: 'Hainan Island',
    points: [
      { lat: 20.1, lon: 110.3 },
      { lat: 19.5, lon: 111.0 },
      { lat: 18.2, lon: 109.5 },
      { lat: 19.1, lon: 108.6 },
      { lat: 20.1, lon: 110.3 }
    ]
  },
  {
    name: 'Australia',
    points: [
      { lat: -12.0, lon: 131.0 },
      { lat: -11.0, lon: 142.0 },
      { lat: -25.0, lon: 153.0 },
      { lat: -38.0, lon: 145.0 },
      { lat: -35.0, lon: 117.0 },
      { lat: -22.0, lon: 114.0 },
      { lat: -15.0, lon: 124.0 },
      { lat: -12.0, lon: 131.0 }
    ]
  }
];
