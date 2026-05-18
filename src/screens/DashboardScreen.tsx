import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Text, Card, List, Chip, Divider } from 'react-native-paper';
import { useHermesStore } from '../stores';

export default function DashboardScreen() {
  const { stats, sessions, health, fetchStats, fetchSessions, fetchHealth } = useHermesStore();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchHealth();
    fetchStats();
    fetchSessions();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchHealth(), fetchStats(), fetchSessions()]);
    setRefreshing(false);
  };

  const statsData = stats.data as Record<string, unknown> | null;
  const healthData = health.data as Record<string, unknown> | null;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={styles.content}
    >
      <Text variant="headlineMedium" style={styles.title}>
        Dashboard
      </Text>

      <Card style={styles.card} mode="elevated">
        <Card.Title title="System Health" />
        <Card.Content>
          {health.loading ? (
            <Text style={styles.muted}>Loading...</Text>
          ) : health.error ? (
            <Text style={styles.error}>{health.error}</Text>
          ) : healthData ? (
            <>
              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Chip icon="check-circle" mode="outlined">
                  {String(healthData.status ?? 'unknown')}
                </Chip>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Version</Text>
                <Text style={styles.value}>{String(healthData.version ?? '-')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Uptime</Text>
                <Text style={styles.value}>{String(healthData.uptime ?? '-')}s</Text>
              </View>
            </>
          ) : (
            <Text style={styles.muted}>No data</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Title title="Stats" />
        <Card.Content>
          {stats.loading ? (
            <Text style={styles.muted}>Loading...</Text>
          ) : stats.error ? (
            <Text style={styles.error}>{stats.error}</Text>
          ) : statsData ? (
            Object.entries(statsData).map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>{String(value)}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.muted}>No data</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated">
        <Card.Title title="Recent Sessions" />
        <Card.Content>
          {sessions.loading ? (
            <Text style={styles.muted}>Loading...</Text>
          ) : sessions.error ? (
            <Text style={styles.error}>{sessions.error}</Text>
          ) : sessions.data && sessions.data.length > 0 ? (
            (sessions.data as Record<string, unknown>[]).slice(0, 5).map((s, i) => (
              <React.Fragment key={i}>
                <List.Item
                  title={String(s.model ?? s.id ?? `Session ${i + 1}`)}
                  description={String(s.created_at ?? '')}
                  left={(props) => <List.Icon {...props} icon="chat" />}
                />
                {i < Math.min((sessions.data as Record<string, unknown>[]).length, 5) - 1 && (
                  <Divider />
                )}
              </React.Fragment>
            ))
          ) : (
            <Text style={styles.muted}>No sessions</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    marginBottom: 16,
  },
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  content: {
    padding: 16,
    paddingTop: 50,
  },
  error: {
    color: '#CF6679',
  },
  label: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
  muted: {
    color: '#9E9E9E',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  title: {
    color: '#6EC6FF',
    fontWeight: '700',
    marginBottom: 16,
  },
  value: {
    color: '#E0E0E0',
  },
});
