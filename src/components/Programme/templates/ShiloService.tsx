import { ScrollView } from 'react-native';
import Spacer from '../../Spacer';
import { Divider, Text, View } from '../../UI';
import { InfoRow } from '../components/InfoRow';
import { OfficiatingCard } from '../components/OfficiatingCard';
import { Section } from '../components/Section';
import { TopSectionModernCard } from '../components/SundayTopHeader';

function formatList(arr: number[]) {
  if (!arr || arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1];
}

export function ShiloServiceTemplate({ data }: { data: ShiloProgramme }) {
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
      {/* Header */}
      <TopSectionModernCard data={data} />

      {/* Officiating Section */}
      <View className="flex-row justify-between flex-wrap">
        <OfficiatingCard
          className="w-[49%]"
          label="Worship Leader"
          value={data.officiating.worshipLeader}
        />
        <OfficiatingCard
          className="w-[49%]"
          label="Prayer Ministration"
          value={data.officiating.prayerMinistration}
        />
        <OfficiatingCard
          className="w-[49%]"
          label="Preacher"
          value={data.officiating.preacher}
        />
        <OfficiatingCard
          className="w-[49%]"
          label="Revivalist"
          value={data.officiating.revivalist}
        />
      </View>

      <Spacer height={6} />

      <Section title="A.  OPENING">
        <InfoRow
          label="1.  Preparatory Prayer"
          value={data.officiating.preparatoryPrayer}
        />
        <InfoRow label="2.  Opening Hynm" value={data.hynms.opening} />
        <InfoRow
          label="3.  Opening Prayer"
          value={`PSALMS ${formatList(data.openingPrayer)}`}
        />
        <View className="flex-row gap-4 ml-8">
          <Text variant="h6">Prayer for:</Text>
          <View>
            <Text variant="h6">(a){'   '}Repentance & Forgiveness of Sins</Text>
            <Text variant="h6">(b){'   '}Sanctification</Text>
            <Text variant="h6">(c){'   '}Descent of the Heavenly Hosts</Text>
            <Text variant="h6">(d){'   '}The Lord&apos;s Prayer</Text>
            <Text variant="overline" className="ml-9 italic">
              Seal - The Worshhip Leader
            </Text>
          </View>
        </View>
      </Section>

      <Section title="B.  APPRECIATION, THANKSGIVING & TESTIMONIES">
        <InfoRow
          label="4.  Thanksgiving hynm"
          value={data.hynms.thanksgiving}
        />
        <InfoRow label="5.  Praise & Worship" value="Choir" />

        <Text variant="h6">6. Thanksgiving Prayer</Text>
        <Text variant="h6">7. Testimonies / Vow</Text>
      </Section>

      <Section title="C.  THE WORD">
        <InfoRow name label="8.  Leson" value={data.officiating.lesson} />
        <InfoRow label="9.  Gloria" value="Choir to lead the Congregation" />
      </Section>

      <Section title="D.  PRAYER MINISTRATION">
        <InfoRow name label="8.  Hynm for Prayer" value={data.hynms.prayer} />
        <InfoRow
          label="9.  Prayer"
          value={data.officiating.prayerMinistration}
        />
      </Section>

      <Section title="E.  ANNOUNCEMENT / FIRST TIMER">
        <InfoRow label="10.  Announcement" value="Church Secetary" />
        <InfoRow label="11.  Welcoming First Timer" value="Church Secetary" />
      </Section>

      <Section title="F.  SERMON">
        <InfoRow label="12.  Hymn for Sermon" value={data.hynms.sermon} />
        <InfoRow label="13.  Sermonist" value={data.officiating.preacher} />
      </Section>

      <Section title="G.  RIVIVAL">
        <InfoRow label="14.  Hymn for Revival" value={data.hynms.sermon} />
        <InfoRow label="15.  Revivalist" value={data.officiating.revivalist} />
        <InfoRow label="26.  Prophetic utterance" value="Prophet/tess" />
      </Section>

      <Section title="H.  CLOSING">
        <InfoRow label="27.  Closing Prayer" value="Leader-In-Charger" />
        <InfoRow label="28.  Grace" value="Leader-In-Charge" />
      </Section>

      <Divider type="horizontal" height={2} className="mb-6" />
      <Text variant="h2" className="text-center mb-4">
        AYO NI O
      </Text>
      <Spacer height={60} />
    </ScrollView>
  );
}
