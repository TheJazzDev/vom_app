export const getCurrentTimeGreeting = () => {
  const hour = new Date().getHours();

  const morningGreetings = ['Morning,', 'Hey,', 'Hi,', 'Hello,', 'Welcome,'];
  const afternoonGreetings = [
    'Afternoon,',
    'Hey,',
    'Hi,',
    'Hello,',
    'Welcome,',
  ];
  const eveningGreetings = ['Evening,', 'Hey,', 'Hi,', 'Hello,', 'Welcome,'];

  const getRandomGreeting = (greetings: string[]) =>
    greetings[Math.floor(Math.random() * greetings.length)];

  if (hour < 12) return getRandomGreeting(morningGreetings);
  if (hour < 17) return getRandomGreeting(afternoonGreetings);
  return getRandomGreeting(eveningGreetings);
};
