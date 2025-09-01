import { Text, View } from '../../UI';
import { InfoRow } from '../components/InfoRow';

// Option 1: Card-style with Border and Background
export function TopSectionCardStyle({ data }: { data: any }) {
  return (
    <View
      className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 my-2"
      id="top-section"
    >
      <View className="border-b border-gray-300 pb-2 mb-3">
        <Text
          variant="h4"
          color="heading"
          className="text-center tracking-widest font-bold"
        >
          SUNDAY SERVICE PROGRAMME
        </Text>
      </View>
      <View className="flex-row justify-between items-center mb-2">
        <Text variant="body" className="font-semibold">
          Date:
        </Text>
        <Text variant="body">{data.date}</Text>
      </View>
      <View className="bg-white rounded p-3 mb-2">
        <InfoRow label="Theme" variant="h5" value={data.theme} />
      </View>
      <View className="bg-white rounded p-3 mb-2">
        <InfoRow label="Topic" variant="h6" value={data.topic} />
      </View>
      <View className="bg-white rounded p-3">
        <InfoRow label="Lesson" variant="body" value={data.lesson} />
      </View>
    </View>
  );
}

// Option 2: Two-Column Layout
export function TopSectionTwoColumn({ data }: { data: any }) {
  return (
    <View className="my-2" id="top-section">
      <Text
        variant="h4"
        color="heading"
        className="text-center tracking-widest mb-4"
      >
        SUNDAY SERVICE PROGRAMME
      </Text>
      <View className="flex-row gap-4">
        <View className="flex-1 bg-blue-50 rounded-lg p-3">
          <InfoRow label="Date" value={data.date} />
          <InfoRow label="Theme" variant="h5" value={data.theme} />
        </View>
        <View className="flex-1 bg-green-50 rounded-lg p-3">
          <InfoRow label="Topic" variant="h6" value={data.topic} />
          <InfoRow label="Lesson" variant="body" value={data.lesson} />
        </View>
      </View>
    </View>
  );
}

// Option 3: Hierarchical with Visual Separation
export function TopSectionHierarchical({ data }: { data: any }) {
  return (
    <View className="mt-2 mb-5" id="top-section">
      <View className="text-center mb-4">
        <Text
          variant="h4"
          color="heading"
          className="text-center tracking-[0.2em] mb-1 uppercase"
        >
          {data.type} SERVICE PROGRAMME
        </Text>
        <View className="w-20 h-1 bg-blue-500 mx-auto mt-2"></View>
      </View>
      <View className="border-l-4 border-cyan-400 pl-4 mb-1">
        <InfoRow variant="h6" label="Date" value={data.date} />
      </View>
      <View className="border-l-4 border-blue-500 pl-4 mb-1">
        <InfoRow label="Theme" variant="h6" value={data.theme} />
      </View>
      <View className="border-l-4 border-green-500 pl-4 mb-1">
        <InfoRow label="Topic" variant="h6" value={data.topic} />
      </View>
      <View className="border-l-4 border-orange-500 pl-4">
        <InfoRow label="Lesson" variant="h6" value={data.lesson} />
      </View>
    </View>
  );
}

// Option 4: Compact Grid Layout
export function TopSectionCompactGrid({ data }: { data: any }) {
  return (
    <View
      className="border border-gray-300 rounded-lg p-3 my-2"
      id="top-section"
    >
      <Text
        variant="h4"
        color="heading"
        className="text-center tracking-widest mb-3"
      >
        SUNDAY SERVICE PROGRAMME
      </Text>
      <View className="flex-col gap-2">
        <View className="bg-gray-100 p-2 rounded">
          <InfoRow className="text-center" label="Date" value={data.date} />
        </View>
        <View className="flex-row gap-2">
          <View className="flex-1 bg-blue-100 p-2 rounded">
            <Text className="text-xs font-semibold text-gray-600">THEME</Text>
            <Text variant="h6">{data.theme}</Text>
          </View>
          <View className="flex-1 bg-green-100 p-2 rounded">
            <Text className="text-xs font-semibold text-gray-600">TOPIC</Text>
            <Text variant="body">{data.topic}</Text>
          </View>
        </View>
        <View className="bg-yellow-100 p-2 rounded">
          <Text className="text-xs font-semibold text-gray-600">LESSON</Text>
          <Text variant="body">{data.lesson}</Text>
        </View>
      </View>
    </View>
  );
}

// Option 5: Modern Card with Shadow
export function TopSectionModernCard({ data }: { data: any }) {
  return (
    <View
      className="bg-white/80 dark:bg-black/20 rounded-xl shadow-lg p-4 mb-6"
      id="top-section"
    >
      <Text
        variant="h4"
        color="heading"
        className="tracking-widest font-bold uppercase text-center"
      >
        {data.type} SERVICE PROGRAMME
      </Text>
      <Text variant="body2" className="text-gray-500 mt-1 mb-3 text-center">
        {data.date}
      </Text>

      <View className="gap-3">
        <View className="flex-row items-start">
          <View className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase">
              Theme
            </Text>
            <Text variant="h5">{data.theme}</Text>
          </View>
        </View>

        <View className="flex-row items-start">
          <View className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase">
              Topic
            </Text>
            <Text variant="h6">{data.topic}</Text>
          </View>
        </View>

        <View className="flex-row items-start">
          <View className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></View>
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase">
              Lesson
            </Text>
            <Text variant="body">{data.lesson}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Option 6: Minimalist with Typography Focus
export function TopSectionMinimalist({ data }: { data: any }) {
  return (
    <View className="my-4 px-2" id="top-section">
      <Text
        variant="h3"
        className="text-center font-light tracking-[0.2em] mb-1"
      >
        SUNDAY SERVICE
      </Text>
      <Text
        variant="h6"
        className="text-center font-light tracking-[0.1em] text-gray-600 mb-4"
      >
        PROGRAMME
      </Text>

      <Text variant="h6" className="text-center mb-6 font-medium">
        {data.date}
      </Text>

      <View className="gap-4">
        <View>
          <Text className="text-center text-xs uppercase tracking-wide text-gray-500 mb-1">
            Theme
          </Text>
          <Text variant="h5" className="text-center font-medium">
            {data.theme}
          </Text>
        </View>

        <View>
          <Text className="text-center text-xs uppercase tracking-wide text-gray-500 mb-1">
            Topic
          </Text>
          <Text variant="h6" className="text-center">
            {data.topic}
          </Text>
        </View>

        <View>
          <Text className="text-center text-xs uppercase tracking-wide text-gray-500 mb-1">
            Lesson
          </Text>
          <Text variant="body" className="text-center">
            {data.lesson}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Option 7: Original Design (your current one)
export function TopSectionOriginal({ data }: { data: any }) {
  return (
    <View className="my-2 gap-1" id="top-section">
      <Text
        variant="h4"
        color="heading"
        className="text-center tracking-widest"
      >
        SUNDAY SERVICE PROGRAMME
      </Text>
      <InfoRow className="mx-auto" label="Date" value={data.date} />
      <InfoRow className="" label="Theme" variant="h5" value={data.theme} />
      <InfoRow className="" label="Topic" variant="h6" value={data.topic} />
      <InfoRow className="" label="Lesson" variant="body" value={data.lesson} />
    </View>
  );
}
