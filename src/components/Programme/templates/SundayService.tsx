import Spacer from '../../Spacer';
import { Card, Divider, Text, View } from '../../UI';
import { InfoRow } from '../components/InfoRow';
import { OfficiatingCard } from '../components/OfficiatingCard';
import { Section } from '../components/Section';
import { TopSectionHierarchical } from '../components/TopHeader';

// Helper function to format psalm numbers
function formatPsalmList(arr: number[]) {
  if (!arr || arr.length === 0) return 'None';
  if (arr.length === 1) return arr[0].toString();
  return arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1];
}

// Helper component for better officiating grid
const OfficiatingGrid = ({
  data,
}: {
  data: SundayProgramme['officiating'];
}) => {
  const officiatingRoles = [
    { label: 'Worship Leader', value: data?.worshipLeader, span: 1 },
    {
      label: 'Alt Worship Leader',
      value: data?.alternateWorshipLeader,
      span: 1,
    },
    { label: 'Preacher', value: data?.preacher, span: 1 },
    { label: 'Prayer Ministration', value: data?.prayerMinistration, span: 1 },
    { label: 'Band Members', value: data?.band?.join(', ') || 'TBA', span: 2 },
    {
      label: 'Ministers',
      value: data?.ministers?.join(', ') || 'TBA',
      span: 2,
    },
  ];

  return (
    <View className="flex-row flex-wrap gap-x-2">
      {officiatingRoles.map((role, index) => (
        <OfficiatingCard
          key={role.label}
          className={role.span === 2 ? 'w-full' : 'flex-1 min-w-[45%]'}
          label={role.label}
          value={role.value}
        />
      ))}
    </View>
  );
};

// Component for prayer sections with better structure
const PrayerSection = ({
  title,
  items,
  leader,
}: {
  title: string;
  items: string[];
  leader?: string;
}) => (
  <View className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg">
    <Text variant="subtitle1" className="mb-2 text-gray-900 dark:text-gray-100">
      {title}
    </Text>
    {items.map((item, index) => (
      <View key={index} className="flex-row mb-2">
        <Text variant="body" className="text-gray-700 dark:text-gray-300 ml-2">
          ({String.fromCharCode(97 + index)}) {item}
        </Text>
      </View>
    ))}
    {leader && (
      <Text
        variant="caption"
        className="italic mt-2 text-gray-600 dark:text-gray-400 text-right"
      >
        Seal - {leader}
      </Text>
    )}
  </View>
);

// Component for hymn lists with better formatting
const HymnList = ({
  hymns,
  title,
}: {
  hymns: string | string[];
  title: string;
}) => {
  const hymnArray = Array.isArray(hymns) ? hymns : [hymns];

  return (
    <View className="flex-row gap-4">
      <Text
        variant="body"
        className="text-gray-900 dark:text-gray-100 min-w-[120px]"
      >
        {title}:
      </Text>
      <View className="flex-1">
        {hymnArray.map((hymn, index) => (
          <Text
            key={index}
            variant="body"
            className="text-gray-700 dark:text-gray-300"
          >
            {hymnArray.length > 1
              ? `(${String.fromCharCode(97 + index)}) `
              : ''}
            {hymn}
          </Text>
        ))}
      </View>
    </View>
  );
};

// Enhanced time slot component
const TimeSlot = ({
  time,
  title,
  leader,
}: {
  time: string;
  title: string;
  leader?: string;
}) => (
  <Card className="p-3 mb-2 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
    <View className="flex-row justify-between items-center">
      <View>
        <Text variant="subtitle2" className="text-blue-900 dark:text-blue-100">
          {title}
        </Text>
        {leader && (
          <Text variant="caption" className="text-blue-700 dark:text-blue-300">
            Led by: {leader}
          </Text>
        )}
      </View>
      <Text
        variant="caption"
        className="text-blue-600 dark:text-blue-400 font-mono"
      >
        {time}
      </Text>
    </View>
  </Card>
);

export function SundayServiceTemplate({ data }: { data: SundayProgramme }) {
  const openingPrayerItems = [
    'Repentance & Forgiveness of Sins',
    'Sanctification',
    'Descent of the Heavenly Hosts',
    "The Lord's Prayer",
  ];

  const intercessoryPrayerSections = [
    {
      title: 'Prayer for Power of Holy Spirit, Mercy, Blessing and Provision',
      leader: data?.officiating?.intercessoryPrayer1,
    },
    {
      title: 'Protection, Steadfastness and Success',
      leader: data?.officiating?.intercessoryPrayer2,
    },
    {
      title:
        'Prayer for Church Workers, Elders of C&S Church, Leader of the Church',
      leader: data?.officiating?.intercessoryPrayer3,
    },
  ];

  return (
    <View gradient scrollable>
      <View className="px-2">
        <Spacer height={10} />
        <TopSectionHierarchical data={data} />
        <Spacer height={10} />
        <View className="mb-6">
          <Text variant="h4" color="heading" className="mb-3">
            Officiating
          </Text>
          <OfficiatingGrid data={data?.officiating} />
        </View>

        {/* Pre-Service Activities */}
        <Section title="Pre-Service Activities">
          <TimeSlot
            time="7:00 AM - 7:30 AM"
            title="Worker's Prayer"
            leader={data?.officiating?.workersPrayerLeader}
          />
          <TimeSlot
            time="7:30 AM - 8:30 AM"
            title="Bible Study"
            leader={data?.officiating?.sundaySchoolTeacher}
          />
        </Section>

        {/* Opening Section */}
        <Section title="A. Opening">
          <View className="space-y-3">
            <InfoRow
              label="1. Processional Hymn"
              value={data?.hymns?.processional}
            />
            <InfoRow label="2. Introit" value={data?.hymns?.introit} />
            <InfoRow label="3. Call to Worship" value={data?.callToWorship} />

            {data?.callToWorshipText && (
              <Card className="p-4 bg-amber-50 dark:bg-amber-900/20">
                <Text
                  variant="body"
                  className="text-amber-900 dark:text-amber-100 italic"
                >
                  &quot;{data?.callToWorshipText}&quot;
                </Text>
              </Card>
            )}

            <InfoRow label="4. Opening Hymn" value={data?.hymns?.opening} />
            <InfoRow
              label="5. Opening Prayer"
              value={`Psalms ${formatPsalmList(data?.openingPrayer)}`}
            />

            <PrayerSection
              title="Prayer Focus Areas"
              items={openingPrayerItems}
              leader="The Worship Leader"
            />
          </View>
        </Section>

        {/* Appreciation & Thanksgiving */}
        <Section title="B. Appreciation, Thanksgiving & Testimonies">
          <View className="space-y-3">
            <HymnList
              hymns={data?.hymns?.thanksgiving}
              title="6. Thanksgiving Hymn"
            />
            <InfoRow label="7. Praise & Worship" value="Choir" />
            <InfoRow
              label="8. Thanksgiving Prayer"
              value={data?.officiating?.thanksgivingPrayer}
            />

            <View className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <Text variant="body" className="text-gray-900 dark:text-gray-100">
                9. Thanksgiving / Testimonies / Vow
              </Text>
              <Text variant="body" className="text-gray-900 dark:text-gray-100">
                10. Collection of Thanksgiving Offering
              </Text>
            </View>
          </View>
        </Section>

        {/* The Word */}
        <Section title="C. The Word / Apostles' Creed">
          <View className="space-y-3">
            <InfoRow label="11. Lesson" value={data?.officiating?.lesson} />
            <InfoRow
              label="12. Gloria"
              value="Choir to lead the Congregation"
            />
            <InfoRow label="13. Apostles Creed" value="Church Minister" />
          </View>
        </Section>

        {/* Intercessory Prayer */}
        <Section title="D. Intercessory Prayer">
          <Text
            variant="subtitle1"
            className="mb-3 text-gray-900 dark:text-gray-100"
          >
            14. Prayer Sections
          </Text>
          <View className="space-y-3">
            {intercessoryPrayerSections.map((section, index) => (
              <Card
                key={index}
                className="p-4 bg-purple-50 dark:bg-purple-900/20"
              >
                <Text
                  variant="body"
                  className="text-purple-900 dark:text-purple-100 mb-2"
                >
                  ({String.fromCharCode(97 + index)}) {section.title}
                </Text>
                <Text
                  variant="caption"
                  className="text-purple-700 dark:text-purple-300 italic"
                >
                  Led by: {section.leader}
                </Text>
              </Card>
            ))}
            <Text
              variant="caption"
              className="italic text-gray-600 dark:text-gray-400 text-right"
            >
              Seal - The Worship Leader
            </Text>
          </View>
        </Section>

        {/* Announcements */}
        <Section title="E. Announcement / First Timer">
          <View className="space-y-2">
            <InfoRow label="15. Announcement" value="Church Secretary" />
            <InfoRow
              label="16. Welcoming First Timer"
              value="Church Secretary"
            />
            <InfoRow label="17. Building Offering" value="" />
          </View>
        </Section>

        {/* Sermon */}
        <Section title="F. Sermon / Prayer Ministration">
          <View className="space-y-3">
            <InfoRow label="18. Hymn for Sermon" value={data?.hymns?.sermon} />
            <InfoRow
              label="19. Sermonist"
              value={data?.officiating?.preacher}
            />
            <InfoRow
              label="20. Prayer Ministration/Offering"
              value={data?.officiating?.prayerMinistration}
            />
          </View>
        </Section>

        {/* Closing */}
        <Section title="G. Closing">
          <View className="space-y-2">
            <InfoRow label="21. Closing Prayer" value="Worship Leader" />
            <InfoRow label="22. Vesper" value={data?.hymns?.vesper} />
            <InfoRow label="23. Grace" value="Leader-In-Charge" />
            <InfoRow
              label="24. Recessional Hymn"
              value={data?.hymns?.recessional}
            />
          </View>
        </Section>

        <Spacer height={20} />
        <Divider type="horizontal" height={2} className="mb-6" />

        <Card variant="gradient-soft" className="p-6">
          <Text variant="h2" className="text-center font-bold">
            AYO NI O
          </Text>
        </Card>

        <Spacer height={40} />
      </View>
    </View>
  );
}
