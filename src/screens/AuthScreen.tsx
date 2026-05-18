import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, HelperText, Divider, Snackbar } from 'react-native-paper';
import { HermesClient } from '../api/hermes';
import { HonchoClient } from '../api/honcho';
import { useAuthStore } from '../stores';

export default function AuthScreen() {
  const [hermesUrl, setHermesUrl] = useState('https://hermes.tobaiaes.dev');
  const [hermesApiKey, setHermesApiKey] = useState('');
  const [honchoUrl, setHonchoUrl] = useState('https://honcho.tobaiaes.dev');
  const [honchoApiKey, setHonchoApiKey] = useState('');
  const [testing, setTesting] = useState<'hermes' | 'honcho' | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [hermesValid, setHermesValid] = useState<boolean | null>(null);
  const [honchoValid, setHonchoValid] = useState<boolean | null>(null);

  const { setHermesCredentials, setHonchoCredentials } = useAuthStore();

  const showSnack = (msg: string) => {
    setSnackMsg(msg);
    setSnackVisible(true);
  };

  const testHermes = async () => {
    if (!hermesUrl || !hermesApiKey) {
      showSnack('Hermes URL und API-Key erforderlich');
      return;
    }
    setTesting('hermes');
    try {
      const client = new HermesClient(hermesUrl, hermesApiKey);
      const ok = await client.testConnection();
      setHermesValid(ok);
      showSnack(ok ? 'Hermes Verbindung OK!' : 'Hermes Verbindung fehlgeschlagen');
    } catch {
      setHermesValid(false);
      showSnack('Hermes Fehler — URL/API-Key prüfen');
    } finally {
      setTesting(null);
    }
  };

  const testHoncho = async () => {
    if (!honchoUrl || !honchoApiKey) {
      showSnack('Honcho URL und API-Key erforderlich');
      return;
    }
    setTesting('honcho');
    try {
      const client = new HonchoClient(honchoUrl, honchoApiKey);
      const ok = await client.testConnection();
      setHonchoValid(ok);
      showSnack(ok ? 'Honcho Verbindung OK!' : 'Honcho Verbindung fehlgeschlagen');
    } catch {
      setHonchoValid(false);
      showSnack('Honcho Fehler — URL/API-Key prüfen');
    } finally {
      setTesting(null);
    }
  };

  const handleSave = async () => {
    if (!hermesUrl || !hermesApiKey) {
      showSnack('Hermus URL und API-Key sind Pflicht');
      return;
    }
    setLoading(true);
    try {
      await setHermesCredentials(hermesUrl, hermesApiKey);
      if (honchoUrl && honchoApiKey) {
        await setHonchoCredentials(honchoUrl, honchoApiKey);
      }
      showSnack('Credentials gespeichert!');
    } catch (err) {
      showSnack('Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="headlineMedium" style={styles.title}>
          Hermes Insights
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Connect to your APIs
        </Text>

        <Card style={styles.card} mode="elevated">
          <Card.Title title="Hermus Dashboard" subtitle="Required" />
          <Card.Content>
            <TextInput
              label="Hermus URL"
              value={hermesUrl}
              onChangeText={setHermesUrl}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="url"
              placeholder="https://hermes.example.com"
              style={styles.input}
            />
            <TextInput
              label="API Key"
              value={hermesApiKey}
              onChangeText={setHermesApiKey}
              mode="outlined"
              secureTextEntry
              autoCapitalize="none"
              placeholder="sk-..."
              style={styles.input}
            />
            {hermesValid === false && (
              <HelperText type="error">Verbindung fehlgeschlagen</HelperText>
            )}
            {hermesValid === true && (
              <HelperText type="info">Verbindung erfolgreich</HelperText>
            )}
            <Button
              mode="outlined"
              onPress={testHermes}
              loading={testing === 'hermes'}
              disabled={testing === 'hermes'}
              style={styles.testBtn}
            >
              Test Connection
            </Button>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        <Card style={styles.card} mode="elevated">
          <Card.Title title="Honcho API" subtitle="Optional" />
          <Card.Content>
            <TextInput
              label="Honcho URL"
              value={honchoUrl}
              onChangeText={setHonchoUrl}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="url"
              placeholder="https://honcho.example.com"
              style={styles.input}
            />
            <TextInput
              label="API Key"
              value={honchoApiKey}
              onChangeText={setHonchoApiKey}
              mode="outlined"
              secureTextEntry
              autoCapitalize="none"
              placeholder="sk-..."
              style={styles.input}
            />
            {honchoValid === false && (
              <HelperText type="error">Verbindung fehlgeschlagen</HelperText>
            )}
            {honchoValid === true && (
              <HelperText type="info">Verbindung erfolgreich</HelperText>
            )}
            <Button
              mode="outlined"
              onPress={testHoncho}
              loading={testing === 'honcho'}
              disabled={testing === 'honcho'}
              style={styles.testBtn}
            >
              Test Connection
            </Button>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleSave}
          loading={loading}
          disabled={loading || !hermesUrl || !hermesApiKey}
          style={styles.saveBtn}
        >
          Save & Connect
        </Button>
      </ScrollView>

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
      >
        {snackMsg}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    color: '#6EC6FF',
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#9E9E9E',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#2C2C2C',
  },
  testBtn: {
    marginTop: 4,
  },
  divider: {
    marginVertical: 8,
  },
  saveBtn: {
    marginTop: 16,
    paddingVertical: 4,
  },
});