import { EducationLevel, Language } from '../types';

export interface LevelAwareAnswer {
  primary: string;
  secondary: string;
  highschool: string;
}

export interface LocalKnowledgeItem {
  keywords: string[];
  answer: {
    vi: LevelAwareAnswer;
    en: LevelAwareAnswer;
  };
}

export interface LocalQuizItem {
  level: EducationLevel;
  question: {
    vi: string;
    en: string;
  };
  options: {
    vi: string[];
    en: string[];
  };
  correctIndex: number;
  explanation: {
    vi: string;
    en: string;
  };
}

export const LEVEL_KNOWLEDGE_RESPONSES: LocalKnowledgeItem[] = [
  {
    keywords: ['chiều dài', 'dài bao nhiêu', 'nguồn', 'bắt nguồn', 'tây tạng', 'tanggula', 'lan thương', 'length', 'origin', 'tibet'],
    answer: {
      vi: {
        primary: `🐜✨ **Chào bạn nhỏ tiểu học đáng yêu! Kiến Sáng kể bạn nghe nhé:**

Sông Mê Kông dài ơi là dài, tận **4 763 km** cơ đấy! Nước sông bắt nguồn từ đỉnh núi tuyết trắng xóa Tanggula ở cao nguyên Tây Tạng cao ngút ngàn.

- 🏔️ Nơi bắt đầu rất lạnh giá, có tuyết phủ quanh năm.
- 🌏 Dòng sông uốn lượn qua **6 nước**: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và chảy về Việt Nam chúng mình!
- 🐉 Về tới miền Tây Nam Bộ, sông chia thành **9 nhánh rồng** ôm ấp ruộng đồng xanh tươi, cây trái ngọt ngào!`,
        secondary: `🐜✨ **Chào bạn học sinh THCS! Kiến Sáng xin chia sẻ thông số địa lí sông Mê Kông:**

Sông Mê Kông là dòng sông huyết mạch quốc tế dài **4 763 km**, xếp thứ **12 thế giới** và thứ **3 châu Á** (sau sông Trường Giang và Hoàng Hà).

- **Khởi nguồn:** Từ độ cao **5 224 m** tại dãy núi tuyết Tanggula (cao nguyên Tây Tạng, Trung Quốc).
- **Tên gọi:** Ở đầu nguồn người Tây Tạng gọi là *Dza-chu*, trên lãnh thổ Trung Quốc gọi là **Lan Thương Giang** (Lancang Jiang) chảy xiết qua các hẻm vực dốc đứng.
- **Hành trình qua 6 quốc gia:** Trung Quốc 🇨🇳 ➔ Myanmar 🇲🇲 ➔ Lào 🇱🇦 ➔ Thái Lan 🇹🇭 ➔ Campuchia 🇰🇭 ➔ hòa vào Việt Nam 🇻🇳 tại vùng châu thổ Cửu Long màu mỡ.`,
        highschool: `🐜✨ **Chào bạn học sinh THPT Lớp 11! Dưới đây là chuẩn kiến thức Chuyên đề Địa lí 11:**

Sông Mê Kông là một trong những hệ thống sông xuyên biên giới vĩ đại nhất hành tinh:
- **Chiều dài & Lưu lượng:** Dài khoảng **4 763 km** (thứ 12 thế giới, thứ 3 châu Á); diện tích lưu vực **810 000 km²**; tổng lượng dòng chảy trung bình đạt **475 tỉ m³/năm** (thứ 8 thế giới).
- **Địa mạo đầu nguồn:** Bắt nguồn từ cao nguyên Tây Tạng ở độ cao **5 224 m** (dãy Tanggula). Thượng lưu mang tên Lan Thương Giang, địa hình phân cắt mạnh, dốc lớn, tiềm năng thủy điện khổng lồ.
- **Phân bố dòng chảy:** Trung Quốc (16% lưu lượng), Myanmar (2%), Lào (35%), Thái Lan (18%), Campuchia (18%), Việt Nam (11%). Do đó, 95% dòng chảy về ĐBSCL phụ thuộc vào nguồn nước ngoại biên.`
      },
      en: {
        primary: `🐜✨ **Hello little explorer! Kien Sang is excited to tell you:**

The Mekong River is super long—about **4,763 km**! It begins high up in the snow-capped Tanggula mountains of the Tibetan Plateau.

- 🏔️ It starts in a cold, snowy land and flows like a giant silver ribbon.
- 🌏 It travels through **6 countries**: China, Myanmar, Laos, Thailand, Cambodia, and Vietnam!
- 🐉 In Vietnam, it turns into **9 Dragon branches**, bringing fresh water to green rice fields and yummy fruit orchards!`,
        secondary: `🐜✨ **Hello secondary school learner! Here are the key geographical facts of the Mekong River:**

The Mekong River is an international waterway stretching **4,763 km**, ranking **12th in the world** and **3rd in Asia** (after the Yangtze and Yellow Rivers).

- **Origin:** Begins at an altitude of **5,224 m** in the Tanggula Mountains on the Tibetan Plateau (China).
- **Upper Course:** Called *Lancang Jiang* in China, flowing through steep, dramatic mountain gorges.
- **6 Basin Nations:** China 🇨🇳 ➔ Myanmar 🇲🇲 ➔ Laos 🇱🇦 ➔ Thailand 🇹🇭 ➔ Cambodia 🇰🇭 ➔ Vietnam 🇻🇳 (emptying into the East Sea).`,
        highschool: `🐜✨ **Greetings Grade 11 student! Here is the academic curriculum synthesis:**

The Mekong River is a strategic transboundary river system:
- **Hydrological Scale:** Total length of **4,763 km**; basin area of **810,000 km²**; mean annual discharge of **475 billion m³/year** (8th globally).
- **Geomorphology & Origin:** Originates at **5,224 m** in the Tanggula Range (Tibetan Plateau). The upper basin (Lancang) features deep gorges and immense hydropower potential.
- **Discharge Distribution:** China (16%), Myanmar (2%), Laos (35%), Thailand (18%), Cambodia (18%), Vietnam (11%). Consequently, 95% of water entering the Mekong Delta originates outside Vietnam's borders.`
      }
    }
  },
  {
    keywords: ['biển hồ', 'tonle sap', 'chảy ngược', 'đảo chiều', 'bể điều hòa', 'reverse flow', 'great lake'],
    answer: {
      vi: {
        primary: `🐜✨ **Hiện tượng kỳ thú nhất đây bạn nhỏ ơi!**

Biển Hồ Tonle Sap ở Campuchia giống như một "chiếc hồ khổng lồ biết thở":
- 🌊 **Mùa mưa lũ:** Nước sông Mê Kông dâng cao, thế là nước **chảy ngược vào hồ**! Hồ to gấp 5 lần, như một bể bơi khổng lồ chứa bớt nước để miền Tây nước mình không bị lụt sâu!
- ☀️ **Mùa nắng khô:** Hồ lại **nhả nước ngọt chảy ra sông**, giúp cây cối tốt tươi và ngăn nước biển mặn tràn vào! Thật kỳ diệu phải không nào?`,
        secondary: `🐜✨ **Cơ chế thủy văn độc nhất vô nhị của Biển Hồ Tonle Sap:**

Biển Hồ nối với sông Mê Kông qua sông Tonle Sap dài khoảng 100 km, với hiện tượng **đảo chiều dòng chảy 2 lần mỗi năm**:
- 🌊 **Mùa lũ (Tháng 6 - Tháng 10):** Mực nước sông Mê Kông cao hơn Biển Hồ, nước tràn ngược vào lòng hồ. Diện tích hồ mở rộng từ 2 500 km² lên đến 16 000 km², dung tích trữ tới 80 tỉ m³ nước.
- ☀️ **Mùa khô (Tháng 11 - Tháng 5):** Khi nước sông chính rút, Biển Hồ xả ngược nước ra Mê Kông, tiếp tế nước ngọt đẩy lùi ranh mặn cho ĐBSCL. Biển Hồ chính là "lá chắn thủy văn tự nhiên" bảo vệ hạ du.`,
        highschool: `🐜✨ **Phân tích cơ chế thủy lực và vai trò điều tiết của Tonle Sap (Chuyên đề 11):**

Biển Hồ Tonle Sap hoạt động như một hồ điều hòa tự nhiên mang tính sống còn đối với thủy chế hạ lưu:
1. **Pha nạp lũ (Tháng 6 - 10):** Chênh lệch cột nước thủy lực khiến dòng sông Tonle Sap chảy ngược (backflow) vào hồ, giữ lại khoảng 20% tổng lượng lũ Mê Kông, làm giảm đỉnh lũ và thời gian ngập lụt tại ĐBSCL.
2. **Pha xả kiệt (Tháng 11 - 5):** Hồ bổ sung từ 50% đến 70% lưu lượng dòng chảy mùa khô cho vùng châu thổ, duy trì dòng chảy sinh thái tối thiểu và đẩy mặn cho các cửa sông Tiền, sông Hậu.
3. **Mối đe dọa hiện nay:** Các đập thủy điện thượng nguồn tích trữ nước mùa mưa làm giảm lượng nước đổ vào Biển Hồ, khiến dung tích điều hòa suy giảm nghiêm trọng.`
      },
      en: {
        primary: `🐜✨ **A magic natural miracle for our young friends!**

Tonle Sap Lake in Cambodia acts like a giant natural sponge:
- 🌊 **In flood season:** The Mekong River rises so high that water **flows backward into the lake**! The lake expands 5 times larger, storing floodwater so our Mekong Delta doesn't get overwhelmed!
- ☀️ **In dry season:** The lake **sends freshwater back into the river**, watering our crops and keeping salty seawater away!`,
        secondary: `🐜✨ **The unique bidirectional flow of Tonle Sap Lake:**

Connected to the Mekong via the 100 km Tonle Sap River, it exhibits a **twice-yearly flow reversal**:
- 🌊 **Flood Season (June - October):** Rising Mekong water pushes back into Tonle Sap Lake. Its area balloons from 2,500 km² to 16,000 km², storing up to 80 billion m³ of water.
- ☀️ **Dry Season (November - May):** The lake discharges stored water back into the Mekong mainstream, replenishing freshwater and pushing back saline intrusion in the Mekong Delta.`,
        highschool: `🐜✨ **Hydrological Regulation Analysis of Tonle Sap (Grade 11 Curriculum):**

Tonle Sap functions as the critical natural balancing reservoir of the lower basin:
1. **Flood Buffer Phase (Jun-Oct):** Hydraulic gradient forces reverse flow into the lake, retaining ~20% of peak Mekong flood volumes and moderating inundation downstream.
2. **Low-flow Replenishment Phase (Nov-May):** Discharges 50-70% of dry-season flow into the delta, preserving ecological flow and combating saltwater intrusion along the coastal estuaries.
3. **Emerging Vulnerability:** Upstream reservoir impoundment suppresses peak pulses, directly reducing Tonle Sap storage capacity.`
      }
    }
  },
  {
    keywords: ['9 cửa', 'chín cửa', 'cửa sông', 'cửu long', 'sông tiền', 'sông hậu', 'nine dragons', 'estuaries'],
    answer: {
      vi: {
        primary: `🐜✨ **Kiến Sáng đố bạn: Tại sao gọi là "Cửu Long" nhỉ?**

Bởi vì khi sông Mê Kông chảy vào miền Tây Nam Bộ, dòng sông chia làm 2 nhánh lớn (Sông Tiền và Sông Hậu) rồi tỏa ra biển qua **9 cửa sông**, giống như **9 con rồng** uốn lượn:
- 🐲 Sông Tiền có 6 cửa: Tiểu, Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu.
- 🐲 Sông Hậu có 3 cửa: Định An, Bát Xắc, Trần Đề.
Dòng sông chở nặng phù sa nuôi lớn ruộng lúa và vườn dừa bát ngát quê mình!`,
        secondary: `🐜✨ **Hệ thống 9 Cửa Sông Cửu Long đổ ra Biển Đông:**

Khi vào lãnh thổ Việt Nam tại An Giang và Đồng Tháp, sông Mê Kông phân thành hai phân lưu chính:
- **Sông Tiền (6 cửa sông):**
  1. Cửa Tiểu (Tiền Giang)
  2. Cửa Đại (Tiền Giang - Bến Tre)
  3. Cửa Ba Lai (Bến Tre - hiện có cống đập ngăn mặn)
  4. Cửa Hàm Luông (Bến Tre)
  5. Cửa Cổ Chiên (Bến Tre - Trà Vinh)
  6. Cửa Cung Hầu (Trà Vinh)
- **Sông Hậu (3 cửa sông):**
  7. Cửa Định An (Trà Vinh - Sóc Trăng)
  8. Cửa Bát Xắc (Ba Thắc - hiện đã bị bồi lắng tự nhiên)
  9. Cửa Trần Đề (Sóc Trăng)
Mạng lưới này bồi đắp nên đồng bằng châu thổ rộng lớn hơn 40 000 km²!`,
        highschool: `🐜✨ **Cấu trúc mạng lưới sông ngòi ĐBSCL và biến động cửa sông (Địa lí 11):**

Hệ thống sông Cửu Long là mạng lưới phân lưu hạ triều điển hình:
- **Phân dòng thủy văn:** Tại Tân Châu (Sông Tiền) và Châu Đốc (Sông Hậu), tỷ lệ phân chia lưu lượng mùa kiệt lần lượt xấp xỉ 80% và 20%; mùa lũ khoảng 60% và 40%.
- **Biến động 9 cửa sông:** Cửa Ba Lai đã được ngăn dòng bởi cống đập thủy lợi Ba Lai phục vụ ngọt hóa; cửa Bát Xắc (Bassac) bị bồi lấp do động lực bồi tụ ven bờ, hiện thực tế còn 7 cửa thông biển lớn.
- **Thách thức:** Thủy triều biển Đông (bán nhật triều không đều biên độ 3,5-4m) kết hợp lưu lượng kiệt thượng nguồn đẩy ranh mặn 4‰ vào sâu 50 - 80 km.`
      },
      en: {
        primary: `🐜✨ **Kien Sang asks: Do you know why it's called "Cuu Long"?**

In Vietnamese, "Cuu Long" means **Nine Dragons**! When the river enters Vietnam, it splits into two big branches and flows out to the sea through **9 river mouths**:
- 🐲 Tien River has 6 mouths: Tieu, Dai, Ba Lai, Ham Luong, Co Chien, Cung Hau.
- 🐲 Hau River has 3 mouths: Dinh An, Bat Xac, Tran De.
They bring rich silt to nourish green rice paddies and sweet fruit gardens!`,
        secondary: `🐜✨ **The Nine Estuaries of the Mekong Delta:**

Entering Vietnam at An Giang and Dong Thap, the river splits into two major branches:
- **Tien River (6 mouths):** Tieu, Dai, Ba Lai, Ham Luong, Co Chien, Cung Hau.
- **Hau River (3 mouths):** Dinh An, Bat Xac (now silted up), Tran De.
Together, they have deposited nutrient-dense alluvial sediments to form a delta exceeding 40,000 km²!`,
        highschool: `🐜✨ **Delta Estuarine Hydrodynamics (Grade 11 Geography):**

The Mekong Delta's estuarine distributary network:
- **Discharge Division:** Tien River handles ~80% of dry-season flow and ~60% of flood discharge; Hau River carries ~20% and ~40% respectively.
- **Morphological Dynamics:** Ba Lai estuary was gated for salinity control; Bat Xac (Bassac) closed due to natural littoral deposition—leaving 7 primary functioning mouths today.
- **Tidal Regime:** Influenced by irregular semi-diurnal East Sea tides (amplitude 3.5–4.0 m), driving 4‰ salinity fronts 50–80 km inland during low-flow periods.`
      }
    }
  },
  {
    keywords: ['vai trò mrc', 'vai trò của ủy hội', 'vai trò ủy hội', 'sự tham gia của việt nam', 'việt nam trong mrc', 'đóng góp của việt nam', 'mục tiêu của ủy hội', 'hoạt động của ủy hội', 'role of mrc', 'vietnam participation'],
    answer: {
      vi: {
        primary: `🐜✨ **Ủy hội Sông Mê Công (MRC) và Việt Nam (Kiến thức Tiểu học):**

- 🤝 **MRC là gì:** Là ngôi nhà chung được thành lập từ năm 1995 bởi 4 quốc gia: Việt Nam, Lào, Campuchia và Thái Lan để cùng nhau quản lí, bảo vệ nguồn nước sông Mê Kông vì lợi ích chung và an sinh cộng đồng.
- 🌊 **Hoạt động của MRC:** Giúp các nước bắt tay nhau chia sẻ số liệu nước, báo tin lũ lụt và hạn hán, không làm tổn hại đến nguồn nước của bạn.
- 🇻🇳 **Việt Nam tham gia thế nào:** Nước mình ở hạ lưu (ĐBSCL) nên rất gương mẫu, luôn nhắc nhở mọi người giữ sạch dòng nước và bảo vệ cá tôm!`,
        secondary: `🐜✨ **Mục Tiêu, Hoạt Động Của Uỷ Hội Sông Mê Công & Việt Nam (THCS - SGK Địa lí 11):**

- 🎯 **Mục tiêu của Uỷ hội sông Mê Công (MRC):**
  Thúc đẩy, phối hợp quản lí và phát triển tài nguyên nước cũng như các tài nguyên có liên quan một cách bền vững vì lợi ích chung của các quốc gia sông Mê Công và an sinh của cộng đồng.
- 🌊 **Các hoạt động tiêu biểu của Uỷ hội:**
  1. Là diễn đàn ngoại giao nước và hợp tác vùng để chia sẻ lợi ích và giải quyết các vấn đề xuyên biên giới.
  2. Hỗ trợ kĩ thuật, xây dựng công cụ thực hành và hỗ trợ quy hoạch lưu vực sông.
  3. Thông qua 5 thủ tục nước quan trọng (PDIES chia sẻ số liệu, PWUM giám sát, PNPCA tham vấn trước, PMFM duy trì dòng chảy, PWQ chất lượng nước).
  4. Thực hiện các dự án quản lí tổng hợp xuyên biên giới và các sáng kiến (thích ứng BĐKH CCAI, thuỷ điện bền vững ISH).
- 🇻🇳 **Việt Nam trong Uỷ hội sông Mê Công:**
  Là thành viên tích cực, thành lập Uỷ ban sông Mê Công Việt Nam (18/9/1978), cùng Campuchia hoàn thành 2 dự án song phương, tổ chức Hội nghị Cấp cao lần 2 (2014) và làm Chủ tịch Hội đồng MRC các năm 2018, 2022.`,
        highschool: `🐜✨ **Chuẩn Kiến Thức SGK Chuyên Đề Địa Lí 11 (Bộ Kết Nối Tri Thức Với Cuộc Sống - Trang 8 đến 16):**

🏛️ **I. UỶ HỘI SÔNG MÊ CÔNG (MRC) - MỤC TIÊU & HOẠT ĐỘNG TIÊU BIỂU:**
1. **Lí do ra đời & Quá trình hình thành:** 
   - Nhu cầu cân bằng giữa phát triển kinh tế và duy trì tính bền vững sinh thái trước nguy cơ suy giảm nguồn nước, đô thị hoá nhanh và xây đập thuỷ điện dòng chính.
   - Thành lập Uỷ ban Mê Công (1957) ➔ Uỷ ban Lâm thời (1978) ➔ Kí Hiệp định Hợp tác phát triển bền vững lưu vực sông Mê Công lập ra **Uỷ hội sông Mê Công (MRC)** vào năm 1995 (Việt Nam, Lào, Cam-pu-chia, Thái Lan; Mi-an-ma và Trung Quốc là đối tác đối thoại).
2. **Mục tiêu của Uỷ hội (trang 9 SGK):** 
   - Thúc đẩy, phối hợp quản lí và phát triển tài nguyên nước cũng như các tài nguyên có liên quan một cách bền vững vì lợi ích chung của các quốc gia sông Mê Công và an sinh của cộng đồng.
3. **Các hoạt động tiêu biểu của Uỷ hội (trang 9-14 SGK):**
   - **Diễn đàn ngoại giao nước và hợp tác vùng:** Chia sẻ lợi ích chung và giải quyết vấn đề xuyên biên giới.
   - **Hỗ trợ kĩ thuật & công cụ thực hành:** Giúp các nước ra quyết định về kế hoạch phát triển; hỗ trợ quy hoạch lưu vực dựa trên quản lí tổng hợp tài nguyên nước.
   - **Năm thủ tục quản lí nước (Hình 6 trang 10 SGK):**
     + *PDIES (2001):* Trao đổi và chia sẻ thông tin số liệu.
     + *PWUM (2003):* Giám sát sử dụng nước.
     + *PNPCA (2003):* Thông báo, tham vấn trước và thoả thuận.
     + *PMFM (2006):* Duy trì dòng chảy trên dòng chính.
     + *PWQ (2011):* Chất lượng nước.
   - **Bảy thành tựu giai đoạn 2016 - 2020:** Nâng cao hiểu biết chung; tối ưu hoá quản lí môi trường; hướng dẫn dự án sử dụng nước; thực hiện chặt chẽ các thủ tục; đối thoại hợp tác hiệu quả; tăng cường giám sát dự báo; đổi mới MRC hiệu quả hơn.
   - **Các dự án xuyên biên giới & sáng kiến:** 5 dự án song phương; Sáng kiến CCAI (thích ứng BĐKH), ISH (thuỷ điện bền vững); 5 chương trình AIP, DMP, EP, FP, NAP; các cơ chế Mê Công - Lan Thương (2016), Mê Công - Hoa Kỳ (2009), Mê Công - Nhật Bản (2007), Mê Công - Hàn Quốc (2011), Mê Công - sông Hằng (2000).

🇻🇳 **II. BỐN VAI TRÒ CỦA VIỆT NAM TRONG UỶ HỘI SÔNG MÊ CÔNG (Mục 4 trang 14-16 SGK):**
1. **Vai trò đối với việc quản lí, giám sát tài nguyên xuyên biên giới:**
   - Uỷ ban sông Mê Công Việt Nam (thành lập 18/9/1978 với 2 Tiểu ban: Cửu Long và Sê San - Srêpôk) quản lí hoạt động hợp tác với MRC trên toàn lưu vực, vùng ĐBSCL và Tây Nguyên.
   - Hoàn thành 2 trong 5 sáng kiến song phương với Cam-pu-chia: Dự án Quản lí tổng hợp tài nguyên nước lưu vực sông Sê San - Srêpôk và Dự án Quản lí tổng hợp tài nguyên nước đồng bằng sông Mê Công.
2. **Vai trò đối với việc lồng ghép hoạt động của Uỷ hội và các hợp tác đa phương, song phương:**
   - Tích cực thúc đẩy hợp tác giữa các quốc gia thành viên, với các đối tác đối thoại, sáng kiến vùng và 14 đối tác phát triển của Uỷ hội.
   - Tích cực thúc đẩy mở rộng hợp tác liên lưu vực sông (sông Hằng, sông Đa-nuýp, sông Nin, sông A-ma-dôn, sông Mi-xi-xi-pi).
3. **Vai trò trong việc xây dựng các chiến lược của Uỷ hội:**
   - Đóng vai trò tích cực trong quá trình tái cấu trúc và nội vùng hoá nhằm phát triển bền vững sông Mê Công.
4. **Vai trò trong đàm phán, kí kết bộ Quy chế sử dụng nước, thúc đẩy các chương trình, dự án của Uỷ hội:**
   - Tham gia Công ước LHQ về Luật sử dụng các nguồn nước xuyên biên giới 1997.
   - Ban hành Nghị quyết 120/NQ-CP (2017) về phát triển bền vững ĐBSCL thích ứng BĐKH theo hướng "thuận tự nhiên"; Luật Bảo vệ Môi trường và Luật Tài nguyên nước (2020) theo mô hình kinh tế xanh, kinh tế tuần hoàn.
   - **Sự kiện tiêu biểu:** Đăng cai Hội nghị Cấp cao lần thứ 2 của MRC (2014, TP.HCM với chủ đề "An ninh nguồn nước, năng lượng, lương thực trong bối cảnh biến đổi khí hậu"); đảm nhiệm vai trò Chủ tịch Hội đồng MRC các năm 2018 và 2022.`
      },
      en: {
        primary: `🐜✨ **MRC and Vietnam (Primary School Core):**

- 🤝 **What is the MRC:** Established in 1995 by 4 neighbor countries (Vietnam, Laos, Cambodia, Thailand) to manage and protect Mekong River water for mutual benefit and people's well-being.
- 🌊 **MRC Activities:** Sharing hydrological data, forecasting floods and droughts, ensuring fair water use without harming downstream neighbors.
- 🇻🇳 **Vietnam's Participation:** As the downstream delta nation, Vietnam actively protects clean water, fish habitats, and warns communities about storms and drought!`,
        secondary: `🐜✨ **MRC Objectives, Activities & Vietnam's Roles (Secondary School - Grade 11 Curriculum):**

- 🎯 **MRC Objective (p.9):** Promote and coordinate sustainable management and development of water and related resources for the mutual benefit of all Mekong countries and community well-being.
- 🌊 **Core MRC Activities:** Water diplomacy forum; Technical assistance; Enforcement of 5 water procedures (PDIES, PWUM, PNPCA, PMFM, PWQ); Transboundary bilateral projects and adaptation initiatives.
- 🇻🇳 **Vietnam's Active Engagement:** Established Vietnam National Mekong Committee (Sept 18, 1978); completed 2 bilateral projects with Cambodia; hosted 2nd MRC Summit (2014); served as MRC Council Chair in 2018 and 2022.`,
        highschool: `🐜✨ **Grade 11 Geography Curriculum Standard (Section I, pp. 8-16 MOET Textbook):**

🏛️ **I. MEKONG RIVER COMMISSION (MRC) - OBJECTIVE & CORE ACTIVITIES:**
1. **Rationale & Evolution:** Mekong River Committee (1957) ➔ Interim Committee (1978) ➔ 1995 Mekong Agreement establishing the Mekong River Commission (MRC) among Cambodia, Laos, Thailand, and Vietnam; China & Myanmar participate as dialogue partners.
2. **Objective (p.9):** To promote and coordinate sustainable management and development of water and related resources for mutual benefit and community well-being.
3. **Core Activities (pp.9-14):**
   - Water diplomacy platform & regional cooperation.
   - Technical support, practice tools & integrated water resources management (IWRM) planning.
   - **Five Water Procedures (Figure 6, p.10):** PDIES (2001, data exchange), PWUM (2003, water use monitoring), PNPCA (2003, prior consultation), PMFM (2006, mainstream flow maintenance), PWQ (2011, water quality).
   - Seven Achievements (2016-2020) & 5 bilateral transboundary projects.
   - Cooperation initiatives (CCAI, ISH), programs (AIP, DMP, EP, FP, NAP), and partner mechanisms (Lancang-Mekong, US, Japan, Korea, Ganga).

🇻🇳 **II. VIETNAM'S FOUR ROLES IN THE MRC (Section 4, pp.14-16 MOET Textbook):**
1. **Role in managing and monitoring transboundary resources:** Vietnam National Mekong Committee (established Sept 18, 1978 with Cuu Long and Se San - Srepok sub-committees) oversees basin cooperation; completed 2 of 5 bilateral initiatives with Cambodia (Se San - Srepok basin & Mekong Delta).
2. **Role in mainstreaming MRC activities with multilateral and bilateral cooperation:** Fosters collaboration among members, with 14 development partners, and inter-basin dialogues (Ganges, Danube, Nile, Amazon, Mississippi).
3. **Role in formulating MRC strategies:** Actively engages in restructuring and basin-wide ownership for sustainable development.
4. **Role in negotiating water use rules and advancing MRC programs & projects:**
   - Acceded to 1997 UN Watercourses Convention.
   - Issued Government Resolution 120/NQ-CP (2017) on sustainable climate-resilient development of Mekong Delta (nature-based approach); 2020 Environmental Protection and Water Resources Laws (green & circular economy).
   - **Key Milestones:** Hosted the 2nd MRC Summit (2014, HCMC on "Water, Food and Energy Security in the Context of Climate Change"); served as MRC Council Chair in 2018 and 2022.`
      }
    }
  },
  {
    keywords: ['fpt', 'hậu giang', 'trường', 'vị thủy', '61c', 'xà no', 'hau giang'],
    answer: {
      vi: {
        primary: `🐜✨ **A ha! Bạn vừa nhắc đến ngôi trường mến yêu của Kiến Sáng đấy!**

🏫 **Trường TH, THCS & THPT FPT Hậu Giang**
- Nằm ở số **61C Ấp 6, xã Vị Thủy**, rất gần dòng kênh xáng Xà No êm đềm!
- Nơi đây có thầy cô tận tâm và các bạn học sinh chăm ngoan, ứng dụng công nghệ để học tập và thêm yêu quê hương sông nước miền Tây!`,
        secondary: `🐜✨ **Trường FPT Hậu Giang & Vị thế trên vùng châu thổ:**

🏫 **Trường TH, THCS & THPT FPT Hậu Giang**
- **Vị trí:** Số 61C Ấp 6, xã Vị Thủy, Hậu Giang (cửa ngõ giáp ranh TP. Cần Thơ).
- **Ý nghĩa địa lí:** Nằm kề bên tuyến **Kênh xáng Xà No** - công trình thủy lợi đào từ năm 1901, được mệnh danh là "Con đường lúa gạo huyền thoại của Nam Bộ".
- Học sinh FPT Hậu Giang luôn đi đầu trong việc ứng dụng chuyển đổi số và STEM vào bảo vệ môi trường sông nước!`,
        highschool: `🐜✨ **FPT Hậu Giang trong mối liên hệ không gian lưu vực Tây Sông Hậu:**

🏫 **Trường TH, THCS & THPT FPT Hậu Giang**
- **Tọa độ địa lí:** 61C Ấp 6, xã Vị Thủy, tỉnh Hậu Giang; tâm điểm phân vùng sinh thái ngọt - lợ của bán đảo Cà Mau và Tây Sông Hậu.
- **Giá trị kinh tế - lịch sử:** Gắn liền với trục thủy lộ huyết mạch Kênh xáng Xà No dài gần 40km nối sông Cần Thơ với sông Cái Lớn đổ ra Vịnh Thái Lan.
- **Đóng góp nghiên cứu:** Nền tảng số hóa tương tác Sông Mê Kông này do học sinh **Phan Anh Thơ (MSHS: FHG30024)** nghiên cứu, thể hiện tinh thần sáng tạo công nghệ gắn liền với Chuyên đề Địa lí 11.`
      },
      en: {
        primary: `🐜✨ **Aha! You just mentioned Kien Sang's beloved school!**

🏫 **FPT Primary, Secondary & High School Hau Giang**
- Located at **61C Hamlet 6, Vi Thuy Commune**, right near the gentle Xa No Canal!
- A wonderful school where students learn modern technology and cherish our Mekong River homeland!`,
        secondary: `🐜✨ **FPT Hau Giang School & Regional Geographic Significance:**

🏫 **FPT Primary, Secondary & High School Hau Giang**
- **Location:** 61C Hamlet 6, Vi Thuy Commune, Hau Giang (adjacent to Can Tho City).
- **Geographical Heritage:** Situated along the **Xa No Canal** (excavated in 1901), historically celebrated as the "Legendary Rice Highway of Southern Vietnam".
- FPT students lead the way in digital learning, STEM, and environmental stewardship!`,
        highschool: `🐜✨ **FPT Hau Giang in the Spatial Context of West Hau River Basin:**

🏫 **FPT Primary, Secondary & High School Hau Giang**
- **Spatial Position:** 61C Hamlet 6, Vi Thuy, Hau Giang; located at the freshwater-brackish transition node of the West Hau River / Ca Mau Peninsula zone.
- **Hydrological Axis:** Connected to the ~40 km Xa No Canal corridor linking the Can Tho River to the Cai Lon River.
- **Academic Authorship:** This interactive Mekong digital platform is researched and developed by student **Phan Anh Tho (ID: FHG30024)**, integrating Grade 11 Geography and digital innovation.`
      }
    }
  },
  {
    keywords: ['thuận thiên', '120', 'nghị quyết 120', 'thích ứng', 'mặn', 'tôm', 'nature-based', 'resolution 120'],
    answer: {
      vi: {
        primary: `🐜✨ **"Thuận thiên" nghĩa là sống hòa thuận với thiên nhiên đấy bạn nhỏ!**

- Thay vì chặn mặn vất vả, bà con miền Tây thông minh trồng lúa khi nước ngọt, và nuôi tôm khi nước lợ!
- Tôm ăn rong rêu sạch, lúa thơm hạt mẩy, không dùng hóa chất độc hại, vừa bảo vệ môi trường vừa kiếm được nhiều tiền hơn!`,
        secondary: `🐜✨ **Tư duy phát triển "Thuận Thiên" theo Nghị quyết 120/NQ-CP:**

- Ban hành ngày **17/11/2017**, là bước đột phá chiến lược của Chính phủ cho ĐBSCL:
1. **Tôn trọng tự nhiên:** Coi nước mặn và nước lợ là **tài nguyên kinh tế**, thay vì chỉ coi là thiên tai đối kháng.
2. **Đổi mới trục sản phẩm:** Chuyển từ "Lúa gạo - Trái cây - Thủy sản" sang **"Thủy sản - Trái cây - Lúa gạo"**.
3. **Mô hình kinh tế xanh:** Nhân rộng mô hình lúa - tôm hữu cơ, tôm - rừng ngập mặn ở Cà Mau, Bến Tre, Bạc Liêu cho giá trị xuất khẩu cao.`,
        highschool: `🐜✨ **Phân tích chiều sâu chiến lược Nghị quyết 120/NQ-CP "Thuận thiên" (Địa lí 11):**

Nghị quyết 120/NQ-CP (17/11/2017) đánh dấu sự chuyển đổi mô hình tăng trưởng từ tư duy "chống lại thiên nhiên" sang "thích ứng chủ động":
- **Triết lí cốt lõi:** Lấy tài nguyên nước làm yếu tố cốt lõi; tôn trọng quy luật tự nhiên; chuyển đổi thách thức xâm nhập mặn thành cơ hội kinh tế biển và thủy sản nước lợ.
- **Tái cấu trúc không gian 3 vùng sinh thái:**
  1. *Vùng lõi nước ngọt (thượng lưu):* Vựa lúa chất lượng cao và cây ăn trái đặc sản.
  2. *Vùng chuyển tiếp ngọt - lợ:* Mô hình luân canh thông minh lúa - tôm hữu cơ.
  3. *Vùng ven biển mặn - lợ:* Kinh tế thủy hải sản công nghệ cao gắn với bảo tồn rừng ngập mặn phòng hộ.
- **Hiệu quả:** Tối ưu hóa chuỗi giá trị xuất khẩu tỉ đô, giảm áp lực khai thác nước ngầm gây sụt lún sạt lở.`
      },
      en: {
        primary: `🐜✨ **"Living in harmony with nature" is the secret!**

- Farmers in the Mekong Delta don't fight nature anymore: they grow rice when freshwater comes, and raise tasty shrimp when brackish water enters!
- Clean shrimp, healthy rice, happy farmers, and a clean environment!`,
        secondary: `🐜✨ **The Nature-Based Mindset of Resolution 120/NQ-CP:**

- Issued on **November 17, 2017**, this is Vietnam's strategic blueprint for climate resilience:
1. **Respect Nature:** Treat brackish and saline water as **valuable economic resources**, rather than purely natural disasters.
2. **Reprioritized Agriculture:** Shifting from "Rice - Fruit - Seafood" to **"Seafood - Fruit - Rice"**.
3. **Green Ecosystems:** Expanding organic rice-shrimp rotation and mangrove-friendly aquaculture across coastal provinces.`,
        highschool: `🐜✨ **Strategic Framework of Resolution 120/NQ-CP (Grade 11 Curriculum):**

Government Resolution 120/NQ-CP represents a landmark paradigm shift from hard defense to proactive nature-based adaptation:
- **Core Philosophy:** Water-centric development; transforming salinity constraints into comparative advantages for aquaculture.
- **Three Agro-Ecological Zones:**
  1. *Upper Freshwater Core:* Specialized high-yield rice, aquaculture, and premium horticulture.
  2. *Transitional Brackish Zone:* Regenerative rice-shrimp rotational farming.
  3. *Coastal Saline Belt:* Modern marine aquaculture integrated with coastal mangrove biospheres.
- **Impact:** Stabilizes groundwater aquifers, curbs land subsidence, and diversifies rural export earnings.`
      }
    }
  },
  {
    keywords: ['đập thủy điện', 'tiểu loan', 'xayaburi', 'phù sa', 'sạt lở', 'hydropower', 'dams', 'sediment'],
    answer: {
      vi: {
        primary: `🐜✨ **Những con đập thủy điện ảnh hưởng thế nào đến dòng sông?**

- Đập thủy điện giống như những bức tường khổng lồ chắn ngang sông để làm ra điện.
- Nhưng chúng giữ lại đất bùn phù sa màu mỡ và chặn đường bơi của đàn cá!
- Thiếu phù sa, bờ sông ở miền Tây mình bị lở, đất cát bị cuốn trôi khiến nhà cửa và vườn cây bị ảnh hưởng đấy bạn nhỏ ạ.`,
        secondary: `🐜✨ **Tác động của chuỗi đập thủy điện thượng nguồn:**

- **Giữ phù sa:** Hơn 11 đập ở Trung Quốc và các đập trên dòng chính tại Lào đã giữ lại từ **50% đến 70% lượng bùn cát phù sa**.
- **Sạt lở bờ sông, bờ biển:** Nước thiếu phù sa trở nên "nước đói", chảy xiết gây xói lở hàng ngàn km đê kè và bờ sông tại An Giang, Đồng Tháp, Cần Thơ, Hậu Giang, Cà Mau.
- **Mùa khô thiếu nước:** Các đập tích nước phát điện làm giảm lưu lượng dòng chảy mùa kiệt, đẩy ranh mặn vào sâu nội đồng.`,
        highschool: `🐜✨ **Đánh giá hệ quả địa kinh tế - sinh thái từ chuỗi thủy điện Mê Kông (Địa lí 11):**

Chuỗi thủy điện bậc thang thượng nguồn (12 đập dòng chính Lancang và 11 dự án dòng chính hạ lưu) gây tác động đa tầng nghiêm trọng:
1. **Thiếu hụt trầm tích (Sediment Starvation):** Giữ lại tới 67-75% lượng phù sa mịn và cát đáy. Làm chậm quá trình bồi tụ mở rộng mũi Cà Mau và gia tăng xói lở bờ sông, bờ biển cực đoan.
2. **Biến dạng thủy chế (Hydrograph Alteration):** San phẳng đỉnh lũ tự nhiên, làm giảm xung lũ sinh thái cần thiết cho Biển Hồ Tonle Sap; tích trữ nước đầu mùa khô gây hạn mặn dị thường tại ĐBSCL.
3. **Đứt gãy hành lang di cư:** Chặn đứng đường di cư sinh sản của hơn 60% loài cá trắng đặc hữu (như cá tra dầu, cá vồ cờ), đe dọa trực tiếp an ninh protein khu vực.`
      },
      en: {
        primary: `🐜✨ **How do big hydropower dams affect our river?**

- Dams are giant concrete walls built across the river to make electricity.
- But they trap rich brown silt and block baby fish from swimming home!
- Without fertile silt, riverbanks in our homeland wash away, causing land erosion.`,
        secondary: `🐜✨ **Impacts of Upstream Hydropower Cascade:**

- **Trapping Sediment:** Mainstream dams in China and Laos trap **50% to 70% of vital silt and sediment**.
- **Severe Erosion:** "Hungry water" lacking sediments flows faster, causing widespread riverbank and coastal erosion across Mekong Delta provinces.
- **Salinity Aggravation:** Dry-season impoundment lowers mainstream water levels, allowing seawater to penetrate deeply into farmland.`,
        highschool: `🐜✨ **Multi-dimensional Impact Assessment of Mainstream Hydropower (Grade 11):**

Cascade development across the Lancang-Mekong mainstream poses acute structural challenges:
1. **Sediment Starvation:** Traps 67–75% of total sediment flux, depriving the delta of land-building silt and triggering pervasive shoreline and canal bank collapse.
2. **Hydrographic Alteration:** Flattens natural flood pulses essential for Tonle Sap reversal and depresses baseline dry-season discharges, aggravating acute salinity intrusion.
3. **Ecological Fragmentation:** Disrupts longitudinal fish migration corridors, endangering critical freshwater biodiversity and regional food security.`
      }
    }
  },
  {
    keywords: ['khai thác', 'sử dụng nguồn nước', 'vấn đề nguồn nước', 'môi trường nước', 'vấn đề trong khai thác', 'phân tích vấn đề', 'water exploitation', 'water resource', 'bảo vệ môi trường nước'],
    answer: {
      vi: {
        primary: `🐜✨ **Chào bạn nhỏ! Về việc sử dụng và bảo vệ nước sông Mê Kông, Kiến Sáng tóm tắt thật nhanh nhé:**

1. 🌊 **Chúng mình dùng nước sông làm gì:** Để tưới tiêu cho lúa tốt tươi, nuôi cá tôm béo mầm, chở thuyền bè buôn bán và làm ra điện thắp sáng các thành phố!
2. ⚠️ **Những vấn đề đang lo lắng:** Nước sông bị thiếu phù sa do đập thủy điện giữ lại, mùa khô nước mặn lấn sâu vào đồng ruộng, bờ sông bị sạt lở và rác thải làm bẩn dòng sông.
3. 💚 **Cách bảo vệ:** Không xả rác xuống sông, tiết kiệm nước ngọt và bà con chuyển sang mô hình lúa - tôm sạch để giữ dòng sông trong lành!`,
        secondary: `🐜✨ **Chào bạn học sinh THCS! Đây là các vấn đề trong khai thác nguồn nước sông Mê Kông:**

1. 💧 **Mục đích khai thác chính:**
- Phát triển thủy điện (chuỗi đập ở Trung Quốc, Lào).
- Thủy lợi tưới tiêu cho hơn 10 triệu ha đất nông nghiệp.
- Giao thông thủy, đánh bắt thủy sản (>2,6 triệu tấn/năm) và cấp nước sinh hoạt.
2. ⚠️ **Các vấn đề và hệ lụy phát sinh:**
- Lượng phù sa giảm hơn 50-70%, khiến đồng ruộng bạc màu và lòng sông bị xói lở.
- Xâm nhập mặn mùa khô lấn sâu 50-80 km vào ĐBSCL, gây thiếu nước ngọt nghiêm trọng.
- Ô nhiễm nguồn nước do hóa chất nông nghiệp và nước thải sinh hoạt.
3. 🛡️ **Biện pháp bảo vệ:**
- Hợp tác trong Ủy hội sông Mê Công (MRC) để chia sẻ nguồn nước công bằng.
- Xây cống ngăn mặn, hồ trữ nước ngọt và chuyển đổi mô hình thích ứng tự nhiên.`,
        highschool: `🐜✨ **Phân tích một số vấn đề trong khai thác, sử dụng nguồn nước và bảo vệ môi trường nước (Mục 4 SGK Địa lí 11):**

📌 **I. CÁC MỤC ĐÍCH KHAI THÁC CHÍNH:**
1. **Thủy điện:** Tiềm năng >53 000 MW; Trung Quốc vận hành 12 đập dòng chính Lan Thương, Lào và Campuchia quy hoạch 11 đập dòng chính hạ lưu.
2. **Nông nghiệp & Thủy lợi:** Tưới tiêu >10 triệu ha, cấp nước cho vựa lúa ĐBSCL (chiếm 50% sản lượng và 90% gạo xuất khẩu Việt Nam).
3. **Thủy sản:** Ngư trường nước ngọt số 1 thế giới (>2,6 triệu tấn/năm, >11 tỉ USD), cấp 80% protein động vật cho dân cư hạ du.
4. **Giao thông thủy & Đô thị:** Trục thủy lộ quốc tế nối Vân Nam ra biển Đông; cấp nước cho 65 triệu dân.

⚠️ **II. SÁU VẤN ĐỀ (HỆ LỤY & THÁCH THỨC) NẢY SINH:**
1. **Biến dạng thủy chế:** Hồ chứa san phẳng đỉnh lũ, làm mất nhịp lũ sinh thái của Biển Hồ Tonle Sap; lưu lượng mùa kiệt thất thường.
2. **"Đói phù sa" (Sediment Starvation):** Đập giữ lại 50% - 74% trầm tích (từ 160 triệu tấn giảm còn <47 triệu tấn/năm), khiến đất bạc màu.
3. **Xâm nhập mặn sâu & kéo dài:** Ranh mặn 4‰ lấn sâu 50 - 90 km vào ĐBSCL mùa kiệt (các đợt hạn mặn lịch sử 2016, 2020).
4. **Sạt lở bờ sông, bờ biển & Sụt lún đồng bằng:** Nước "đói phù sa" kết hợp khai thác cát làm sạt lở dữ dội; khai thác nước ngầm khiến ĐBSCL lún 1-3 cm/năm.
5. **Suy giảm đa dạng sinh học:** Đập chia cắt đường di cư sinh sản của hơn 60% loài cá trắng, đe dọa các loài cá khổng lồ (cá tra dầu, cá hô).
6. **Ô nhiễm môi trường nước:** Dư lượng phân bón, thuốc BVTV, nước thải ao nuôi thủy sản và đô thị chưa qua xử lý.

🌿 **III. GIẢI PHÁP BẢO VỆ & SỬ DỤNG HỢP LÝ:**
- **Đa phương hóa:** Tuân thủ Hiệp định MRC 1995, thực thi quy chế tham vấn trước PNPCA; đàm phán chia sẻ dữ liệu thủy văn quanh năm với Trung Quốc.
- **Công trình:** Vận hành cống kiểm soát mặn Cái Lớn - Cái Bé, đào hồ trữ nước ngọt nội đồng, yêu cầu đập thủy điện làm đường cho cá (fish passage) và cửa xả đáy cát.
- **"Thuận thiên" (Nghị quyết 120/NQ-CP):** Coi nước mặn - lợ là tài nguyên; tái cơ cấu sang Thủy sản ➔ Trái cây ➔ Lúa gạo; dừng khai thác nước ngầm quá mức.`
      },
      en: {
        primary: `🐜✨ **Hello little explorer! Here is Kien Sang's summary of water use and protection:**

1. 🌊 **How we use river water:** To grow green rice, raise happy fish and shrimp, sail trading boats, and generate clean electricity!
2. ⚠️ **The challenges:** Upstream dams trap rich soil nutrients, seawater flows into farmland during dry months, and riverbanks wash away.
3. 💚 **How to protect:** Never throw trash into water, turn off taps when brushing teeth, and practice organic rice-shrimp farming!`,
        secondary: `🐜✨ **Key Water Exploitation & Environmental Challenges (Secondary Level):**

1. 💧 **Main Exploitation Uses:**
- Hydropower dams in China and Laos.
- Irrigation for >10 million hectares of farmland.
- Inland navigation, fisheries (>2.6 million tons/year), and domestic supply.
2. ⚠️ **Core Issues Arising:**
- Silt reduction by 50-70%, accelerating riverbank collapse.
- Dry-season salinity intrusion reaching 50-80 km inland in the Mekong Delta.
- Local water pollution from agricultural runoff and untreated wastewater.
3. 🛡️ **Solutions:**
- Cooperating through the Mekong River Commission (MRC).
- Operating salinity control sluice gates and nature-based adaptation.`,
        highschool: `🐜✨ **Academic Analysis: Water Resource Exploitation & Environmental Governance (Grade 11 Curriculum - Topic 4):**

📌 **I. MAJOR WATER UTILIZATION SECTORS:**
1. **Hydropower Generation:** >53,000 MW basin potential; 12 cascade dams on Lancang (China) and 11 mainstream projects in lower basin (Laos/Cambodia).
2. **Agricultural Irrigation:** Servicing >10 million ha of cropland, underpinning the Mekong Delta (50% rice output, 90% Vietnam's rice exports).
3. **Capture Fisheries & Aquaculture:** World's premier freshwater fishery (>2.6 million tons/year, >$11B value), providing 80% animal protein.
4. **Navigation & Urban Supply:** Strategic commercial corridor connecting Yunnan to deep-water ports; supplying 65M basin citizens.

⚠️ **II. SIX CRITICAL PROBLEMS & CONSEQUENCES:**
1. **Hydrological Disruption:** Reservoir impoundment dampens natural flood pulses, debilitating Tonle Sap reverse flow and altering dry-season discharge.
2. **Sediment Starvation:** Upstream dams trap 50–74% of sediment flux (from 160M to <47M tons/year), impoverishing soils.
3. **Severe Salinity Intrusion:** 4‰ salinity boundary penetrates 50–90 km inland during low-flow spells.
4. **Severe Bank & Coastal Erosion + Subsidence:** Hungry water dynamics and sand mining trigger widespread collapse; groundwater overdraft causes 1–3 cm/year subsidence.
5. **Biodiversity & Fishery Depletion:** Longitudinal dam walls sever migration corridors of >60% whitefish species.
6. **Water Quality Degradation:** Agrochemical runoff, untreated aquaculture effluent, and urban waste induce localized eutrophication.

🌿 **III. STRATEGIC MITIGATION & NATURE-BASED ADAPTATION:**
- **Transboundary Diplomacy:** Strict adherence to 1995 Mekong Agreement & PNPCA prior consultation; year-round telemetry data sharing with China.
- **Structural Measures:** Synchronized operation of Cai Lon - Cai Be salinity barrier, community retention basins, and retrofitting fish passages / sediment sluices.
- **Resolution 120/NQ-CP Nature-Based Shift:** Valuing brackish water as an economic resource; shifting order to Aquaculture ➔ Fruit ➔ Rice; banning illegal sand mining.`
      }
    }
  }
];

export const LEVEL_QUIZZES: LocalQuizItem[] = [
  // Primary Quizzes
  {
    level: 'primary',
    question: {
      vi: 'Sông Mê Kông chảy qua bao nhiêu quốc gia trước khi đổ ra biển?',
      en: 'How many countries does the Mekong River flow through before reaching the sea?'
    },
    options: {
      vi: ['A. 3 quốc gia', 'B. 6 quốc gia', 'C. 9 quốc gia', 'D. 12 quốc gia'],
      en: ['A. 3 countries', 'B. 6 countries', 'C. 9 countries', 'D. 12 countries']
    },
    correctIndex: 1,
    explanation: {
      vi: 'Đúng rồi! Sông chảy qua 6 nước: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.',
      en: 'Correct! The river travels across 6 countries: China, Myanmar, Laos, Thailand, Cambodia, and Vietnam.'
    }
  },
  {
    level: 'primary',
    question: {
      vi: 'Tại sao vùng châu thổ sông Mê Kông ở Việt Nam lại được gọi là "Đồng bằng sông Cửu Long"?',
      en: 'Why is the Mekong Delta in Vietnam called "Cuu Long" (Nine Dragons)?'
    },
    options: {
      vi: [
        'A. Vì có 9 ngọn núi cao bao bọc',
        'B. Vì sông đổ ra biển qua 9 cửa sông uốn lượn như 9 con rồng',
        'C. Vì có 9 loài cá khổng lồ sinh sống',
        'D. Vì sông dài 9 000 km'
      ],
      en: [
        'A. Because it is surrounded by 9 tall mountains',
        'B. Because the river empties into the sea through 9 mouths shaped like 9 dragons',
        'C. Because 9 giant fish species live there',
        'D. Because the river is 9,000 km long'
      ]
    },
    correctIndex: 1,
    explanation: {
      vi: 'Chính xác! Khi vào nước mình, sông chia ra 9 cửa đổ ra biển, tựa như 9 con rồng huyền thoại!',
      en: 'Exactly! When entering Vietnam, the river flows into the sea through 9 mouths resembling 9 mythical dragons!'
    }
  },

  // Secondary Quizzes
  {
    level: 'secondary',
    question: {
      vi: 'Hiện tượng đặc biệt nào diễn ra tại Biển Hồ (Tonle Sap) giúp điều hòa lũ cho ĐBSCL?',
      en: 'What unique phenomenon occurs at Tonle Sap Lake that regulates floods for the Mekong Delta?'
    },
    options: {
      vi: [
        'A. Nước hồ tự bốc hơi toàn bộ vào mùa lũ',
        'B. Dòng nước đổi chiều chảy ngược vào hồ mùa lũ và xả ra sông vào mùa khô',
        'C. Nước hồ đóng băng vào mùa đông',
        'D. Có đập nhân tạo lớn nhất thế giới đóng mở tự động'
      ],
      en: [
        'A. Lake water completely evaporates during flood season',
        'B. Water reverses flow into the lake during floods and discharges back during the dry season',
        'C. The lake freezes during winter',
        'D. The world\'s largest artificial dam operates automatically'
      ]
    },
    correctIndex: 1,
    explanation: {
      vi: 'Tuyệt vời! Cơ chế đổi chiều dòng chảy 2 lần/năm biến Biển Hồ thành bể điều hòa tự nhiên vô giá.',
      en: 'Great job! The twice-annual flow reversal makes Tonle Sap an invaluable natural regulating reservoir.'
    }
  },
  {
    level: 'secondary',
    question: {
      vi: 'Tuyến kênh xáng nổi tiếng gắn liền với FPT Hậu Giang, được đào từ năm 1901 là gì?',
      en: 'Which historic canal associated with FPT Hau Giang was excavated in 1901?'
    },
    options: {
      vi: ['A. Kênh Vĩnh Tế', 'B. Kênh Tháp Mười', 'C. Kênh xáng Xà No', 'D. Kênh Chợ Gạo'],
      en: ['A. Vinh Te Canal', 'B. Thap Muoi Canal', 'C. Xa No Canal', 'D. Cho Gao Canal']
    },
    correctIndex: 2,
    explanation: {
      vi: 'Chính xác! Kênh xáng Xà No là "Con đường lúa gạo huyền thoại của Nam Bộ" kế bên FPT Hậu Giang.',
      en: 'Spot on! The Xa No Canal is the celebrated historical "Rice Highway" located beside FPT Hau Giang.'
    }
  },

  // Highschool Quizzes
  {
    level: 'highschool',
    question: {
      vi: 'Hiệp định Hợp tác Phát triển Bền vững Lưu vực sông Mê Kông thành lập MRC được ký kết năm nào và ở đâu?',
      en: 'In which year and location was the Mekong Agreement establishing the MRC signed?'
    },
    options: {
      vi: [
        'A. Năm 1985 tại Hà Nội (Việt Nam)',
        'B. Ngày 5/4/1995 tại Chiang Rai (Thái Lan)',
        'C. Năm 2000 tại Viêng Chăn (Lào)',
        'D. Năm 2018 tại Siem Reap (Campuchia)'
      ],
      en: [
        'A. In 1985 in Hanoi (Vietnam)',
        'B. On April 5, 1995 in Chiang Rai (Thailand)',
        'C. In 2000 in Vientiane (Laos)',
        'D. In 2018 in Siem Reap (Cambodia)'
      ]
    },
    correctIndex: 1,
    explanation: {
      vi: 'Quá chuẩn! Hiệp định Mê Kông 1995 ký ngày 5/4/1995 tại Chiang Rai giữa 4 quốc gia hạ lưu.',
      en: 'Perfect! The 1995 Mekong Agreement was signed on April 5, 1995 in Chiang Rai among 4 lower basin countries.'
    }
  },
  {
    level: 'highschool',
    question: {
      vi: 'Trong 5 thủ tục kỹ thuật của MRC, quy trình PNPCA quy định thời gian tham vấn trước tối thiểu là bao lâu đối với các dự án trên dòng chính?',
      en: 'Under MRC procedures, what is the minimum Prior Consultation period under PNPCA for mainstream projects?'
    },
    options: {
      vi: ['A. 30 ngày', 'B. 3 tháng', 'C. Ít nhất 6 tháng', 'D. 2 năm'],
      en: ['A. 30 days', 'B. 3 months', 'C. At least 6 months', 'D. 2 years']
    },
    correctIndex: 2,
    explanation: {
      vi: 'Rất chính xác! Quy trình PNPCA yêu cầu tối thiểu 6 tháng tham vấn trước đối với các công trình trên dòng chính.',
      en: 'Exactly! The PNPCA procedure mandates at least 6 months of prior consultation for mainstream projects.'
    }
  },
  {
    level: 'highschool',
    question: {
      vi: 'Tư duy cốt lõi của Nghị quyết 120/NQ-CP của Chính phủ về phát triển bền vững ĐBSCL là gì?',
      en: 'What is the core philosophy of Government Resolution 120/NQ-CP for Mekong Delta sustainable development?'
    },
    options: {
      vi: [
        'A. Bằng mọi giá đắp đê ngăn toàn bộ nước biển mặn',
        'B. Phát triển "Thuận thiên", coi nước mặn và lợ là tài nguyên, tái cơ cấu Thủy sản - Trái cây - Lúa gạo',
        'C. Ngừng sản xuất nông nghiệp chuyển toàn bộ sang công nghiệp nặng',
        'D. Dẫn toàn bộ nước sông Mê Kông ra vịnh Thái Lan'
      ],
      en: [
        'A. Build dykes at all costs to block all saline seawater',
        'B. "Nature-based" adaptation, treating brackish/saline water as resources, reprioritizing Seafood - Fruit - Rice',
        'C. Stop agriculture and convert fully to heavy industries',
        'D. Divert all Mekong water to the Gulf of Thailand'
      ]
    },
    correctIndex: 1,
    explanation: {
      vi: 'Xuất sắc! Nghị quyết 120 lấy "Thuận thiên" làm kim chỉ nam, chuyển hóa thách thức thành cơ hội sinh thái.',
      en: 'Outstanding! Resolution 120 establishes "Nature-based" harmony as its beacon, turning challenges into ecological opportunities.'
    }
  }
];
