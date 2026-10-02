import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, ActivityIndicator } from 'react-native';
import * as RNIap from 'react-native-iap';

// Google Play Console に登録した商品ID
const itemSkus = ['pro_monthly_subscription'];
const API_URL = 'https://your-api-domain.com/api/v1/verify-purchase';

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // IAP接続の初期化
    const initIap = async () => {
      try {
        await RNIap.initConnection();
        await RNIap.getSubscriptions({ skus: itemSkus });
      } catch (err) {
        console.warn('IAP Initialization Error:', err);
      }
    };

    initIap();

    return () => {
      RNIap.endConnection();
    };
  }, []);

  // バックエンド (FastAPI) でのトークン検証処理
  const verifyWithBackend = async (purchase: RNIap.SubscriptionPurchase) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package_name: purchase.packageNameAndroid,
          product_id: purchase.productId,
          purchase_token: purchase.purchaseToken,
          is_subscription: true,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 検証成功後にGoogle Playへ購入完了(Acknowledge)を通知
        await RNIap.acknowledgePurchaseAndroid({ token: purchase.purchaseToken });
        Alert.alert('成功', 'Proプランの有効化が完了しました！');
      } else {
        Alert.alert('エラー', data.detail || '決済検証に失敗しました');
      }
    } catch (error) {
      Alert.alert('通信エラー', 'サーバーとの通信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // 購入リクエスト
  const handlePurchase = async () => {
    setLoading(true);
    try {
      const purchase = await RNIap.requestSubscription({ sku: 'pro_monthly_subscription' });
      if (purchase && purchase.purchaseToken) {
        await verifyWithBackend(purchase);
      }
    } catch (err: any) {
      setLoading(false);
      if (err.code !== 'E_USER_CANCELLED') {
        Alert.alert('購入失敗', err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Protection Studio Mobile</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Proプランを登録する (Google Play)" onPress={handlePurchase} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});