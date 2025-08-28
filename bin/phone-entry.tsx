// import { yupResolver } from '@hookform/resolvers/yup';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from 'react-native';
// import * as yup from 'yup';

// import { RHFTextInput, Text, View } from '@/src/components';
// import { dispatch, useAuthSlice } from '@/src/store';
// import { useRouter } from 'expo-router';
// import { authService } from '../services/authService';

// // Schema for phone number validation
// const phoneSchema = yup.object().shape({
//   phone: yup
//     .string()
//     .required('Phone number is required')
//     .matches(/^[+]?[\d\s()-]{10,}$/, 'Please enter a valid phone number'),
// });

// type PhoneFormData = {
//   phone: string;
// };

// export default function PhoneEntryScreen() {
//   const router = useRouter();
//   const { isLoading, loginStart, loginEnd, loginFailure } = useAuthSlice();

//   const {
//     control,
//     handleSubmit,
//   } = useForm<PhoneFormData>({
//     resolver: yupResolver(phoneSchema),
//     defaultValues: {
//       phone: '',
//     },
//   });

//   const onSubmit = async (data: PhoneFormData) => {
//     dispatch(loginStart());

//     try {
//       // Check if phone number exists in database
//       const userExists = await authService.checkPhoneExists(data.phone);

//       if (userExists) {
//         // Core member found - go to phone verification and password creation
//         router.push({
//           pathname: '/auth/member-setup',
//           params: { phone: data.phone, userType: 'member' },
//         });
//       } else {
//         // Not a core member - go to full signup form
//         router.push({
//           pathname: '/auth/guest-signup',
//           params: { phone: data.phone, userType: 'guest' },
//         });
//       }
//     } catch (error: any) {
//       dispatch(loginFailure());
//       Alert.alert('Error', error.message || 'Failed to verify phone number');
//     } finally {
//       dispatch(loginEnd());
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       className="flex-1"
//     >
//       <View gradient scrollable>
//         <View className="items-center py-8 mb-8">
//           <Text variant="h2">Welcome</Text>
//           <Text className="text-center mt-2 text-gray-600">
//             Let's get started by verifying your phone number
//           </Text>
//         </View>

//         {/* Phone Number Input */}
//         <View className="mb-8">
//           <RHFTextInput
//             control={control}
//             name="phone"
//             inputType="text"
//             label="Phone Number"
//             leftIcon="phone"
//             placeholder="Enter your phone number"
//             keyboardType="phone-pad"
//           />
//         </View>

//         {/* Continue Button */}
//         <TouchableOpacity
//           disabled={isLoading}
//           onPress={handleSubmit(onSubmit)}
//           className={`py-4 rounded-lg mb-6 ${
//             isLoading ? 'bg-gray-400' : 'bg-blue-500'
//           }`}
//         >
//           <Text className="text-white text-center font-semibold text-lg">
//             {isLoading ? 'Checking...' : 'Continue'}
//           </Text>
//         </TouchableOpacity>

//         {/* Info Text */}
//         <View className="bg-blue-50 p-4 rounded-lg">
//           <Text className="text-blue-800 text-sm text-center">
//             We'll check if you're already a church member or help you create a
//             guest account
//           </Text>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }
