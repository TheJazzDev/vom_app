import { Spacer, SundayServiceTemplate, Tab, View } from '@/src/components';
import React, { useState } from 'react';

const data = {
  date: '17th August 2025',
  theme: 'More Than conquerors',
  topic: 'Living in Victory',
  lesson: 'Romans 8:23-39',
  callToWorship: '2 Cor 3:18',
  callToWorshipText:
    'SUGBON GBOGBO WA NWO OGO OLYWA LAISI IBOJU BI ENI PE NINU AWOJIJI, A SI N PA WA DA SI AWORAN KAN NAA LATI OGO DE OGO, ANI BI I LATI ODO OLUWA TI I SE EMI. NITORINA: EJE KI A FI OTITO OKAN SUMBO TOSI NI EKUN IGBAGBO, KI A SI WE OKAN WA MO KURO NINU ERI OKAN BUBURU KI A SI FI OMI MIMO WE ARA WAN NU. E JE KI A DI IJEWO IRETI WA MU SINSIN NI AISIYEMEJI; (NITORIPE OLOOTO NI ENI TI O SE ILERI) HEB 10:22-23',
  openingPrayer: [51, 19, 24],
  officiating: {
    lesson: 'Sis Osewunmi Adeolu',
    band: ['Holy Mary', 'John Beloved'],
    preacher: 'Prophet Kehinde Ogunleti',
    worshipLeader: 'Bro Taiwo Babarinde',
    intercessoryPrayer2: 'Bro Ajayi Olaode',
    workersPrayerLeader: 'Bro. Isaac Adeolu',
    prayerMinistration: 'Ald Bunmi Emmanuel',
    thanksgivingPrayer: 'Sis Sarah Babarinde',
    alternateWorshipLeader: 'Bro Isaac Adeolu',
    intercessoryPrayer3: 'Sis Shobowala Tosin',
    sundaySchoolTeacher: 'Bro. Taiwo Babarinde',
    intercessoryPrayer1: 'Sis Aduni Olaonipekun',
    ministers: ['Bro Isaac Adeolu', 'Bro Olusola Olaseni'],
  },
  hynms: {
    processional: 'K&S YHB 126 "Olorun alaiopin iwo"',
    introit: 'K&S YHB XLII "Baba mimo jowo ade o o"',
    opening: 'K&S YHB 250 "JESU, jo ranti mi"',
    thanksgiving: ['K&S YHB 126 "Olorun ailopin iwo"'],
    sermon: 'K&S YHB XLII "Baba mimo jowo ade o o"',
    vesper: 'K&S YHB XLII "Baba mimo jowo ade o o"',
    recessional: 'K&S YHB XLII "Baba mimo jowo ade o o"',
  },
};

export default function Programme() {
  const [section, setSection] = useState<ServiceSections>('Current');

  return (
    <View safe>
      <Tab<ServiceSections>
        value={section}
        onChange={setSection}
        variant='underline'
        background='transparent'
        tabs={[
          { label: 'Current', value: 'Current' },
          { label: 'Upcoming', value: 'Upcoming' },
          { label: 'Past', value: 'Past' },
        ]}
      />
      {section === 'Current' && <SundayServiceTemplate data={data} />}
      <Spacer height={12} />
    </View>
  );
}
