// import { Card, Text, View } from '@/src/components';
// import React from 'react';

// const index = () => {
//   return (
//     <View safe>
//       <Card variant='ghost' className='p-4'>
//         <Text variant='h4'>📖 Verse of the Day</Text>
//         <Text variant='h5' color='body' className='mt-2 mb-1'>
//           The Lord is my shepherd; I shall not want.
//         </Text>
//         <Text variant='subtitle2'>(Psalm 23:1)</Text>
//       </Card>
//     </View>
//   );
// };

// export default index;

import { View } from '@/src/components';
import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default function ChurchDashboard() {
  return (
    <View safe gradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Verse of the Day */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: '#A9BCD0', fontWeight: '600' }}>
            Verse of the Day
          </Text>
          <Text style={{ color: '#FFFFFF', fontSize: 16, marginTop: 4 }}>
            The Lord is my shepherd; I shall not want.
          </Text>
          <Text style={{ color: '#A9BCD0', fontSize: 12 }}>(Psalm 23:1)</Text>
        </View>

        {/* Welcome Section */}
        <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '700' }}>
          Welcome, John!
        </Text>
        <Text style={{ color: '#A9BCD0', fontSize: 14, marginBottom: 20 }}>
          Stay connected with your church family.
        </Text>

        {/* Quick Actions */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          {[
            { label: 'View Service' },
            { label: 'Prayer Request' },
            { label: 'Give' },
          ].map((btn, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                flex: 1,
                marginHorizontal: 5,
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: 15,
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Service */}
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.08)',
            padding: 20,
            borderRadius: 16,
            marginBottom: 20,
          }}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Next Service
          </Text>
          <Text style={{ color: '#A9BCD0', marginTop: 4 }}>
            Sunday, 10:00 AM
          </Text>
          <Text style={{ color: '#FFFFFF', fontSize: 14, marginTop: 4 }}>
            More Than Conquerors
          </Text>
          <Text style={{ color: '#A9BCD0', fontSize: 12 }}>
            Special Music: In Christ Alone
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: '#778DA9',
              padding: 10,
              borderRadius: 8,
              alignItems: 'center',
            }}>
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>RSVP</Text>
          </TouchableOpacity>
        </View>

        {/* Activities */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          {[
            { label: 'Bible Study', sub: 'Wednesday, 7:00 PM' },
            { label: 'Community Outreach', sub: 'Food Bank Drive' },
          ].map((act, idx) => (
            <View
              key={idx}
              style={{
                flex: 1,
                marginHorizontal: 5,
                backgroundColor: 'rgba(255,255,255,0.08)',
                padding: 15,
                borderRadius: 12,
              }}>
              <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
                {act.label}
              </Text>
              <Text style={{ color: '#A9BCD0', fontSize: 12 }}>{act.sub}</Text>
            </View>
          ))}
        </View>

        {/* Recent Sermons */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: 16,
              marginBottom: 10,
            }}>
            Recent Sermons
          </Text>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}>
            <Text style={{ color: '#FFFFFF' }}>More Than Conquerors</Text>
            <Text style={{ color: '#A9BCD0', fontSize: 12 }}>
              Pastor John Smith · 30 min
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: 15,
              borderRadius: 12,
            }}>
            <Text style={{ color: '#FFFFFF' }}>The Power of Love</Text>
            <Text style={{ color: '#A9BCD0', fontSize: 12 }}>
              Elder Michael Brown · 25 min
            </Text>
          </View>
        </View>

        {/* Prayer Requests */}
        <View>
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: 16,
              marginBottom: 10,
            }}>
            Prayer Requests
          </Text>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: 15,
              borderRadius: 12,
              marginBottom: 10,
            }}>
            <Text style={{ color: '#FFFFFF' }}>
              Pray for my recovery from the flu.
            </Text>
            <Text style={{ color: '#A9BCD0', fontSize: 12 }}>
              - Emily Davis
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: 15,
              borderRadius: 12,
            }}>
            <Text style={{ color: '#FFFFFF' }}>
              Pray for my family’s well-being.
            </Text>
            <Text style={{ color: '#A9BCD0', fontSize: 12 }}>
              - Sarah Johnson
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
