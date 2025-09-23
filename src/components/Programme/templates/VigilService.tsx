import Spacer from '../../Spacer';
import { Card, Divider, Text, View } from '../../UI';
import { Section } from '../components/Section';
import { TopSectionCompactGrid } from '../components/TopHeader';

// Helper function to format psalm numbers
function formatPsalmList(arr: number[]) {
  if (!arr || arr.length === 0) return 'None';
  if (arr.length === 1) return arr[0].toString();
  return arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1];
}

// Enhanced officiating grid for Vigil
const VigilOfficiatingGrid = ({
  data,
}: {
  data: VigilProgramme['officiating'];
}) => {
  const officiatingRoles = [
    {
      label: 'Worship Leader',
      value: data?.worshipLeader,
      color: 'bg-slate-50 dark:bg-slate-800',
    },
    {
      label: 'Preacher',
      value: data?.preacher,
      color: 'bg-slate-50 dark:bg-slate-800',
    },
    {
      label: 'Prayer Ministration',
      value: data?.prayerMinistration,
      color: 'bg-slate-50 dark:bg-slate-800',
    },
    {
      label: 'Lesson Leader',
      value: data?.lesson,
      color: 'bg-slate-50 dark:bg-slate-800',
    },
  ];

  return (
    <View className="flex-row flex-wrap gap-x-3 text-center">
      {officiatingRoles.map((role) => (
        <View key={role.label} className="flex-1 min-w-[45%]">
          <Card className={`px-4 py-2 ${role.color}`}>
            <Text
              variant="caption"
              className="text-gray-600 dark:text-gray-400 mb-1 text-center"
            >
              {role.label}
            </Text>
            <Text
              variant="subtitle1"
              className="text-gray-900 dark:text-gray-100 text-center"
            >
              {role.value || 'TBA'}
            </Text>
          </Card>
        </View>
      ))}
    </View>
  );
};

// Prayer section component
const PrayerSection = ({
  title,
  items,
  leader,
}: {
  title: string;
  items: string[];
  leader?: string;
}) => (
  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
    <Text variant="subtitle1" className="mb-3 text-blue-900 dark:text-blue-100">
      {title}
    </Text>
    {items.map((item, index) => (
      <View key={index} className="flex-row mb-2">
        <Text variant="body" className="text-blue-800 dark:text-blue-200">
          ({String.fromCharCode(97 + index)}) {item}
        </Text>
      </View>
    ))}
    {leader && (
      <Text
        variant="caption"
        className="italic mt-3 text-blue-700 dark:text-blue-300 text-right"
      >
        Seal - {leader}
      </Text>
    )}
  </Card>
);

// Enhanced activity component for Vigil
const VigilActivity = ({
  number,
  title,
  value,
  sectionColor = 'gray',
}: {
  number: string;
  title: string;
  value?: string;
  sectionColor?: 'blue' | 'green' | 'purple' | 'indigo' | 'gray' | 'amber';
}) => {
  const getColorClass = () => {
    switch (sectionColor) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700';
      case 'indigo':
        return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700';
      case 'amber':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600';
    }
  };

  return (
    <View className={`p-3 rounded-lg border ${getColorClass()} mb-2`}>
      <View className="flex-row justify-between items-center">
        <Text
          variant="body"
          className="text-gray-900 dark:text-gray-100 flex-1"
        >
          {number}. {title}
        </Text>
        {value && (
          <Text
            variant="subtitle2"
            className="text-gray-700 dark:text-gray-300 ml-2"
          >
            {value}
          </Text>
        )}
      </View>
    </View>
  );
};

export function VigilServiceTemplate({ data }: { data: VigilProgramme }) {
  const openingPrayerItems = [
    'Repentance & Forgiveness of Sins',
    'Sanctification',
    'Descent of the Heavenly Hosts',
    "The Lord's Prayer",
  ];

  return (
    <View gradient scrollable paddingHorizontal={8}>
      <Spacer height={8} />
      <TopSectionCompactGrid data={data} />
      <Spacer height={16} />

      <View className="px-2">
        <View className="mb-6">
          <Text variant="h4" color="heading" className="mb-3 text-center">
            Officiating
          </Text>
          <VigilOfficiatingGrid data={data?.officiating} />
        </View>
        {/* Opening Section - Blue Theme */}
        <Section title="A. Opening">
          <View className="space-y-3">
            <VigilActivity
              number="1"
              title="Opening Hymn"
              value={data?.hymns?.opening}
              sectionColor="blue"
            />
            <VigilActivity
              number="2"
              title="Opening Prayer"
              value={`Psalms ${formatPsalmList(data?.openingPrayer)}`}
              sectionColor="blue"
            />

            <PrayerSection
              title="Prayer Focus Areas"
              items={openingPrayerItems}
              leader="The Worship Leader"
            />
          </View>
        </Section>

        {/* Appreciation & Thanksgiving - Green Theme */}
        <Section title="B. Appreciation, Thanksgiving & Testimonies">
          <View className="space-y-3">
            <VigilActivity
              number="3"
              title="Thanksgiving Hymn"
              value={data?.hymns?.thanksgiving}
              sectionColor="green"
            />
            <VigilActivity
              number="4"
              title="Praise & Worship"
              value="Choir"
              sectionColor="green"
            />

            <Card className="p-4 bg-green-50 dark:bg-green-900/20">
              <Text
                variant="body"
                className="text-green-900 dark:text-green-100 mb-2"
              >
                5. Thanksgiving / Testimonies / Vow
              </Text>
              <Text
                variant="body"
                className="text-green-900 dark:text-green-100"
              >
                6. Collection of Thanksgiving Offering
              </Text>
            </Card>
          </View>
        </Section>

        {/* The Word & Apostles' Creed - Purple Theme */}
        <Section title="C. The Word / Apostles' Creed">
          <View className="space-y-3">
            <VigilActivity
              number="7"
              title="Lesson"
              value={data?.officiating.lesson}
              sectionColor="purple"
            />
            <VigilActivity
              number="8"
              title="Gloria"
              value="Choir to lead the Congregation"
              sectionColor="purple"
            />
            <VigilActivity
              number="9"
              title="Apostles' Creed"
              value="Church Minister"
              sectionColor="purple"
            />
          </View>
        </Section>

        {/* Intercessory Prayer - Indigo Theme */}
        <Section title="D. Intercessory Prayer">
          <Card className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500">
            <Text
              variant="subtitle1"
              className="text-indigo-900 dark:text-indigo-100 mb-3"
            >
              Night Watch Prayer Session
            </Text>
            <View className="space-y-2">
              <VigilActivity
                number="10"
                title="Prayer for the Church"
                sectionColor="indigo"
              />
              <VigilActivity
                number="11"
                title="Prayer for the Nation"
                sectionColor="indigo"
              />
              <VigilActivity
                number="12"
                title="Personal Intercession"
                sectionColor="indigo"
              />
            </View>
          </Card>
        </Section>

        {/* Announcements - Gray Theme */}
        <Section title="E. Announcement / First Timer">
          <View className="space-y-3">
            <VigilActivity
              number="13"
              title="Announcement"
              value="Church Secretary"
              sectionColor="gray"
            />
            <VigilActivity
              number="14"
              title="Welcoming First Timer"
              value="Church Secretary"
              sectionColor="gray"
            />
          </View>
        </Section>

        {/* Sermon & Prayer Ministration - Amber Theme */}
        <Section title="F. Sermon / Prayer Ministration">
          <View className="space-y-3">
            <VigilActivity
              number="15"
              title="Hymn for Sermon"
              value={data?.hymns?.sermon}
              sectionColor="amber"
            />
            <VigilActivity
              number="16"
              title="Sermonist"
              value={data?.officiating.preacher}
              sectionColor="amber"
            />
            <VigilActivity
              number="17"
              title="Prayer Ministration/Offering"
              value={data?.officiating.prayerMinistration}
              sectionColor="amber"
            />
          </View>
        </Section>

        {/* Prayer Hymn Section - Purple Theme */}
        <Section title="G. Prayer Hymn">
          <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500">
            <VigilActivity
              number="18"
              title="Prayer Hymn"
              value={data?.hymns?.prayer}
              sectionColor="purple"
            />
            <Text
              variant="caption"
              className="text-purple-700 dark:text-purple-300 italic mt-2"
            >
              Special prayer session with hymn meditation
            </Text>
          </Card>
        </Section>

        {/* Closing - Gray Theme */}
        <Section title="H. Closing">
          <View className="space-y-3">
            <VigilActivity
              number="19"
              title="Closing Prayer"
              value="Worship Leader"
              sectionColor="gray"
            />
            <VigilActivity
              number="20"
              title="Grace"
              value="Leader-In-Charge"
              sectionColor="gray"
            />
          </View>
        </Section>

        <Spacer height={20} />
        <Divider type="horizontal" height={2} className="mb-6" />

        <Card
          variant="gradient-soft"
          className="p-6 bg-gradient-to-r from-indigo-600 to-purple-700"
        >
          <Text variant="h2" className="text-center font-bold">
            AYO NI O
          </Text>
        </Card>

        <Spacer height={40} />
      </View>
    </View>
  );
}
