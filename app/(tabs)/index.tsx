import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let headersList = {
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "x-forwarded-for": "122.161.69.1",
          "x-real-ip": "122.161.69.1",
          "x-eig-origin": "162.241.123.25",
          "sec-fetch-site": "cross-site",
          "x-https": "1",
          "Authorization": "Bearer 560|4e6JibVoospK1KjepUuK6fV5R2ISEA1OaJXqzFf3cb7aac60"
        }

        const response = await fetch("https://bmdublog.com/bbn-finance/api/socialMedia", {
          headers: headersList,
          method: 'GET'
        });;
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 18, }}>{item.for}</Text>
        <TouchableOpacity
          activeOpacity={0}
          style={{ backgroundColor: '#000', padding: 5, borderRadius: 5, }}
          onPress={() => Linking.openURL(item.url)}>
          <Text style={{ color: '#FFF' }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList
          style={{ marginTop: 50, padding: 10, }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
