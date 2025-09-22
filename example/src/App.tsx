import { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';

// импортируем наш модуль
import { getUserAgent } from 'react-native-nitro-user-agent';

export default function App() {
  const [ua, setUa] = useState<string>('Loading...');

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserAgent();
        setUa(result);
      } catch (e: any) {
        setUa(`Error: ${e?.message ?? String(e)}`);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Nitro User-Agent Example</Text>
        <Text selectable style={styles.agent}>
          {ua}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  agent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
})
