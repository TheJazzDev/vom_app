import { LoadingScreen } from '@/src/components';
import { useOnboardingState } from '@/src/hooks/useOnboardingState';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import ChurchDashboard from '../components/Dashboard/Dashboard';

export default function HomePage() {
  const { hasCompletedOnboarding, isLoading } = useOnboardingState();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  }, [hasCompletedOnboarding, isLoading, router]);

  // Show loading while checking onboarding status
  if (isLoading) {
    return <LoadingScreen text="isloading in index" />;
  }

  // Show home screen for users who completed onboarding
  return <ChurchDashboard />;
}
