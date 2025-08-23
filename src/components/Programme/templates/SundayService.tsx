import { Fragment } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Spacer from '../../Spacer';
import { Text, View } from '../../UI';
import { InfoRow } from '../components/InfoRow';
import { OfficiatingCard } from '../components/OfficiatingCard';
import { Section } from '../components/Section';

function formatList(arr: number[]) {
  if (!arr || arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1];
}

export function SundayServiceTemplate({ data }: { data: SundayProgramme }) {
  if (!data) {
    return (
      <Text variant='h6' className='text-center mt-10 italic'>
        No ongoing programms. Check upcoming programmes
      </Text>
    );
  }

  return (
    <ScrollView>
      <View className='flex-col gap-2 py-2'>
        {/* Header */}
        <Text
          variant='h4'
          color='heading'
          className='text-center tracking-widest'>
          SUNDAY SERVICE PROGRAMME
        </Text>
        <InfoRow className='mx-auto' label='Date' value={data.date} />

        <View className='flex-col mx-auto my-2 gap-1'>
          <InfoRow
            className='mx-auto'
            label='Theme'
            variant='h5'
            value={data.theme}
          />
          <InfoRow
            className='mx-auto'
            label='Topic'
            variant='h6'
            value={data.topic}
          />
          <InfoRow
            className='mx-auto'
            label='Lesson'
            variant='body1'
            value={data.lesson}
          />
        </View>

        {/* Officiating Section */}
        <View className='flex-row justify-between flex-wrap'>
          <OfficiatingCard
            className='w-[49%]'
            label='Worship Leader'
            value={data.officiating.worshipLeader}
          />
          <OfficiatingCard
            className='w-[49%]'
            label='Alt Worship Leader'
            value={data.officiating.alternateWorshipLeader}
          />
          <OfficiatingCard
            className='w-[49%]'
            label='Preacher'
            value={data.officiating.preacher}
          />
          <OfficiatingCard
            className='w-[49%]'
            label='Prayer Ministration'
            value={data.officiating.prayerMinistration}
          />
          <OfficiatingCard
            className='w-[100%]'
            label='Officiating Band'
            value={data.officiating.band.join(', ')}
          />
          <OfficiatingCard
            className='w-[100%]'
            label='Officiating Ministers'
            value={data.officiating.ministers.join(', ')}
          />
        </View>

        <Spacer height={6} />

        <Section title="A.  WORKER'S PRAYER">
          <InfoRow label='Time' value='7:00 AM - 07:30 AM' />
          <InfoRow
            name
            label='Leader'
            value={data.officiating.workersPrayerLeader}
          />
        </Section>

        <Section title='B.  BIBLE STUDY'>
          <InfoRow label='Time' value='7:30 AM - 8:30 AM' />
          <InfoRow
            name
            label='Teacher'
            value={data.officiating.sundaySchoolTeacher}
          />
        </Section>

        <Section title='C.  OPENING'>
          <InfoRow
            label='1.  Processional Hynm'
            value={data.hynms.processional}
          />
          <InfoRow label='2.  Introit' value={data.hynms.introit} />
          <InfoRow label='3.  Call to Worship' value={data.callToWorship} />
          <Spacer height={6} />
          <Text variant='h5'>{data.callToWorshipText}</Text>
          <Spacer height={6} />
          <InfoRow label='4.  Opening Hynm' value={data.hynms.opening} />
          <InfoRow
            label='5.  Opening Prayer'
            value={`PSALMS ${formatList(data.openingPrayer)}`}
          />
          <View className='flex-row gap-4 ml-8'>
            <Text variant='h6'>Prayer for:</Text>
            <View>
              <Text variant='h6'>
                (a){'   '}Repentance & Forgiveness of Sins
              </Text>
              <Text variant='h6'>(b){'   '}Sanctification</Text>
              <Text variant='h6'>(c){'   '}Descent of the Heavenly Hosts</Text>
              <Text variant='h6'>(d){'   '}The Lord's Prayer</Text>
              <Text variant='overline' className='ml-9 italic'>
                Seal - The Worshhip Leader
              </Text>
            </View>
          </View>
        </Section>

        <Section title='D.  APPRECIATION, THANKSGIVING & TESTIMONIES'>
          <View className='flex-row gap-4'>
            <Text variant='h6'>6. Thanksgiving Hynm:</Text>
            <View>
              {data.hynms.thanksgiving.map((hymn, index) => (
                <Fragment key={hymn}>
                  {data.hynms.thanksgiving.length > 1 ? (
                    <Text variant='h6'>
                      ({index == 0 ? 'a' : index == 1 ? 'b' : 'c'}){'   '}
                      {hymn}
                    </Text>
                  ) : (
                    <Text variant='h6' className='-ml-2'>
                      {hymn}
                    </Text>
                  )}
                </Fragment>
              ))}
            </View>
          </View>
          <InfoRow label='7.  Praise & Worship' value='Choir' />
          <InfoRow
            name
            label='8.  Thanksgiving Prayer'
            value={data.officiating.thanksgivingPrayer}
          />
          <Text variant='overline' className='ml-6 italic'>
            Seal - The Worshhip Leader
          </Text>
          <Text variant='h6'>9. Thanksgiving / Testimonies / Vow</Text>
          <Text variant='h6'>10. Collection of Thanksgiving Offering</Text>
        </Section>

        <Section title="E.  THE WORD / APOSTLES' CREED">
          <InfoRow name label='11.  Leson' value={data.officiating.lesson} />
          <InfoRow label='12.  Gloria' value='Choir to lead the Congregation' />
          <InfoRow label='13.  Apostless Creed' value='Church Minister' />
        </Section>

        <Section title='F.  INTERCESSORY PRAYER'>
          <View className='flex-row gap-4'>
            <Text variant='h6'>14.</Text>
            <View>
              <Text variant='paragraph'>
                (a){'   '}Prayer for Power of Holy Spirit, Mercy, Blessing and
                Provision
              </Text>
              <Text className='mx-auto w-[50%] italic font-extrabold'>
                - {data.officiating.intercessoryPrayer1}
              </Text>
              <Text variant='h6'>
                (b){'   '}Protection, Steadfastness and Success
              </Text>
              <Text className='mx-auto w-[50%] italic font-extrabold'>
                - {data.officiating.intercessoryPrayer2}
              </Text>
              <Text variant='h6'>
                (c){'   '}Prayer for Church Workers, Elders of C&S Church,
                Leader of the Church
              </Text>
              <Text className='mx-auto w-[50%] italic font-extrabold'>
                - {data.officiating.intercessoryPrayer3}
              </Text>
              <Text variant='overline' className='italic'>
                Seal - The Worshhip Leader
              </Text>
            </View>
          </View>
        </Section>

        <Section title='G.  ANNOUNCEMENT / FIRST TIMER'>
          <InfoRow label='15.  Announcement' value='Church Secetary' />
          <InfoRow label='16.  Welcoming First Timer' value='Church Secetary' />
          <Text variant='h6'>17. Building Offereing</Text>
        </Section>

        <Section title='H.  SERMON / PRAYER MINISTRATION'>
          <InfoRow label='18.  Hymn for Sermon' value={data.hynms.sermon} />
          <InfoRow label='19.  Sermonist' value={data.officiating.preacher} />
          <InfoRow
            label='20.  Prayer Ministration/Offering'
            value={data.officiating.prayerMinistration}
          />
        </Section>

        <Section title='I.  CLOSING'>
          <InfoRow label='21.  Closing Prayer' value='Worship Leader' />
          <InfoRow label='22.  Vesper' value={data.hynms.vesper} />
          <InfoRow label='23.  Grace' value='Leader-In-Charge' />
          <InfoRow
            label='24.  Recessional Hymn'
            value={data.hynms.recessional}
          />
        </Section>
      </View>
      <Text variant='h2' className='text-center'>
        AYO NI O
      </Text>
    </ScrollView>
  );
}
