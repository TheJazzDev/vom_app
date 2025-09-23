import Spacer from '../../Spacer';
import { Card, Text, View } from '../../UI';
import { Section } from '../components/Section';
import { TopSectionModernCard } from '../components/TopHeader';

// Helper function to format psalm numbers
function formatPsalmList(arr: number[]) {
  if (!arr || arr.length === 0) return 'None';
  if (arr.length === 1) return arr[0].toString();
  return arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1];
}

// Enhanced officiating grid for Shiloh
const ShilohOfficiatingGrid = ({
  data,
}: {
  data: ShilohProgramme['officiating'];
}) => {
  const officiatingRoles = [
    {
      label: 'Worship Leader',
      value: data.worshipLeader,
      color: 'bg-blue-100 dark:bg-blue-800/20',
    },
    {
      label: 'Prayer Ministration',
      value: data.prayerMinistration,
      color: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      label: 'Preacher',
      value: data.preacher,
      color: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Revivalist',
      value: data.revivalist,
      color: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      label: 'Lesson Leader',
      value: data.lesson,
      color: 'bg-indigo-50 dark:bg-indigo-800',
    },
    {
      label: 'Preparatory Prayer',
      value: data.preparatoryPrayer,
      color: 'bg-orange-50 dark:bg-orange-800',
    },
  ];

  return (
    <View className="flex-row flex-wrap">
      {officiatingRoles.map((role) => (
        <View key={role.label} className="flex-1 min-w-[45%]">
          <View className={`px-4 py-2 ${role.color}`}>
            <Text
              variant="caption"
              className="text-gray-600 dark:text-gray-400 mb-1"
            >
              {role.label}
            </Text>
            <Text
              variant="subtitle1"
              className="text-gray-900 dark:text-gray-100"
            >
              {role.value || 'TBA'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Prayer section component for better structure
const PrayerSection = ({
  title,
  items,
  leader,
}: {
  title: string;
  items: string[];
  leader?: string;
}) => (
  <Card className="p-4 bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500">
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

// Enhanced section for Shiloh-specific activities
const ShilohActivity = ({
  number,
  title,
  value,
  sectionColor = 'gray',
}: {
  number: string;
  title: string;
  value?: string;
  sectionColor?:
    | 'blue'
    | 'cyan'
    | 'green'
    | 'purple'
    | 'amber'
    | 'indigo'
    | 'orange'
    | 'gray';
}) => {
  const getColorClass = () => {
    switch (sectionColor) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700';
      case 'amber':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700';
      case 'indigo':
        return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700';
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

export function ShiloServiceTemplate({ data }: { data: ShilohProgramme }) {
  const openingPrayerItems = [
    'Repentance & Forgiveness of Sins',
    'Sanctification',
    'Descent of the Heavenly Hosts',
    "The Lord's Prayer",
  ];

  return (
    <View gradient scrollable>
      <View className="px-2">
        <Spacer height={16} />

        {/* Header */}
        <TopSectionModernCard data={data} />
        <Spacer height={6} />

        {/* Officiating Section */}
        <View className="mb-6">
          <Text variant="h4" color="heading" className="mb-3">
            Officiating
          </Text>
          <ShilohOfficiatingGrid data={data.officiating} />
        </View>

        {/* Opening Section */}
        <Section title="A. Opening">
          <View className="space-y-3">
            <ShilohActivity
              number="1"
              title="Preparatory Prayer"
              value={data.officiating.preparatoryPrayer}
              sectionColor="blue"
            />
            <ShilohActivity
              number="2"
              title="Opening Hymn"
              value={data.hymns.opening}
              sectionColor="blue"
            />
            <ShilohActivity
              number="3"
              title="Opening Prayer"
              value={`Psalms ${formatPsalmList(data.openingPrayer)}`}
              sectionColor="blue"
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
            <ShilohActivity
              number="4"
              title="Thanksgiving Hymn"
              value={data.hymns.thanksgiving}
              sectionColor="green"
            />
            <ShilohActivity
              number="5"
              title="Praise & Worship"
              value="Choir"
              sectionColor="green"
            />

            <Card className="p-4 bg-green-100 dark:bg-green-900/30">
              <Text
                variant="body"
                className="text-green-900 dark:text-green-100 mb-2"
              >
                6. Thanksgiving Prayer
              </Text>
              <Text
                variant="body"
                className="text-green-900 dark:text-green-100"
              >
                7. Testimonies / Vow
              </Text>
            </Card>
          </View>
        </Section>

        {/* The Word */}
        <Section title="C. The Word">
          <View className="space-y-3">
            <ShilohActivity
              number="8"
              title="Lesson"
              value={data.officiating.lesson}
              sectionColor="purple"
            />
            <ShilohActivity
              number="9"
              title="Gloria"
              value="Choir to lead the Congregation"
              sectionColor="purple"
            />
          </View>
        </Section>

        {/* Prayer Ministration */}
        <Section title="D. Prayer Ministration">
          <View className="space-y-3">
            <ShilohActivity
              number="10"
              title="Hymn for Prayer"
              value={data.hymns.prayer}
              sectionColor="indigo"
            />
            <ShilohActivity
              number="11"
              title="Prayer Ministration"
              value={data.officiating.prayerMinistration}
              sectionColor="indigo"
            />
          </View>
        </Section>

        {/* Announcements */}
        <Section title="E. Announcement / First Timer">
          <View className="space-y-3">
            <ShilohActivity
              number="12"
              title="Announcement"
              value="Church Secretary"
              sectionColor="cyan"
            />
            <ShilohActivity
              number="13"
              title="Welcoming First Timer"
              value="Church Secretary"
              sectionColor="cyan"
            />
          </View>
        </Section>

        {/* Sermon */}
        <Section title="F. Sermon">
          <View className="space-y-3">
            <ShilohActivity
              number="14"
              title="Hymn for Sermon"
              value={data.hymns.sermon}
              sectionColor="amber"
            />
            <ShilohActivity
              number="15"
              title="Sermonist"
              value={data.officiating.preacher}
              sectionColor="amber"
            />
          </View>
        </Section>

        {/* Revival - Special Shiloh Section */}
        <Section title="G. Revival">
          <Card className="p-4 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-l-4 border-orange-500">
            <Text
              variant="subtitle1"
              className="mb-3 text-orange-900 dark:text-orange-100"
            >
              Revival Session
            </Text>
            <View className="space-y-2">
              <ShilohActivity
                number="16"
                title="Hymn for Revival"
                value={data.hymns.sermon}
                sectionColor="orange"
              />
              <ShilohActivity
                number="17"
                title="Revivalist"
                value={data.officiating.revivalist}
                sectionColor="orange"
              />
              <ShilohActivity
                number="18"
                title="Prophetic Utterance"
                value="Prophet/ess"
                sectionColor="orange"
              />
            </View>
          </Card>
        </Section>

        {/* Closing */}
        <Section title="H. Closing">
          <View className="space-y-3">
            <ShilohActivity
              number="19"
              title="Closing Prayer"
              value="Leader-In-Charge"
            />
            <ShilohActivity
              number="20"
              title="Grace"
              value="Leader-In-Charge"
            />
          </View>
        </Section>

        <Spacer height={20} />
        {/* <Divider type="horizontal" height={2} className="mb-6" /> */}

        <Card
          variant="gradient-ocean"
          className="p-6 bg-gradient-to-r from-orange-500 to-red-600"
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
